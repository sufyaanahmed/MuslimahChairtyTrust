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
  STATS: 'Stats'
};

/**
 * Main GET handler
 */
function doGet(e) {
  // Handle CORS preflight (though Google Apps Script handles this automatically)
  const type = e.parameter.type;
  
  try {
    if (type === 'cases') {
      return getCases();
    } else if (type === 'media') {
      return getMedia();
    } else if (type === 'stats') {
      return getStats();
    } else {
      return createResponse({ error: 'Invalid type parameter. Use ?type=cases, ?type=media, or ?type=stats' }, 400);
    }
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

/**
 * Main POST handler
 */
function doPost(e) {
  const type = e.parameter.type;
  const postData = JSON.parse(e.postData.contents);
  
  try {
    if (type === 'createOrder') {
      return createRazorpayOrder(postData);
    } else if (type === 'verifyPayment') {
      return verifyPayment(postData);
    } else {
      return createResponse({ error: 'Invalid type parameter' }, 400);
    }
  } catch (error) {
    return createResponse({ error: error.toString() }, 500);
  }
}

/**
 * Get all cases from the Cases sheet
 */
function getCases() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAMES.CASES);
    
    if (!sheet) {
      return createResponse({ error: 'Cases sheet not found' }, 404);
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
      return createResponse({ error: 'Required columns not found in Cases sheet' }, 500);
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
    return createResponse({ error: error.toString() }, 500);
  }
}

/**
 * Get starred media from the Media sheet
 */
function getMedia() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAMES.MEDIA);
  const data = sheet.getDataRange().getValues();
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
 * Helper function to create JSON response with CORS headers
 */
function createResponse(data, statusCode = 200) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Note: Google Apps Script automatically adds CORS headers when deployed as Web App
  // with "Anyone" access. If CORS issues persist, ensure deployment settings are correct.
  
  return output;
}

