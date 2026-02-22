# Debugging Apps Script Issues

## The Problem
Your curl test shows an HTML error page instead of JSON. This means the script is failing to execute.

## Step-by-Step Debugging

### 1. Test the Script Directly
Open this URL in your browser (replace with your actual URL):
```
https://script.google.com/macros/s/YOUR_URL/exec?type=test
```

This will tell you:
- If the script is running
- If it can access the spreadsheet
- What sheets are available

### 2. Check Execution Logs
1. Go to Google Apps Script editor
2. Click **Executions** (clock icon on left)
3. Click on a failed execution
4. Read the error message
5. This will tell you exactly what's wrong

### 3. Common Issues and Fixes

#### Issue 1: "Cannot access spreadsheet"
**Error:** `Cannot access spreadsheet. Check SPREADSHEET_ID`

**Fix:**
- Verify `SPREADSHEET_ID` in Code.gs matches your Google Sheet ID
- Make sure the script has permission to access the sheet
- In Apps Script, go to **Run** → **doGet** → Authorize permissions

#### Issue 2: "Cases sheet not found"
**Error:** `Cases sheet not found`

**Fix:**
- Check that your sheet is named exactly "Cases" (case-sensitive)
- The test endpoint will show all available sheets
- Rename your sheet to match exactly

#### Issue 3: "Required columns not found"
**Error:** `Required columns not found in Cases sheet`

**Fix:**
- Make sure first row has these exact column names:
  - `case_id`
  - `title`
  - `description`
  - `required_amount`
  - `amount_raised`
  - `url` (optional)

#### Issue 4: Permission Denied
**Error:** `Permission denied` or authorization errors

**Fix:**
1. In Apps Script editor, click **Run** → **doGet**
2. Click **Review Permissions**
3. Choose your Google account
4. Click **Advanced** → **Go to [Your Project] (unsafe)**
5. Click **Allow**

### 4. Verify Deployment Settings
1. **Deploy** → **Manage deployments**
2. Click **Edit** (pencil icon)
3. Verify:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**

### 5. Test Each Endpoint

Test these URLs one by one:

```bash
# Test script is running
curl "https://script.google.com/macros/s/YOUR_URL/exec?type=test"

# Test cases endpoint
curl "https://script.google.com/macros/s/YOUR_URL/exec?type=cases"

# Test media endpoint
curl "https://script.google.com/macros/s/YOUR_URL/exec?type=media"

# Test stats endpoint
curl "https://script.google.com/macros/s/YOUR_URL/exec?type=stats"
```

Each should return JSON, not HTML.

### 6. Check Spreadsheet ID Format

Your `SPREADSHEET_ID` should be just the ID, not the full URL:
- ✅ Correct: `1xiB4jRbQJwIyHw-3xVQgSUKA7dOVhkkReJAsY3y4acE`
- ❌ Wrong: `https://docs.google.com/spreadsheets/d/1xiB4jRbQJwIyHw-3xVQgSUKA7dOVhkkReJAsY3y4acE/edit`

### 7. Verify Sheet Names

The script expects these exact sheet names (case-sensitive):
- `Cases`
- `Media`
- `Donations`
- `Stats`
- `Applicants`
- `Contacts`

### 8. Quick Fix Checklist

- [ ] Script has been authorized (Run → doGet → Authorize)
- [ ] SPREADSHEET_ID is correct (just the ID, not full URL)
- [ ] Sheet names match exactly (case-sensitive)
- [ ] Column headers match exactly (case-sensitive)
- [ ] Deployment is set to "Anyone" access
- [ ] Using `/exec` URL (not `/dev`)
- [ ] Test endpoint (`?type=test`) works

### 9. If Still Not Working

1. **Check Execution Logs:**
   - Go to **Executions** tab
   - Click on failed execution
   - Copy the full error message
   - This will tell you exactly what's wrong

2. **Try Manual Test:**
   - In Apps Script editor, click **Run** → **doGet**
   - This will show you the error immediately

3. **Verify Spreadsheet Access:**
   - Open your Google Sheet
   - Make sure it's accessible
   - Check that the script has edit access

## Expected Responses

### Success Response (test endpoint):
```json
{
  "ok": true,
  "message": "Script and spreadsheet access working",
  "spreadsheetId": "1xiB4jRbQJwIyHw-3xVQgSUKA7dOVhkkReJAsY3y4acE",
  "sheets": ["Cases", "Media", "Donations", "Stats", "Applicants", "Contacts"]
}
```

### Success Response (cases endpoint):
```json
{
  "cases": [
    {
      "case_id": "1",
      "title": "Hospital",
      "description": "Need funds",
      "required_amount": 100000,
      "amount_raised": 12000,
      "url": null
    }
  ]
}
```

### Error Response:
```json
{
  "error": "Error message here",
  "details": "Additional details"
}
```

If you see HTML instead of JSON, the script is failing. Check the execution logs for the exact error.





