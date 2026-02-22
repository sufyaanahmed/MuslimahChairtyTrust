# Quick Validation Test Script

## Test Input Validation (Browser Console)

Copy and paste these tests into your browser console after navigating to the volunteer or contact page.

### Test 1: Invalid Email
```javascript
// This should be rejected
const invalidEmail = {
  full_name: "Test User",
  email: "notanemail",
  phone_number: "1234567890",
  age: "25",
  gender: "Male",
  interested_areas: ["Food Distribution"],
  blood_group: "O+",
  address: "Test Address"
};

fetch('YOUR_APPS_SCRIPT_URL?type=submitVolunteer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(invalidEmail)
})
.then(r => r.json())
.then(d => console.log('Invalid Email Test:', d))
.catch(e => console.error('Error:', e));
```

### Test 2: Invalid Phone
```javascript
// This should be rejected
const invalidPhone = {
  full_name: "Test User",
  email: "test@example.com",
  phone_number: "123",
  age: "25",
  gender: "Male",
  interested_areas: ["Food Distribution"],
  blood_group: "O+",
  address: "Test Address"
};

fetch('YOUR_APPS_SCRIPT_URL?type=submitVolunteer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(invalidPhone)
})
.then(r => r.json())
.then(d => console.log('Invalid Phone Test:', d))
.catch(e => console.error('Error:', e));
```

### Test 3: XSS Attempt
```javascript
// This should be sanitized
const xssAttempt = {
  full_name: "<script>alert('xss')</script>",
  email: "test@example.com",
  phone_number: "9876543210",
  age: "25",
  gender: "Male",
  interested_areas: ["Food Distribution"],
  blood_group: "O+",
  address: "Normal Address"
};

fetch('YOUR_APPS_SCRIPT_URL?type=submitVolunteer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(xssAttempt)
})
.then(r => r.json())
.then(d => console.log('XSS Test:', d))
.catch(e => console.error('Error:', e));
// Check Google Sheet - name should NOT contain <script> tags
```

### Test 4: Valid Submission
```javascript
// This should succeed
const validData = {
  full_name: "Test User",
  email: "test@example.com",
  phone_number: "+919876543210",
  age: "25",
  gender: "Male",
  interested_areas: ["Food Distribution", "Medical Support"],
  blood_group: "O+",
  address: "123 Test Street, Test City, 123456"
};

fetch('YOUR_APPS_SCRIPT_URL?type=submitVolunteer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(validData)
})
.then(r => r.json())
.then(d => console.log('Valid Test:', d))
.catch(e => console.error('Error:', e));
// Should see success message
```

### Test 5: Rate Limiting
```javascript
// Test rate limiting (sends 105 requests)
async function testRateLimit() {
  const url = 'YOUR_APPS_SCRIPT_URL?type=test';
  let successCount = 0;
  let rateLimitCount = 0;
  
  for (let i = 0; i < 105; i++) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.status === 200) {
        successCount++;
        console.log(`✅ Request ${i + 1}: Success`);
      } else if (response.status === 429) {
        rateLimitCount++;
        console.log(`⛔ Request ${i + 1}: Rate Limited`);
      }
    } catch (error) {
      console.error(`❌ Request ${i + 1}: Error`, error);
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n📊 Rate Limit Test Results:');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`⛔ Rate Limited: ${rateLimitCount}`);
  console.log(`Expected: ~100 successful, ~5 rate limited`);
}

testRateLimit();
```

---

## Quick Razorpay Payment Test

### Test Card Details
- **Card Number**: `4111 1111 1111 1111`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVV**: Any 3 digits (e.g., `123`)
- **Name**: Any name

### Manual Test Steps
1. Open your app: http://localhost:5173
2. Navigate to **Cases** page
3. Click **"Donate Now"** on any case
4. Fill in:
   - Name: Test Donor
   - Amount: 100 (or more)
5. Click **"Proceed to Pay"**
6. In Razorpay modal:
   - Verify "Test Mode" label is visible
   - Enter test card: `4111 1111 1111 1111`
   - Enter expiry: `12/25`
   - Enter CVV: `123`
   - Click "Pay"
7. Verify:
   - ✅ Success message appears
   - ✅ Check Google Sheets → Donations tab
   - ✅ Check that donation is recorded
   - ✅ Check that case amount_raised is updated

---

## Image Preload Test

