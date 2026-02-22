# Razorpay Test Mode Setup Guide

## 🎯 Overview

This guide will help you set up Razorpay in **TEST MODE** for safe development and testing. You can test all payment features without any real money transactions.

---

## 📋 Prerequisites

1. A Razorpay account (create one at https://razorpay.com/)
2. Access to Google Apps Script
3. Access to your project's `.env` file

---

## 🔑 Step 1: Get Razorpay Test Keys

### 1.1 Login to Razorpay Dashboard

1. Go to https://dashboard.razorpay.com/
2. Sign in with your credentials

### 1.2 Switch to Test Mode

**IMPORTANT:** Make sure you're in Test Mode!

1. Look at the top of the dashboard
2. You should see a toggle or label that says **"Test Mode"** or **"Live Mode"**
3. If it says "Live Mode", click it to switch to **"Test Mode"**
4. The interface should now show **"Test Mode"** badge/label

### 1.3 Generate Test API Keys

1. In the dashboard, click on **Settings** (gear icon)
2. Click on **Website and App Settings**
3. Click on **API Keys** tab
4. Click **"Generate Test Key"** button (if you don't have one already)

You'll see two keys:

- **Key ID**: Starts with `rzp_test_` (e.g., `rzp_test_1234567890abcd`)
- **Key Secret**: A longer secret string (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

**⚠️ IMPORTANT:**
- Keep the Key Secret **PRIVATE** - never share it publicly
- Never commit it to Git
- Only use **TEST** keys (rzp_test_) for development

---

## 🔧 Step 2: Configure Frontend (.env)

### 2.1 Open `.env` File

Open the `.env` file in your project root:
```
c:\Users\USER\Desktop\MuslimahCharityTrust\.env
```

### 2.2 Add Razorpay Key ID

Add your Razorpay Test Key ID:

```env
# Razorpay Test Mode Key
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID_HERE
```

**Example:**
```env
VITE_RAZORPAY_KEY_ID=rzp_test_1234567890abcd
```

### 2.3 Save the File

Save the `.env` file. The frontend will now use this key for Razorpay checkout.

---

## 🔧 Step 3: Configure Backend (Google Apps Script)

### 3.1 Open Google Apps Script

1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Your script should open in a new tab

### 3.2 Add Script Properties

1. In Apps Script, click on **Project Settings** (gear icon) in the left sidebar
2. Scroll down to **Script Properties** section
3. Click **"Add script property"**

### 3.3 Add RAZORPAY_KEY_ID

1. **Property**: `RAZORPAY_KEY_ID`
2. **Value**: Your Razorpay Test Key ID (e.g., `rzp_test_1234567890abcd`)
3. Click **Save**

### 3.4 Add RAZORPAY_KEY_SECRET

1. Click **"Add script property"** again
2. **Property**: `RAZORPAY_KEY_SECRET`
3. **Value**: Your Razorpay Test Key Secret (the longer secret string)
4. Click **Save**

**Final Result:**
You should now have two script properties:
- `RAZORPAY_KEY_ID` = `rzp_test_1234567890abcd`
- `RAZORPAY_KEY_SECRET` = `your_secret_key_here`

### 3.5 Deploy the Script

After adding properties:
1. Click **Deploy** → **Manage deployments**
2. Click **Edit** (pencil icon) on your existing deployment
3. Click **Deploy**
4. This ensures the script picks up the new properties

---

## 🧪 Step 4: Test the Payment Flow

### 4.1 Test Cards

Razorpay provides test cards for different scenarios:

**Successful Payment:**
- Card Number: `4111 1111 1111 1111`
- Expiry: Any future date (e.g., `12/25`)
- CVV: Any 3 digits (e.g., `123`)
- Name: Any name

**Failed Payment:**
- Card Number: `4000 0000 0000 0002`
- Expiry: Any future date
- CVV: Any 3 digits
- Name: Any name

**Other Test Cards:**
Visit https://razorpay.com/docs/payments/payments/test-card-upi-details/ for more test scenarios

### 4.2 Test Payment Process

1. **Start Your Development Server**
   ```bash
   npm run dev
   ```

2. **Navigate to Cases Page**
   - Go to http://localhost:5173/cases

3. **Select a Case**
   - Click on any case card
   - Click "Donate Now" button

4. **Fill Donation Form**
   - Enter your name
   - Enter amount (minimum ₹100)
   - Click "Proceed to Pay"

5. **Razorpay Checkout**
   - You should see Razorpay's payment modal
   - It should say **"Test Mode"** at the top
   - Use test card: `4111 1111 1111 1111`
   - Use any future expiry and CVV
   - Click "Pay ₹XXX"

6. **Verify Success**
   - You should see "Payment successful!" message
   - Check your Google Sheet → **Donations** tab
   - Your donation should be recorded
   - The case's **amount_raised** should be updated

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `.env` file has `VITE_RAZORPAY_KEY_ID=rzp_test_...`
- [ ] Google Apps Script has both properties set
- [ ] Payment modal opens when clicking "Donate"
- [ ] Payment modal shows "Test Mode" badge
- [ ] Test card `4111...` completes payment successfully
- [ ] Donation is recorded in Google Sheets
- [ ] Case amount_raised is updated correctly
- [ ] No real money is charged

---

## 🔍 Troubleshooting

### Issue 1: "Razorpay is not defined"

**Cause:** Razorpay script not loaded

**Fix:** Ensure this line is in `index.html`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### Issue 2: "Razorpay credentials not configured"

**Cause:** Script properties not set in Google Apps Script

**Fix:**
1. Go to Apps Script → Project Settings
2. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` as script properties
3. Redeploy the script

### Issue 3: Payment modal doesn't open

**Cause:** Invalid Razorpay Key ID

**Fix:**
1. Verify `.env` has correct `VITE_RAZORPAY_KEY_ID`
2. Ensure it starts with `rzp_test_`
3. Restart dev server: `npm run dev`

### Issue 4: "Payment verification failed"

**Cause:** Mismatch in Key Secret or signature verification issue

**Fix:**
1. Verify `RAZORPAY_KEY_SECRET` in Apps Script properties
2. Ensure both frontend and backend use same account keys
3. Check Apps Script logs for detailed error

### Issue 5: Payment successful but not recorded

**Cause:** Google Sheets or verification function error

**Fix:**
1. Check Google Apps Script execution logs
2. Verify "Donations" sheet exists with correct headers
3. Check that case_id matches exactly

---

## 📊 Checking Razorpay Dashboard

### View Test Payments

1. Go to https://dashboard.razorpay.com/
2. Ensure you're in **Test Mode**
3. Click on **Payments** in left sidebar
4. You should see all your test transactions
5. Click on any payment to see details

### Useful Dashboard Sections

- **Payments**: See all test transactions
- **Orders**: See created orders
- **Failed Payments**: See failed payment attempts
- **Webhooks**: Configure payment status webhooks (optional)

---

## 🚀 Moving to Live Mode (Production)

**⚠️ DO THIS ONLY WHEN READY FOR PRODUCTION**

When you're ready to accept real payments:

1. **Complete KYC** in Razorpay dashboard
2. **Activate Live Mode** in Razorpay settings
3. **Generate Live API Keys** (starts with `rzp_live_`)
4. **Update Environment Variables:**
   - In `.env.production` (for production builds)
   - In Vercel environment variables
   - In Google Apps Script properties
5. **Update Razorpay Account Details:**
   - Add bank account for settlements
   - Configure settlement schedule
   - Set up webhooks for notifications

**⚠️ NEVER commit Live Mode keys to Git!**

---

## 📞 Support Resources

**Razorpay Documentation:**
- API Reference: https://razorpay.com/docs/api/
- Test Cards: https://razorpay.com/docs/payments/payments/test-card-upi-details/
- Integration Guide: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/

**Razorpay Support:**
- Email: support@razorpay.com
- Dashboard: Click "Help" icon in dashboard

**Project Support:**
- Check `SECURITY_AUDIT.md` for security guidelines
- Check Apps Script logs for backend errors
- Check browser console for frontend errors

---

## 📝 Key Takeaways

✅ **Always use TEST mode** for development
✅ **Test keys start with** `rzp_test_`
✅ **Keep Key Secret private** - never commit to Git
✅ **Test thoroughly** before going live
✅ **Use test cards** `4111 1111 1111 1111` for testing
✅ **Verify in Google Sheets** that donations are recorded
✅ **Check Razorpay Dashboard** to see test transactions

---

## 🎉 You're All Set!

Your Razorpay test mode is now configured. You can safely test all payment features without any real money transactions.

Happy testing! 🚀
