# Google Apps Script Backend Setup

This document provides step-by-step instructions for setting up the Google Apps Script backend for Muslimah Charity Trust.

## Prerequisites

1. Google Account
2. Razorpay Account with API keys
3. Google Sheet with proper structure

## Step 1: Create Google Sheet

1. Create a new Google Sheet
2. Create 3 sheets with the following names:
   - **Cases**
   - **Media**
   - **Donations**

### Cases Sheet Structure

| case_id | title | description | required_amount | amount_raised |
|---------|-------|-------------|-----------------|---------------|
| case_001 | Example Case | This is a sample case | 100000 | 25000 |

### Media Sheet Structure

| media_id | url | type | starred | case_id |
|----------|-----|------|---------|---------|
| media_001 | https://example.com/image.jpg | image | TRUE | case_001 |
| media_002 | https://example.com/video.mp4 | video | FALSE | |

**Note:** `starred` should be `TRUE` for featured media. `case_id` is optional.

### Donations Sheet Structure

| donation_id | case_id | amount | donor_name | date | razorpay_payment_id |
|-------------|---------|--------|------------|------|---------------------|
| donation_001 | case_001 | 5000 | John Doe | 2024-01-15 | pay_xxxxxxxxxxxxx |

## Step 2: Set Up Google Apps Script

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Delete any default code
4. Copy and paste the code from `Code.gs`
5. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual Google Sheet ID
   - You can find the Sheet ID in the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

## Step 3: Store Razorpay Credentials

1. In the Apps Script editor, go to **Project Settings** (gear icon)
2. Scroll down to **Script Properties**
3. Click **Add script property** and add:
   - **Property**: `RAZORPAY_KEY_ID`
   - **Value**: Your Razorpay Key ID
4. Click **Add script property** again and add:
   - **Property**: `RAZORPAY_KEY_SECRET`
   - **Value**: Your Razorpay Key Secret

**Security Note:** Never share your Razorpay Key Secret publicly.

## Step 4: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to **Select type** → Choose **Web app**
3. Configure:
   - **Description**: Muslimah Charity Trust API
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web app URL** - this is your API endpoint

## Step 5: Update Frontend Configuration

1. In your React project, create a `.env` file (or `.env.local`)
2. Add:
   ```
   VITE_APP_SCRIPT_URL=YOUR_WEB_APP_URL_HERE
   VITE_RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID
   ```
3. Update `src/api/api.js` if needed to use these environment variables

## Step 6: Test the API

You can test the API endpoints using:

- **GET Cases**: `YOUR_WEB_APP_URL?type=cases`
- **GET Media**: `YOUR_WEB_APP_URL?type=media`
- **POST Create Order**: Use Postman or curl to test

## Troubleshooting

### CORS Issues
If you encounter CORS errors, make sure:
- The Web App is deployed with "Anyone" access
- You're using the correct Web App URL (not the script editor URL)

### Permission Errors
- Make sure the script has permission to access the Spreadsheet
- Check that the Spreadsheet ID is correct

### Razorpay Errors
- Verify your Razorpay keys are correct
- Check that the keys are stored in Script Properties (not hardcoded)
- Ensure you're using the correct Razorpay environment (test/live)

## API Endpoints

### GET ?type=cases
Returns all cases from the Cases sheet.

**Response:**
```json
{
  "cases": [
    {
      "case_id": "case_001",
      "title": "Example Case",
      "description": "Description here",
      "required_amount": 100000,
      "amount_raised": 25000
    }
  ]
}
```

### GET ?type=media
Returns only starred media (starred = TRUE).

**Response:**
```json
{
  "media": [
    {
      "media_id": "media_001",
      "url": "https://example.com/image.jpg",
      "type": "image",
      "starred": true,
      "case_id": "case_001"
    }
  ]
}
```

### POST ?type=createOrder
Creates a Razorpay order.

**Request Body:**
```json
{
  "case_id": "case_001",
  "amount": 500000
}
```
Note: Amount is in paise (500000 = ₹5000)

**Response:**
```json
{
  "order_id": "order_xxxxxxxxxxxxx",
  "amount": 500000,
  "currency": "INR"
}
```

### POST ?type=verifyPayment
Verifies payment signature and updates sheets.

**Request Body:**
```json
{
  "razorpay_order_id": "order_xxxxxxxxxxxxx",
  "razorpay_payment_id": "pay_xxxxxxxxxxxxx",
  "razorpay_signature": "signature_here",
  "case_id": "case_001",
  "amount": 5000,
  "donor_name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified and recorded successfully"
}
```