### Test with DevTools
1. Open Chrome DevTools (F12)
2. Go to **Network** tab
3. Filter by **Img**
4. Clear network log
5. Refresh page (Ctrl+R)
6. Observe:
   - ✅ Hero_image_1.jpg starts loading immediately
   - ✅ Hero_image_2.jpg starts loading immediately
   - ✅ Logo.jpeg starts loading immediately
   - ✅ All images complete before loader disappears
   - ✅ No flash of unstyled images after loader

### Test Loading Performance
```javascript
// Run this in browser console before refreshing page
performance.mark('start');

window.addEventListener('load', () => {
  performance.mark('end');
  performance.measure('page-load', 'start', 'end');
  const measure = performance.getEntriesByName('page-load')[0];
  console.log(`⏱️ Total page load time: ${measure.duration.toFixed(2)}ms`);
});
```

---

## Contact Form Validation Test

```javascript
// Test invalid email on contact form
const invalidContact = {
  name: "Test User",
  email: "notanemail",
  phone: "+919876543210",
  subject: "Test Subject",
  message: "This is a test message"
};

fetch('YOUR_APPS_SCRIPT_URL?type=submitContact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(invalidContact)
})
.then(r => r.json())
.then(d => console.log('Invalid Contact Email:', d));

// Test message too short
const shortMessage = {
  name: "Test User",
  email: "test@example.com",
  phone: "+919876543210",
  subject: "Test",
  message: "Short" // Less than 10 characters
};

fetch('YOUR_APPS_SCRIPT_URL?type=submitContact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(shortMessage)
})
.then(r => r.json())
.then(d => console.log('Short Message:', d));

// Test valid contact
const validContact = {
  name: "Test User",
  email: "test@example.com",
  phone: "+919876543210",
  subject: "Test Subject",
  message: "This is a valid test message with more than 10 characters"
};

fetch('YOUR_APPS_SCRIPT_URL?type=submitContact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(validContact)
})
.then(r => r.json())
.then(d => console.log('Valid Contact:', d));
```

---

## Expected Results

### ✅ Validation Tests
- Invalid email → Error: "Invalid email format"
- Invalid phone → Error: "Invalid phone number format"
- XSS attempt → Sanitized (no script tags in database)
- Valid data → Success message

### ✅ Rate Limiting Test
- First 100 requests → Success (200 OK)
- Requests 101-105 → Rate Limited (429 Too Many Requests)

### ✅ Payment Test
- Modal shows "Test Mode"
- Test card processes successfully
- Donation recorded in Google Sheets
- Case amount updated

### ✅ Image Preload Test
- Images start loading immediately
- No flash of unstyled images
- Smooth transition from loader to content

---

## Troubleshooting

### If Tests Fail

1. **Check .env file**
   - Ensure `VITE_APP_SCRIPT_URL` is set correctly
   - URL should end with `/exec`

2. **Check Google Apps Script**
   - Verify script properties are set
   - Check execution logs for errors
   - Ensure script is deployed

3. **Check Browser Console**
   - Look for CORS errors
   - Check for network errors
   - Verify API responses

4. **Restart Dev Server**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

---

## Quick Test All

Run this comprehensive test:

```javascript
async function testAll() {
  console.log('🧪 Running All Tests...\n');
  
  const baseUrl = 'YOUR_APPS_SCRIPT_URL';
  
  // Test 1: API Connection
  console.log('1️⃣ Testing API Connection...');
  const apiTest = await fetch(`${baseUrl}?type=test`);
  const apiData = await apiTest.json();
  console.log(apiTest.ok ? '✅ API Connected' : '❌ API Failed', apiData);
  
  // Test 2: Invalid Email
  console.log('\n2️⃣ Testing Invalid Email...');
  const emailTest = await fetch(`${baseUrl}?type=submitVolunteer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      full_name: "Test",
      email: "invalid",
      phone_number: "9876543210"
    })
  });
  const emailData = await emailTest.json();
  console.log(emailData.error ? '✅ Validation working' : '❌ No validation', emailData);
  
  // Test 3: Valid Submission
  console.log('\n3️⃣ Testing Valid Submission...');
  const validTest = await fetch(`${baseUrl}?type=submitVolunteer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      full_name: "Test User",
      email: "test@example.com",
      phone_number: "+919876543210",
      age: "25",
      gender: "Male",
      interested_areas: ["Testing"],
      blood_group: "O+",
      address: "Test Address"
    })
  });
  const validData = await validTest.json();
  console.log(validData.success ? '✅ Form submission works' : '❌ Submission failed', validData);
  
  console.log('\n✅ All tests complete!');
}

testAll();
```

---

Remember to replace `YOUR_APPS_SCRIPT_URL` with your actual Google Apps Script URL!
