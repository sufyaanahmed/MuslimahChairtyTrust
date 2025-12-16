# CORS Fix Guide for Google Apps Script

## The Problem
You're getting CORS errors even though the script returns 200 OK. This happens because Google Apps Script Web Apps need to be deployed correctly.

## Solution Steps

### 1. Verify Deployment Settings
In Google Apps Script:
1. Click **Deploy** → **Manage deployments**
2. Click the **pencil icon** (edit) next to your deployment
3. Verify these settings:
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
   - **Description:** (can be anything)

### 2. Create a NEW Deployment
If editing doesn't work, create a fresh deployment:

1. Click **Deploy** → **New deployment**
2. Click the **gear icon** (⚙️) next to "Select type"
3. Choose **Web app**
4. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**
6. **Copy the new Web app URL** (it will look like: `https://script.google.com/macros/s/AKfycb.../exec`)

### 3. Update Your Frontend
1. Open `.env` file (or create it in the root directory)
2. Update `VITE_APP_SCRIPT_URL` with the NEW deployment URL:
   ```
   VITE_APP_SCRIPT_URL=https://script.google.com/macros/s/YOUR_NEW_URL/exec
   ```
3. **Restart your dev server** (`npm run dev`)

### 4. Test the Deployment
Open the Apps Script URL directly in your browser:
```
    https://script.google.com/macros/s/YOUR_URL/exec?type=cases
    ```

You should see JSON data. If you see an error page or HTML, the deployment isn't working correctly.

## Important Notes

### Why CORS Fails
- Google Apps Script Web Apps **automatically** add CORS headers when deployed correctly
- If CORS fails, it usually means:
  1. Deployment access is not set to "Anyone"
  2. You're using the wrong URL (using `/dev` instead of `/exec`)
  3. The script has errors that prevent it from running

### Common Mistakes
1. ❌ Using `/dev` URL (development mode) - doesn't support CORS
2. ✅ Must use `/exec` URL (production deployment)
3. ❌ Setting "Who has access" to "Only myself"
4. ✅ Must be "Anyone" (even anonymous users)
5. ❌ Not restarting dev server after changing `.env`
6. ✅ Always restart after env changes

### Testing Checklist
- [ ] Deployment is set to "Anyone"
- [ ] Using `/exec` URL (not `/dev`)
- [ ] `.env` file has correct URL
- [ ] Dev server restarted after `.env` change
- [ ] Direct URL test shows JSON (not HTML/error)
- [ ] Browser console shows no CORS errors

## If Still Not Working

1. **Check Execution Logs:**
   - In Apps Script, go to **Executions** tab
   - Click on a failed execution
   - Check the error message
   - Fix any script errors

2. **Test with curl:**
   ```bash
   curl "https://script.google.com/macros/s/YOUR_URL/exec?type=cases"
   ```
   Should return JSON, not HTML

3. **Verify Sheet Access:**
   - Make sure the Google Sheet is accessible
   - Check that `SPREADSHEET_ID` in Code.gs is correct
   - Verify sheet names match exactly (case-sensitive)

4. **Try Incognito Mode:**
   - Sometimes browser extensions cause issues
   - Test in incognito/private window

## Quick Donation Buttons Feature

The case cards now have quick donation buttons:
- Click ₹50, ₹100, ₹200, or ₹500 to add to selected amount
- Click multiple times to add more
- Minimum donation is ₹100
- Selected amount is displayed and passed to payment modal




