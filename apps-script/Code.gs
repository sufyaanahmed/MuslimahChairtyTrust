/**
 * Muslimah Charity Trust - Google Apps Script Backend
 * 
 * This script provides a Web API for the React frontend to interact with Google Sheets
 * and handle Razorpay payment processing.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet with 3 sheets: Cases, Media, Donations
 * 2. Set up the column headers as specified in the documentation
 * 3. Deploy this script as a Web App
 * 4. Store Razorpay keys in Properties Service
 */

// Configuration
const SPREADSHEET_ID = '1xiB4jRbQJwIyHw-3xVQgSUKA7dOVhkkReJAsY3y4acE'; // Your Google Sheet ID (extracted from URL)
const SHEET_NAMES = {
  CASES: 'Cases',
  MEDIA: 'Media',
  DONATIONS: 'Donations',
  STATS: 'Stats',
  APPLICANTS: 'Applicants',
  CONTACTS: 'Contacts',
  BLOGS: 'blogs', // New sheet for blog posts
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const MAX_REQUESTS_PER_WINDOW = 100; // Maximum requests per window
const rateLimitCache = CacheService.getScriptCache();

/**
 * Rate limiting function
 * Prevents abuse by limiting requests per IP/user
 */
function checkRateLimit(identifier) {
  const cacheKey = 'ratelimit_' + identifier;
  const requestCount = parseInt(rateLimitCache.get(cacheKey) || '0');
  
  if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: 60 // seconds
    };
  }
  
  // Increment counter
  rateLimitCache.put(cacheKey, (requestCount + 1).toString(), 60); // 60 seconds TTL
  
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - requestCount - 1
  };
}

/**
 * Sanitize input to prevent injection attacks
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return input;
  }
  // Remove potentially dangerous characters
  return input.replace(/[<>\"']/g, '').trim();
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 */
function isValidPhone(phone) {
  // Allow formats: +919876543210, 9876543210, etc.
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
}

/**
 * Main GET handler
 * Also handles OPTIONS preflight requests for CORS
 */
function doGet(e) {
  try {
    // Rate limiting check
    const clientIp = e && e.parameter && e.parameter.userIp ? e.parameter.userIp : 'unknown';
    const rateLimitCheck = checkRateLimit(clientIp);
    
    if (!rateLimitCheck.allowed) {
      return createResponse({ 
        error: rateLimitCheck.message,
        retryAfter: rateLimitCheck.retryAfter 
      }, 429);
    }
    
    // Handle OPTIONS preflight (browsers send this for CORS)
    // Google Apps Script doesn't have a separate doOptions, so we handle it in doGet
    if (e && e.parameter && e.parameter.method === 'OPTIONS') {
      return createResponse({ ok: true });
    }
    
    // Test endpoint to verify script is working
    if (!e || !e.parameter || !e.parameter.type) {
      return createResponse({ 
        ok: true, 
        message: 'Apps Script is running',
        timestamp: new Date().toISOString()
      });
    }

    const type = e.parameter.type;
    
    // Test endpoint
    if (type === 'test') {
      try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        return createResponse({ 
          ok: true, 
          message: 'Script and spreadsheet access working',
          spreadsheetId: SPREADSHEET_ID,
          sheets: ss.getSheets().map(s => s.getName())
        });
      } catch (error) {
        return createResponse({ 
          error: 'Spreadsheet access failed: ' + error.toString(),
          spreadsheetId: SPREADSHEET_ID
        }, 500);
      }
    }
    
    if (type === 'cases') {
      return getCases();
    } else if (type === 'media') {
      return getMedia();
    } else if (type === 'stats') {
      return getStats();
    } else if (type === 'blogs') {
      return getBlogs();
    } else {
      return createResponse({ error: 'Invalid type parameter. Use ?type=cases, ?type=media, ?type=stats, ?type=blogs, or ?type=test' }, 400);
    }
  } catch (error) {
    // Catch any unexpected errors
    return createResponse({ 
      error: 'Script execution failed: ' + error.toString(),
      stack: error.stack || 'No stack trace available'
    }, 500);
  }
}

