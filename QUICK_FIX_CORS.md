# Quick Start: Fix CORS & Test Payments

## 🚨 CRITICAL: Add Script Properties NOW

1. Open Google Sheet → Extensions → Apps Script
2. Click **Project Settings** (gear icon)
3. Scroll to **Script Properties**
4. Add these TWO properties:

```
Property 1:
Name:  RAZORPAY_KEY_ID
Value: rzp_test_SJ9odZivTR0mfZ

Property 2:
Name:  RAZORPAY_KEY_SECRET
Value: KDI6NR9kTKmMvo2oM4s5Lz5z
```

5. Click **Save**
6. **Deploy** → **Manage deployments** → **Edit** → **Deploy**

---

## 🔄 Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## 🧪 Test Payment NOW

### Option 1: Test with UPI
1. Go to: http://localhost:5173/cases
2. Click "Donate Now"
3. Enter: Name = "Test", Amount = "100"
4. Click "Proceed to Pay"
5. Select **UPI** in Razorpay modal
6. Enter UPI ID: `success@razorpay`
7. Click Pay

✅ **Expected**: Payment succeeds, recorded in Donations sheet

### Option 2: Test with Card
1. Same steps 1-4 above
2. Select **Card** in Razorpay modal
3. Enter:
   - Card: `4111 1111 1111 1111`
   - Expiry: `12/25`
   - CVV: `123`
   - Name: Any name
4. Click Pay

✅ **Expected**: Payment succeeds, recorded in Donations sheet

---

## ✅ Verify Success

Open your Google Sheet and check:
- **Donations** tab → Should see new donation entry
- **Cases** tab → `amount_raised` should increase

---

## 🔥 If CORS Error Still Shows

1. Clear browser cache (Ctrl+Shift+Delete)
2. Try incognito/private window
3. Verify script properties are saved
4. Redeploy Apps Script
5. Check Apps Script execution logs

---

## 📝 What Changed

| What | Before | After |
|------|--------|-------|
| Frontend .env | ❌ Had SECRET key | ✅ Only public key |
| POST method | ❌ JSON (triggers CORS) | ✅ Form-encoded (no CORS) |
| UPI support | ❌ Not configured | ✅ Fully enabled |
| Payment flow | ❌ CORS blocked | ✅ Working |

---

## 🎯 Test UPI Details

**Test UPI IDs (Test Mode Only):**
- ✅ Success: `success@razorpay`
- ❌ Failure: `failure@razorpay`

**Real UPI (Live Mode Only):**
- PhonePe: `username@ybl`
- Google Pay: `username@okaxis`
- Paytm: `username@paytm`
- BHIM: `username@upi`

---

## 📞 Quick Fixes

**"Razorpay credentials not configured"**
→ Add script properties (see above)

**"CORS error"**
→ Restart dev server, clear cache

**"Payment modal doesn't open"**
→ Check console, verify VITE_RAZORPAY_KEY_ID in .env.local

**"UPI option not showing"**
→ Normal in test mode, use test UPI ID

---

**Total Time: 5 minutes to fix and test!** ⚡
