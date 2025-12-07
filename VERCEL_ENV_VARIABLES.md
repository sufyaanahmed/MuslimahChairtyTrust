# Fix: Cases and Gallery Not Loading on Vercel

## The Problem

The website works but cases and gallery images don't load. Console shows:
```
Error fetching cases: Server returned non-JSON response
Error fetching media: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
```

**This means:** The API is returning HTML (your website) instead of JSON from Google Apps Script.

## ✅ Solution: Add Environment Variables in Vercel

The API URL isn't configured in Vercel, so it's trying to fetch from the wrong place.

### Step 1: Get Your Google Apps Script URL

1. Go to your Google Sheet
2. **Extensions** → **Apps Script**
3. Click **Deploy** → **Manage deployments**
4. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/.../exec`)

### Step 2: Add Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Click your project: **MuslimahChairtyTrust**
3. Go to **Settings** → **Environment Variables**

### Step 3: Add These Variables

**Variable 1:**
- **Name**: `VITE_APP_SCRIPT_URL`
- **Value**: Your Google Apps Script Web App URL
  - Example: `https://script.google.com/macros/s/AKfycbx.../exec`
- **Environment**: Select all (Production, Preview, Development)
- Click **Save**

**Variable 2 (If using Razorpay):**
- **Name**: `VITE_RAZORPAY_KEY_ID`
- **Value**: Your Razorpay Key ID
- **Environment**: Select all
- Click **Save**

### Step 4: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click **three dots (⋯)** on latest deployment
3. Click **Redeploy**
4. **Important:** Make sure "Use existing Build Cache" is **unchecked**
5. Click **Redeploy**

### Step 5: Verify

After redeploy, check:
1. Website should load cases
2. Gallery should show images
3. Console should have no API errors

## Why This Happens

The code uses:
```javascript
const API_BASE_URL = import.meta.env.VITE_APP_SCRIPT_URL || 'YOUR_APPS_SCRIPT_URL_HERE'
```

If `VITE_APP_SCRIPT_URL` isn't set in Vercel:
- It uses the fallback `'YOUR_APPS_SCRIPT_URL_HERE'`
- Or tries to fetch from relative URL
- Gets HTML instead of JSON

**Solution:** Add environment variable in Vercel.

## Quick Checklist

- [ ] Get Google Apps Script Web App URL
- [ ] Go to Vercel → Settings → Environment Variables
- [ ] Add `VITE_APP_SCRIPT_URL` with your Apps Script URL
- [ ] Add `VITE_RAZORPAY_KEY_ID` (if using payments)
- [ ] Select all environments (Production, Preview, Development)
- [ ] Save
- [ ] Redeploy (without cache)
- [ ] Test website - cases and gallery should work

## Expected Result

After adding environment variables and redeploying:
- ✅ Cases load from Google Sheets
- ✅ Gallery images load from Cloudinary
- ✅ No console errors
- ✅ Website fully functional

## Troubleshooting

### Still Not Working?

1. **Check Environment Variables:**
   - Make sure variable name is exactly: `VITE_APP_SCRIPT_URL`
   - Must start with `VITE_` to be accessible in frontend
   - Check it's added to all environments

2. **Check Apps Script URL:**
   - Test the URL in browser: `YOUR_APPS_SCRIPT_URL?type=cases`
   - Should return JSON, not HTML
   - Make sure it ends with `/exec` (not `/dev`)

3. **Check Build Logs:**
   - After redeploy, check if environment variables are loaded
   - Should see them in build logs

4. **Clear Browser Cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or test in incognito mode

## Summary

**The issue:** Environment variables not set in Vercel
**The fix:** Add `VITE_APP_SCRIPT_URL` in Vercel Environment Variables

This will connect your frontend to Google Apps Script backend! 🚀

