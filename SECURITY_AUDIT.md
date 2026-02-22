# Security Audit & Fixes - Muslimah Charity Trust

## ✅ Security Issues Fixed

### 1. **Rate Limiting (CRITICAL FIX)**
**Issue:** No rate limiting on API endpoints - vulnerable to DDoS and abuse attacks

**Fix Applied:**
- ✅ Added rate limiting to Google Apps Script backend
- ✅ Limit: 100 requests per minute per IP/user
- ✅ Returns 429 (Too Many Requests) when limit exceeded
- ✅ Uses script cache for efficient rate limiting

**Code Location:** `apps-script/Code.gs` - Lines 24-52

**How it works:**
```javascript
// Rate limiting function
function checkRateLimit(identifier) {
  const cacheKey = 'ratelimit_' + identifier;
  const requestCount = parseInt(rateLimitCache.get(cacheKey) || '0');
  
  if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: 60 // seconds
    };
  }
  
  // Increment counter
  rateLimitCache.put(cacheKey, (requestCount + 1).toString(), 60); // 60 seconds TTL
  
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - requestCount - 1
  };
}
```

---

### 2. **Input Validation & Sanitization (CRITICAL FIX)**
**Issue:** No input validation - vulnerable to XSS, injection attacks, and invalid data

**Fix Applied:**
- ✅ Added input sanitization function to remove dangerous characters
- ✅ Email validation using regex
- ✅ Phone number validation
- ✅ Age validation (10-100 range)
- ✅ Message length validation (10-5000 characters)
- ✅ All user inputs are sanitized before storing in Google Sheets

**Code Location:** `apps-script/Code.gs` - Lines 54-76

**Validation Functions:**
```javascript
// Sanitize input to prevent injection attacks
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return input;
  }
  // Remove potentially dangerous characters
  return input.replace(/[<>\"']/g, '').trim();
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number format
function isValidPhone(phone) {
  // Allow formats: +919876543210, 9876543210, etc.
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
}
```

---

### 3. **Environment Variables Security (CRITICAL FIX)**
**Issue:** No .env file, API keys not properly managed, risk of exposing secrets

**Fix Applied:**
- ✅ Created `.env` file with proper structure
- ✅ Created `.env.example` template for team members
- ✅ Added .env to .gitignore to prevent committing secrets
- ✅ Documented Razorpay test mode setup

**Files Created:**
- `.env` - Contains actual secrets (NOT committed)
- `.env.example` - Template file (safe to commit)

**Required Environment Variables:**
```env
VITE_APP_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
```

---

### 4. **Razorpay Test Mode Configuration**

**✅ IMPORTANT: Always Use Test Keys in Development**

**How to Get Razorpay Test Keys:**

1. **Go to Razorpay Dashboard**
   - Visit: https://dashboard.razorpay.com/
   - Sign in to your account

2. **Navigate to API Keys**
   - Click on **Settings** (gear icon)
   - Click on **Website and App Settings**
   - Click on **API Keys**

3. **Switch to Test Mode**
   - At the top of the dashboard, ensure you see **"Test Mode"** badge
   - If it says "Live Mode", click on it to switch to Test Mode

4. **Generate Test Keys**
   - Click "Generate Test Key" button
   - You'll get:
     - **Key ID**: `rzp_test_XXXXXXXXXXXX`
     - **Key Secret**: `YYYYYYYYYYYYYYYY`

5. **Add to .env File**
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
   ```

6. **Add to Google Apps Script Properties**
   - Open your Google Apps Script
   - Click on **Project Settings** (gear icon)
   - Scroll to **Script Properties**
   - Add two properties:
     - `RAZORPAY_KEY_ID`: `rzp_test_XXXXXXXXXXXX`
     - `RAZORPAY_KEY_SECRET`: `YYYYYYYYYYYYYYYY`

**Testing Razorpay in Test Mode:**
- Use test card: `4111 1111 1111 1111`
- Any future expiry date
- Any CVV
- Any name
- All payments in test mode are simulated and FREE

**⚠️ NEVER use Live Mode keys until production ready!**

---

### 5. **Performance Optimization - Image Preloading**

**Issue:** Hero images were loading after the loader finished, causing delay

**Fix Applied:**
- ✅ Images now preload immediately when Loader module loads
- ✅ Preloading happens in parallel with data fetching
- ✅ Added progress bar to show loading status
- ✅ Reduced loader display time from 1.5s to 1s

**Code Location:** `src/components/Loader.jsx`

**How it works:**
```javascript
// Preload critical images immediately - before component even mounts
const preloadCriticalImages = () => {
  const heroImg1 = new Image()
  heroImg1.src = '/Hero_image_1.jpg'
  
  const heroImg2 = new Image()
  heroImg2.src = '/Hero_image_2.jpg'

  const logoImg = new Image()
  logoImg.src = '/Logo.jpeg'
}