/**
 * Main POST handler
 */
function doPost(e) {
  try {
    // Rate limiting check
    const clientIp = e && e.parameter && e.parameter.userIp ? e.parameter.userIp : 'unknown';
    const rateLimitCheck = checkRateLimit(clientIp);
    
    if (!rateLimitCheck.allowed) {
      return createResponse({ 
        error: rateLimitCheck.message,
        retryAfter: rateLimitCheck.retryAfter 
      }, 429);
    }
    
    // Handle preflight OPTIONS (no postData)
    if (!e || !e.postData) {
      return createResponse({ ok: true });
    }

    const type = e.parameter.type;
    
    if (!type) {
      return createResponse({ error: 'Missing type parameter. Use ?type=submitVolunteer or ?type=submitContact' }, 400);
    }
    
    // Parse postData - handle both JSON and form-encoded data
    let postData;
    try {
      const contentType = e.postData.type || '';
      
      if (contentType.includes('application/json')) {
        // JSON format
        postData = JSON.parse(e.postData.contents);
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        // Form-encoded format (for CORS compatibility)
        const params = e.parameter;
        if (params.data) {
          postData = JSON.parse(params.data);
        } else {
          // Fallback: parse form data directly
          postData = {};
          for (const key in params) {
            if (key !== 'type') {
              postData[key] = params[key];
            }
          }
        }
      } else {
        // Try JSON first, then form data
        try {
          postData = JSON.parse(e.postData.contents);
        } catch (jsonError) {
          // If JSON fails, try parsing as form data
          const params = e.parameter;
          if (params.data) {
            postData = JSON.parse(params.data);
          } else {
            postData = {};
            for (const key in params) {
              if (key !== 'type') {
                postData[key] = params[key];
              }
            }
          }
        }
      }
    } catch (parseError) {
      return createResponse({ 
        error: 'Invalid data format: ' + parseError.toString(),
        received: e.postData.contents,
        contentType: e.postData.type
      }, 400);
    }
    
    if (type === 'createOrder') {
      return createRazorpayOrder(postData);
    } else if (type === 'verifyPayment') {
      return verifyPayment(postData);
    } else if (type === 'submitVolunteer') {
      return submitVolunteerApplication(postData);
    } else if (type === 'submitContact') {
      return submitContactForm(postData);
    } else {
      return createResponse({ error: 'Invalid type parameter. Use: createOrder, verifyPayment, submitVolunteer, or submitContact' }, 400);
    }
  } catch (error) {
    return createResponse({ 
      error: 'doPost error: ' + error.toString(),
      stack: error.stack || 'No stack trace'
    }, 500);
  }
}

/**
 * Get all cases from the Cases sheet
 */
function getCases() {
  try {
    // Try to open spreadsheet
    let ss;
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (error) {
      return createResponse({ 
        error: 'Cannot access spreadsheet. Check SPREADSHEET_ID: ' + SPREADSHEET_ID,
        details: error.toString()
      }, 500);
    }
    
    // Try to get Cases sheet
    const sheet = ss.getSheetByName(SHEET_NAMES.CASES);
    if (!sheet) {
      const availableSheets = ss.getSheets().map(s => s.getName());
      return createResponse({ 
        error: 'Cases sheet not found',
        availableSheets: availableSheets,
        expectedSheet: SHEET_NAMES.CASES
      }, 404);
    }
    
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return createResponse({ cases: [] });
    }
    
    const headers = data[0];
    
    // Find column indices
    const caseIdIndex = headers.indexOf('case_id');
    const titleIndex = headers.indexOf('title');
    const descriptionIndex = headers.indexOf('description');
    const requiredAmountIndex = headers.indexOf('required_amount');
    const amountRaisedIndex = headers.indexOf('amount_raised');
    const urlIndex = headers.indexOf('url'); // Optional image URL field
    
    // Check if required columns exist
    if (caseIdIndex === -1 || titleIndex === -1) {
      return createResponse({ 
        error: 'Required columns not found in Cases sheet',
        foundHeaders: headers,
        expectedHeaders: ['case_id', 'title', 'description', 'required_amount', 'amount_raised', 'url']
      }, 500);
    }
    
    const cases = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const caseId = row[caseIdIndex];
      
      // Skip empty rows
      if (!caseId || caseId === '') {
        continue;
      }
      
      const caseObj = {
        case_id: String(caseId),
        title: row[titleIndex] ? String(row[titleIndex]) : '',
        description: row[descriptionIndex] ? String(row[descriptionIndex]) : '',
        required_amount: row[requiredAmountIndex] ? parseFloat(row[requiredAmountIndex]) || 0 : 0,
        amount_raised: row[amountRaisedIndex] ? parseFloat(row[amountRaisedIndex]) || 0 : 0,
        url: urlIndex !== -1 && row[urlIndex] ? String(row[urlIndex]) : null // Optional image URL
      };
      cases.push(caseObj);
    }
    
    return createResponse({ cases: cases });
  } catch (error) {
    return createResponse({ 
      error: 'Error in getCases: ' + error.toString(),
      stack: error.stack || 'No stack trace'
    }, 500);
  }
}

