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
  CONTACTS: 'Contacts'
};

/**
 * Main GET handler
 * Also handles OPTIONS preflight requests for CORS
 */
function doGet(e) {
  try {
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
    } else {
      return createResponse({ error: 'Invalid type parameter. Use ?type=cases, ?type=media, ?type=stats, or ?type=test' }, 400);
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
    // Validate required fields
    if (!postData.full_name || !postData.email || !postData.phone_number) {
      return createResponse({ 
        error: 'Missing required fields: full_name, email, and phone_number are required' 
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
      interestedAreasValue = interestedAreasValue.join(', ');
    }
    
    // Prepare row data matching header order
    const rowData = [
      postData.full_name || '',
      postData.phone_number || '',
      postData.email || '',
      postData.age || '',
      postData.gender || '',
      interestedAreasValue,
      postData.blood_group || '',
      postData.address || ''
    ];
    
    // Append row
    sheet.appendRow(rowData);
    
    return createResponse({
      success: true,
      message: 'Volunteer application submitted successfully',
      data: {
        full_name: postData.full_name,
        email: postData.email
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
    
    // Prepare row data matching header order
    const rowData = [
      new Date(), // timestamp
      postData.name || '',
      postData.email || '',
      postData.phone || '',
      postData.subject || '',
      postData.message || ''
    ];
    
    // Append row
    sheet.appendRow(rowData);
    
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