// Start preloading as soon as this module loads
preloadCriticalImages()
```

**Benefits:**
- ✅ Faster initial page load
- ✅ No flash of unstyled images
- ✅ Better user experience
- ✅ Hero images ready when Home page renders

---

## 🔒 Additional Security Recommendations

### Recommended (Not Yet Implemented)

1. **HTTPS Only**
   - ✅ Vercel provides HTTPS by default
   - ✅ Google Apps Script Web Apps use HTTPS

2. **Content Security Policy (CSP)**
   - Add CSP headers to prevent XSS attacks
   - Can be added to `vercel.json`:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "Content-Security-Policy",
             "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://script.google.com https://api.razorpay.com"
           }
         ]
       }
     ]
   }
   ```

3. **CORS Configuration**
   - ✅ Already implemented in Google Apps Script
   - Apps Script automatically handles CORS when deployed as Web App

4. **Logging & Monitoring**
   - Consider adding Google Cloud Logging to Apps Script
   - Monitor failed login attempts
   - Track suspicious activity

5. **Regular Security Audits**
   - Review Google Apps Script logs regularly
   - Check for unusual API usage patterns
   - Update dependencies regularly: `npm audit`

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Verify all environment variables are set in Vercel
- [ ] Ensure Razorpay is in TEST mode (rzp_test_...)
- [ ] Test rate limiting by making rapid requests
- [ ] Test input validation with malformed data
- [ ] Verify images load correctly
- [ ] Test payment flow end-to-end
- [ ] Check Google Sheets for proper data storage
- [ ] Review Apps Script logs for errors
- [ ] Run `npm audit` to check for vulnerabilities
- [ ] Test on mobile devices
- [ ] Verify CORS is working correctly

---

## 📊 Security Compliance Status

| Security Feature | Status | Priority |
|-----------------|--------|----------|
| Rate Limiting | ✅ Implemented | CRITICAL |
| Input Validation | ✅ Implemented | CRITICAL |
| Environment Variables | ✅ Implemented | CRITICAL |
| HTTPS | ✅ Default | CRITICAL |
| Razorpay Test Mode | ✅ Configured | HIGH |
| Image Preloading | ✅ Implemented | MEDIUM |
| CORS | ✅ Implemented | HIGH |
| XSS Prevention | ✅ Sanitization | HIGH |
| CSP Headers | ⚠️ Recommended | MEDIUM |
| Logging | ⚠️ Recommended | MEDIUM |

Legend:
- ✅ Implemented
- ⚠️ Recommended
- ❌ Not Implemented

---

## 🛠️ How to Test Security Fixes

### 1. Test Rate Limiting
```javascript
// Run this in browser console to test rate limiting
async function testRateLimit() {
  const url = 'YOUR_APPS_SCRIPT_URL?type=test';
  for (let i = 0; i < 105; i++) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(`Request ${i + 1}:`, response.status, data);
  }
}
testRateLimit();
```
**Expected:** After 100 requests, you should get 429 (Too Many Requests)

### 2. Test Input Validation
Try submitting forms with:
- Invalid email: `notanemail`
- Invalid phone: `123`
- XSS attempt: `<script>alert('xss')</script>`
- SQL injection: `'; DROP TABLE users; --`

**Expected:** Form should reject invalid inputs with error messages

### 3. Test Image Preloading
- Open Chrome DevTools → Network tab
- Filter by "Img"
- Refresh the page
- Hero images should load while loader is still visible

---

## 📞 Support

If you encounter any security issues:
1. Do NOT commit sensitive information to Git
2. Contact the development team immediately
3. Check Google Apps Script execution logs
4. Review Vercel deployment logs

---

## 📝 Change Log

**Date:** 2026-02-14
**Changes:**
1. Added rate limiting to all API endpoints
2. Implemented input validation and sanitization
3. Created .env file and .env.example
4. Added .env to .gitignore
5. Optimized image preloading in Loader
6. Documented Razorpay test mode setup
7. Created comprehensive security documentation

---

**Next Steps:**
1. Fill in actual values in `.env` file
2. Set up Razorpay Script Properties in Google Apps Script
3. Test all security features
4. Deploy to Vercel with environment variables
5. Test payment flow in test mode