/**
 * Get starred media from the Media sheet
 */
function getMedia() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAMES.MEDIA);
    if (!sheet) {
      return createResponse({ error: 'Media sheet not found' }, 404);
    }
    const data = sheet.getDataRange().getValues();
    if (!data || data.length < 2) {
      return createResponse({ media: [] });
    }
    const headers = data[0];
    
    const media = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const starred = row[headers.indexOf('starred')];
      
      if (starred === true || starred === 'TRUE' || starred === 'true') {
        const mediaObj = {
          media_id: row[headers.indexOf('media_id')],
          url: row[headers.indexOf('url')],
          type: row[headers.indexOf('type')],
          starred: true,
          case_id: row[headers.indexOf('case_id')] || null
        };
        media.push(mediaObj);
      }
    }
    
    return createResponse({ media: media });
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

/**
 * Get stats from the Stats sheet
 */
function getStats() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAMES.STATS);
    
    if (!sheet) {
      return createResponse({ error: 'Stats sheet not found' }, 404);
    }
    
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return createResponse({ 
        total_donors: 0,
        total_cases: 0,
        our_volunteers: 0
      });
    }
    
    const headers = data[0];
    
    // Find column indices
    const totalDonorsIndex = headers.indexOf('total_donors');
    const totalCasesIndex = headers.indexOf('total_cases');
    const ourVolunteersIndex = headers.indexOf('our_volunteers');
    
    // Get first row of data (assuming single row of stats)
    const row = data[1];
    
    const stats = {
      total_donors: totalDonorsIndex !== -1 ? (parseFloat(row[totalDonorsIndex]) || 0) : 0,
      total_cases: totalCasesIndex !== -1 ? (parseFloat(row[totalCasesIndex]) || 0) : 0,
      our_volunteers: ourVolunteersIndex !== -1 ? (parseFloat(row[ourVolunteersIndex]) || 0) : 0
    };
    
    return createResponse({ stats: stats });
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

/**
 * Get blogs from the Blogs sheet
 * Expected headers in the "blogs" sheet:
 * id, title, summary, content, imageUrl, author, date
 */
