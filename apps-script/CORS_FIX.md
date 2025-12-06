# CORS Fix Guide for Google Apps Script

## The Problem

When accessing Google Apps Script Web App from JavaScript, you may encounter:
- CORS errors: "No 'Access-Control-Allow-Origin' header"
- Response is `text/html` instead of `application/json`
- Status 200 but can't read the response

## Root Cause

Google Apps Script Web Apps have specific requirements for CORS to work:

1. **Must be deployed as Web App** (not just saved)
2. **Must use `/exec` URL** (not `/dev`)
3. **Must have "Anyone" access** (not "Only myself")
4. **Must be a new deployment** (updating old deployment may not fix CORS)

## Solution Steps

### Step 1: Verify Your Deployment Settings

1. Open your Google Sheet → Extensions → Apps Script
2. Click **Deploy** → **Manage deployments**
3. Check your deployment:
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` ⚠️ **This is critical!**
4. If "Who has access" is NOT "Anyone", you need to create a NEW deployment

### Step 2: Create a NEW Deployment

**Important:** Updating an existing deployment may not fix CORS. Create a new one:

1. Click **Deploy** → **New deployment**
2. Click gear icon (⚙️) → Select **Web app**
3. Configure:
   - **Description**: `Muslimah Charity Trust API v2` (change version number)
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` ⚠️ **Must be "Anyone"**
4. Click **Deploy**
5. **Authorize** if prompted
6. **Copy the NEW Web App URL** (it will be different from the old one)

### Step 3: Update Your Frontend

1. Update your `.env` file with the NEW Web App URL:
   ```env
   VITE_APP_SCRIPT_URL=https://script.google.com/macros/s/NEW_SCRIPT_ID/exec
   ```

2. **Important:** Make sure the URL ends with `/exec` (not `/dev`)

3. Restart your dev server:
   ```bash
   npm run dev
   ```

### Step 4: Test the API Directly

Test your Web App URL in a browser:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?type=cases
```

**Expected result:**
- Should show JSON: `{"cases":[...]}`
- Should NOT show HTML or redirect

**If you see HTML:**
- The deployment is not correct
- Try creating a new deployment
- Make sure "Who has access" is "Anyone"

### Step 5: Verify CORS Headers

Open browser DevTools → Network tab → Click on the request → Check Response Headers

You should see:
```
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
```

If you DON'T see `Access-Control-Allow-Origin`:
- The deployment is not set to "Anyone"
- Create a new deployment with "Anyone" access

## Common Issues & Fixes

### Issue 1: "No 'Access-Control-Allow-Origin' header"

**Fix:**
- Create a NEW deployment (don't update existing)
- Set "Who has access" to "Anyone"
- Use the `/exec` URL (not `/dev`)

### Issue 2: Response is HTML instead of JSON

**Fix:**
- This usually means the Web App is redirecting or showing an error page
- Check the URL in browser directly - should show JSON
- If it shows HTML, check Apps Script execution logs for errors
- Verify your sheet structure matches the expected format

### Issue 3: Status 200 but can't read response

**Fix:**
- This is a CORS issue
- Create a new deployment with "Anyone" access
- Clear browser cache
- Try in incognito mode

### Issue 4: "Spreadsheet not found" error

**Fix:**
- Verify `SPREADSHEET_ID` in Code.gs is correct (just the ID, not full URL)
- Make sure the script has permission to access the sheet
- Re-authorize the deployment

## Testing Checklist

- [ ] Web App deployed as "Anyone" access
- [ ] Using `/exec` URL (not `/dev`)
- [ ] Direct browser access shows JSON (not HTML)
- [ ] Response headers include `Access-Control-Allow-Origin: *`
- [ ] `.env` file has correct Web App URL
- [ ] Dev server restarted after updating `.env`
- [ ] Browser console shows no CORS errors

## Alternative: Use JSONP (Not Recommended)

If CORS still doesn't work, you can use JSONP, but it's less secure and only works for GET requests. The proper solution is to fix the deployment settings.

## Still Having Issues?

1. **Check Apps Script execution logs:**
   - Apps Script editor → Executions (clock icon)
   - Look for errors

2. **Test with curl:**
   ```bash
   curl "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?type=cases"
   ```
   Should return JSON

3. **Verify sheet structure:**
   - Cases sheet should have headers: `case_id`, `title`, `description`, `required_amount`, `amount_raised`
   - First row should be headers
   - Data starts from row 2

4. **Check browser console:**
   - Look for specific error messages
   - Check Network tab for actual response

## Quick Fix Summary

1. **Create NEW deployment** (don't update existing)
2. **Set "Who has access" to "Anyone"** ⚠️ Critical!
3. **Use `/exec` URL** (not `/dev`)
4. **Update `.env` with new URL**
5. **Restart dev server**

The key is: **"Anyone" access + new deployment = CORS works**


