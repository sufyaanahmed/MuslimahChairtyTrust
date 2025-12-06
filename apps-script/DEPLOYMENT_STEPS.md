# Google Apps Script Deployment Steps

## Step-by-Step Deployment Guide

### 1. Fix the Spreadsheet ID

The `SPREADSHEET_ID` should be **only the ID**, not the full URL.

**Correct format:**
```javascript
const SPREADSHEET_ID = '1xiB4jRbQJwIyHw-3xVQgSUKA7dOVhkkReJAsY3y4acE';
```

**Wrong format (what you had):**
```javascript
const SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/1xiB4jRbQJwIyHw-3xVQgSUKA7dOVhkkReJAsY3y4acE/edit';
```

The code has been fixed. Make sure to update it in your Apps Script editor.

### 2. Understanding the OAuth Warning

When you deploy a Google Apps Script as a Web App, you'll see this warning:

> **"Google hasn't verified this app"**

**This is NORMAL and SAFE for your own use!** Here's why:

- Google shows this warning for all unverified Apps Script deployments
- Since you're the developer and deploying it yourself, it's safe to proceed
- This warning appears because the app needs access to your Google Sheets

### 3. How to Proceed Past the Warning

When you see the warning screen:

1. **Click "Advanced"** (at the bottom of the warning page)
2. **Click "Go to [Your App Name] (unsafe)"** 
   - It says "unsafe" but it's safe because you created it
   - This is just Google's way of saying it's not verified by them
3. **Click "Allow"** to grant permissions
4. The deployment will complete successfully

### 4. Complete Deployment Steps

1. **Open your Google Sheet** → Extensions → Apps Script

2. **Update the SPREADSHEET_ID** in Code.gs:
   - Extract just the ID from your sheet URL
   - Example: From `https://docs.google.com/spreadsheets/d/1xiB4jRbQJwIyHw-3xVQgSUKA7dOVhkkReJAsY3y4acE/edit`
   - Use only: `1xiB4jRbQJwIyHw-3xVQgSUKA7dOVhkkReJAsY3y4acE`

3. **Save the script** (Ctrl+S or Cmd+S)

4. **Click "Deploy"** → **"New deployment"**

5. **Click the gear icon (⚙️)** next to "Select type" → Choose **"Web app"**

6. **Configure deployment:**
   - **Description**: `Muslimah Charity Trust API`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` (important for CORS)

7. **Click "Deploy"**

8. **Authorize the app:**
   - Click "Authorize access"
   - Choose your Google account
   - You'll see the "Google hasn't verified this app" warning
   - **Click "Advanced"** → **"Go to [App Name] (unsafe)"** → **"Allow"**

9. **Copy the Web App URL:**
   - After authorization, you'll see a Web App URL
   - It looks like: `https://script.google.com/macros/s/AKfycby.../exec`
   - **Copy this URL** - you'll need it for your frontend `.env` file

### 5. Set Up Razorpay Keys (Optional - for payment functionality)

1. In Apps Script editor, go to **Project Settings** (gear icon ⚙️)
2. Scroll to **Script Properties**
3. Click **"Add script property"**:
   - **Property**: `RAZORPAY_KEY_ID`
   - **Value**: Your Razorpay Key ID (from Razorpay dashboard)
4. Click **"Add script property"** again:
   - **Property**: `RAZORPAY_KEY_SECRET`
   - **Value**: Your Razorpay Key Secret (keep this secret!)

### 6. Test the API

Test your deployed API by visiting:
- Cases: `YOUR_WEB_APP_URL?type=cases`
- Media: `YOUR_WEB_APP_URL?type=media`

You should see JSON responses with your data.

### 7. Update Frontend

Add the Web App URL to your `.env` file:
```env
VITE_APP_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Troubleshooting

### "Spreadsheet not found" error
- Make sure `SPREADSHEET_ID` is correct (just the ID, not the full URL)
- Ensure the script has permission to access the sheet

### "Permission denied" error
- Make sure you authorized the app during deployment
- Check that "Execute as" is set to "Me"

### CORS errors in frontend
- Ensure "Who has access" is set to "Anyone"
- Use the Web App URL (not the script editor URL)

### Can't find "Advanced" button
- The warning page should have an "Advanced" link at the bottom
- If not visible, try scrolling down or refreshing the page

## Security Notes

- The OAuth warning is normal for unverified apps
- It's safe to proceed if you're the developer
- For production use, you can verify the app with Google (optional, more complex process)
- Never share your Razorpay Key Secret publicly