function getBlogs() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAMES.BLOGS);

    if (!sheet) {
      return createResponse({
        blogs: [],
        warning: 'Blogs sheet not found. Create a sheet named "blogs" with headers: id, title, summary, content, imageUrl, author, date.',
      });
    }

    const data = sheet.getDataRange().getValues();
    if (!data || data.length < 2) {
      return createResponse({ blogs: [] });
    }

    const headers = data[0];

    const idIndex = headers.indexOf('id');
    const titleIndex = headers.indexOf('title');
    const summaryIndex = headers.indexOf('summary');
    const contentIndex = headers.indexOf('content');
    const imageUrlIndex = headers.indexOf('imageUrl');
    const authorIndex = headers.indexOf('author');
    const dateIndex = headers.indexOf('date');

    const blogs = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const id = idIndex !== -1 ? row[idIndex] : '';

      // Skip completely empty rows
      if (!id && !row[titleIndex]) {
        continue;
      }

      const blog = {
        id: id ? String(id) : '',
        title: titleIndex !== -1 && row[titleIndex] ? String(row[titleIndex]) : '',
        summary: summaryIndex !== -1 && row[summaryIndex] ? String(row[summaryIndex]) : '',
        content: contentIndex !== -1 && row[contentIndex] ? String(row[contentIndex]) : '',
        imageUrl: imageUrlIndex !== -1 && row[imageUrlIndex] ? String(row[imageUrlIndex]) : '',
        author: authorIndex !== -1 && row[authorIndex] ? String(row[authorIndex]) : '',
        date: dateIndex !== -1 && row[dateIndex] ? String(row[dateIndex]) : '',
      };

      blogs.push(blog);
    }

    return createResponse({ blogs: blogs });
  } catch (error) {
    return createResponse({
      error: 'Error in getBlogs: ' + error.toString(),
      stack: error.stack || 'No stack trace',
    }, 500);
  }
}

/**
 * Create Razorpay order
 */
