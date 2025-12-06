# Quick Fix for CORS Issue

## The Problem
- CORS error: "No 'Access-Control-Allow-Origin' header"
- Response is HTML instead of JSON
- Status 200 but can't read response

## The Solution (3 Steps)

### Step 1: Create a NEW Deployment
**Don't update the existing one - create a completely new deployment:**

1. Apps Script editor → **Deploy** → **New deployment**
2. Click gear (⚙️) → Select **Web app**
3. **Critical settings:**
   - Execute as: `Me`
   - **Who has access: `Anyone`** ⚠️ **MUST be "Anyone"**
4. Click **Deploy**
5. **Copy the NEW Web App URL**

### Step 2: Update Frontend
1. Update `.env` file:
   ```env
   VITE_APP_SCRIPT_URL=https://script.google.com/macros/s/NEW_SCRIPT_ID/exec
   ```
2. Restart dev server: `npm run dev`

### Step 3: Verify Sheet Structure
Your Cases sheet should look like this:

| case_id | title | description | required_amount | amount_raised |
|---------|-------|-------------|-----------------|---------------|
| 1 | hospital | need funds | 100000 | 12000 |

**Important:** 
- First row MUST be headers
- Data starts from row 2
- Column names must match exactly (case-sensitive)

## Test It
1. Open this URL in browser: `YOUR_WEB_APP_URL?type=cases`
2. Should show: `{"cases":[{"case_id":"1","title":"hospital",...}]}`
3. If it shows HTML, the deployment is wrong - create a new one

## Why This Happens
Google Apps Script only adds CORS headers when:
- Deployed with "Anyone" access
- Using `/exec` URL
- New deployment (updating old one may not work)

**The fix: Create a NEW deployment with "Anyone" access!**