function createRazorpayOrder(postData) {
  const caseId = postData.case_id;
  const amount = postData.amount; // Amount in paise
  
  // Get Razorpay credentials from Properties Service
  const properties = PropertiesService.getScriptProperties();
  const razorpayKeyId = properties.getProperty('RAZORPAY_KEY_ID');
  const razorpayKeySecret = properties.getProperty('RAZORPAY_KEY_SECRET');
  
  if (!razorpayKeyId || !razorpayKeySecret) {
    return createResponse({ error: 'Razorpay credentials not configured' }, 500);
  }
  
  // Create order via Razorpay API
  const orderData = {
    amount: amount,
    currency: 'INR',
    receipt: 'receipt_' + caseId + '_' + Date.now(),
    notes: {
      case_id: caseId
    }
  };
  
  const options = {
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + Utilities.base64Encode(razorpayKeyId + ':' + razorpayKeySecret),
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(orderData)
  };
  
  try {
    const response = UrlFetchApp.fetch('https://api.razorpay.com/v1/orders', options);
    const responseData = JSON.parse(response.getContentText());
    
    if (response.getResponseCode() === 200) {
      return createResponse({
        order_id: responseData.id,
        amount: responseData.amount,
        currency: responseData.currency
      });
    } else {
      return createResponse({ error: 'Failed to create order' }, 500);
    }
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

/**
 * Verify Razorpay payment and update sheets
 */
function verifyPayment(postData) {
  const razorpayOrderId = postData.razorpay_order_id;
  const razorpayPaymentId = postData.razorpay_payment_id;
  const razorpaySignature = postData.razorpay_signature;
  const caseId = postData.case_id;
  const amount = postData.amount; // Amount in rupees
  const donorName = postData.donor_name;
  
  // Get Razorpay credentials
  const properties = PropertiesService.getScriptProperties();
  const razorpayKeySecret = properties.getProperty('RAZORPAY_KEY_SECRET');
  
  if (!razorpayKeySecret) {
    return createResponse({ error: 'Razorpay credentials not configured' }, 500);
  }
  
  // Verify signature
  const message = razorpayOrderId + '|' + razorpayPaymentId;
  const crypto = Utilities.computeHmacSha256Signature(message, razorpayKeySecret);
  const generatedSignature = crypto.map(function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
  
  if (generatedSignature !== razorpaySignature) {
    return createResponse({ error: 'Invalid payment signature' }, 400);
  }
  
  // Signature verified - update sheets
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // Add donation record
  const donationsSheet = ss.getSheetByName(SHEET_NAMES.DONATIONS);
  const donationRow = [
    'donation_' + Date.now(), // donation_id
    caseId,
    amount,
    donorName,
    new Date(),
    razorpayPaymentId
  ];
  donationsSheet.appendRow(donationRow);
  
  // Update case amount_raised
  const casesSheet = ss.getSheetByName(SHEET_NAMES.CASES);
  const casesData = casesSheet.getDataRange().getValues();
  const headers = casesData[0];
  const caseIdIndex = headers.indexOf('case_id');
  const amountRaisedIndex = headers.indexOf('amount_raised');
  
  for (let i = 1; i < casesData.length; i++) {
    if (casesData[i][caseIdIndex] === caseId) {
      const currentAmount = parseFloat(casesData[i][amountRaisedIndex]) || 0;
      const newAmount = currentAmount + amount;
      casesSheet.getRange(i + 1, amountRaisedIndex + 1).setValue(newAmount);
      break;
    }
  }
  
  return createResponse({
    success: true,
    message: 'Payment verified and recorded successfully'
  });
}

/**
 * Submit volunteer application to Applicants sheet
 */
function submitVolunteerApplication(postData) {
  try {
    // Sanitize inputs
    const fullName = sanitizeInput(postData.full_name);
    const email = sanitizeInput(postData.email);
    const phoneNumber = sanitizeInput(postData.phone_number);
    const age = sanitizeInput(postData.age);
    const gender = sanitizeInput(postData.gender);
    const bloodGroup = sanitizeInput(postData.blood_group);
    const address = sanitizeInput(postData.address);
    
    // Validate required fields
    if (!fullName || !email || !phoneNumber) {
      return createResponse({ 
        error: 'Missing required fields: full_name, email, and phone_number are required' 
      }, 400);
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
      return createResponse({ 
        error: 'Invalid email format' 
      }, 400);
    }
    
    // Validate phone number format
    if (!isValidPhone(phoneNumber)) {
      return createResponse({ 
        error: 'Invalid phone number format. Use format: +919876543210 or 9876543210' 
      }, 400);
    }
    
    // Validate age if provided
    if (age && (isNaN(age) || parseInt(age) < 10 || parseInt(age) > 100)) {
      return createResponse({ 
        error: 'Invalid age. Age must be between 10 and 100' 
      }, 400);
    }
    
    // Try to open spreadsheet
    let ss;
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (error) {
      return createResponse({ 
        error: 'Cannot access spreadsheet: ' + error.toString(),
        spreadsheetId: SPREADSHEET_ID
      }, 500);
    }
    
    // Try to get Applicants sheet
    const sheet = ss.getSheetByName(SHEET_NAMES.APPLICANTS);
    if (!sheet) {
      const availableSheets = ss.getSheets().map(s => s.getName());
      return createResponse({ 
        error: 'Applicants sheet not found',
        availableSheets: availableSheets,
        expectedSheet: SHEET_NAMES.APPLICANTS
      }, 404);
    }
    
    // Get headers if sheet has data
    let headers = [];
    if (sheet.getLastRow() > 0) {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }
    
    // If no headers exist, create them
    if (headers.length === 0) {
      headers = ['full_name', 'phone_number', 'email', 'age', 'gender', 'interested_areas', 'blood_group', 'address'];
      sheet.appendRow(headers);
    }
    
    // Convert interested_areas array to string if it's an array
    let interestedAreasValue = postData.interested_areas || '';
    if (Array.isArray(interestedAreasValue)) {
      // Sanitize each area
      interestedAreasValue = interestedAreasValue.map(area => sanitizeInput(area)).join(', ');
    } else {
      interestedAreasValue = sanitizeInput(interestedAreasValue);
    }
    
    // Prepare row data matching header order
    // Fix phone_number: Prefix with apostrophe to prevent Google Sheets from treating it as a formula
    let phoneNumberFormatted = phoneNumber;
    if (phoneNumberFormatted && phoneNumberFormatted.startsWith('+')) {
      phoneNumberFormatted = "'" + phoneNumberFormatted; // Prefix with apostrophe to make it text
    }
    
    const rowData = [
      fullName,
      phoneNumberFormatted, // Phone number with apostrophe prefix if starts with +
      email,
      age,
      gender,
      interestedAreasValue,
      bloodGroup,
      address
    ];
    
    // Append row
    const lastRow = sheet.getLastRow() + 1;
    sheet.appendRow(rowData);
    
    // Set phone_number cell format to text to prevent formula errors
    const phoneNumberColumnIndex = headers.indexOf('phone_number') + 1;
    if (phoneNumberColumnIndex > 0) {
      sheet.getRange(lastRow, phoneNumberColumnIndex).setNumberFormat('@'); // @ means text format
    }
    
    return createResponse({
      success: true,
      message: 'Volunteer application submitted successfully',
      data: {
        full_name: fullName,
        email: email
      }
    });
  } catch (error) {
    return createResponse({ 
      error: 'Error submitting volunteer application: ' + error.toString(),
      stack: error.stack || 'No stack trace'
    }, 500);
  }
}

/**
 * Submit contact form to Contacts sheet
 */
function submitContactForm(postData) {
  try {
    // Sanitize inputs
    const name = sanitizeInput(postData.name);
    const email = sanitizeInput(postData.email);
    const phone = sanitizeInput(postData.phone);
    const subject = sanitizeInput(postData.subject);
    const message = sanitizeInput(postData.message);
    
    // Validate required fields
    if (!name || !email || !message) {
      return createResponse({ 
        error: 'Missing required fields: name, email, and message are required' 
      }, 400);
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
      return createResponse({ 
        error: 'Invalid email format' 
      }, 400);
    }
    
    // Validate phone if provided
    if (phone && !isValidPhone(phone)) {
      return createResponse({ 
        error: 'Invalid phone number format. Use format: +919876543210 or 9876543210' 
      }, 400);
    }
    
    // Validate message length
    if (message.length < 10) {
      return createResponse({ 
        error: 'Message must be at least 10 characters long' 
      }, 400);
    }
    
    if (message.length > 5000) {
      return createResponse({ 
        error: 'Message must be less than 5000 characters' 
      }, 400);
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAMES.CONTACTS);
    
    if (!sheet) {
      return createResponse({ error: 'Contacts sheet not found' }, 404);
    }
    
    // Get headers if sheet has data
    let headers = [];
    if (sheet.getLastRow() > 0) {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }
    
    // If no headers exist, create them
    if (headers.length === 0) {
      headers = ['timestamp', 'name', 'email', 'phone', 'subject', 'message'];
      sheet.appendRow(headers);
    }
    
    // Fix phone: Prefix with apostrophe to prevent Google Sheets from treating it as a formula
    let phoneFormatted = phone;
    if (phoneFormatted && phoneFormatted.startsWith('+')) {
      phoneFormatted = "'" + phoneFormatted; // Prefix with apostrophe to make it text
    }
    
    // Prepare row data matching header order
    const rowData = [
      new Date(), // timestamp
      name,
      email,
      phoneFormatted, // Phone number with apostrophe prefix if starts with +
      subject,
      message
    ];
    
    // Append row
    const lastRow = sheet.getLastRow() + 1;
    sheet.appendRow(rowData);
    
    // Set phone cell format to text to prevent formula errors
    const phoneColumnIndex = headers.indexOf('phone') + 1;
    if (phoneColumnIndex > 0) {
      sheet.getRange(lastRow, phoneColumnIndex).setNumberFormat('@'); // @ means text format
    }
    
    return createResponse({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

/**
 * Helper function to create JSON response
 * Note: Google Apps Script automatically handles CORS when deployed as Web App with "Anyone" access
 * ContentService doesn't support setHeader(), so CORS is handled automatically by deployment settings
 */
function createResponse(data, statusCode = 200) {
  try {
    const jsonString = JSON.stringify(data);
    const output = ContentService.createTextOutput(jsonString);
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  } catch (error) {
    // Fallback if JSON.stringify fails
    const errorOutput = ContentService.createTextOutput(JSON.stringify({ error: error.toString() }));
    errorOutput.setMimeType(ContentService.MimeType.JSON);
    return errorOutput;
  }
}

