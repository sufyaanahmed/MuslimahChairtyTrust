# Testing Guide - Share Implementation

## ⚡ Quick Test Steps

### 1. View the Implementation
1. Server is running at: **http://localhost:5173/**
2. Navigate to the **Cases** page
3. You should see a new **Share button** (green) on each case card

---

## 📱 Testing Share Functionality

### On Desktop
1. Click the **Share** button on any case
2. Expected behavior:
   - Opens WhatsApp Web with pre-filled message
   - OR copies share text to clipboard (with alert)
3. Message should include:
   - Case title
   - Description (first 200 chars)
   - Fundraising progress
   - Direct link to the case

### On Mobile
1. Open http://localhost:5173 on your phone (use IP address if needed)
2. Click the **Share** button
3. Expected behavior:
   - Native share sheet opens
   - WhatsApp, Instagram, Telegram, etc. options appear
4. Select WhatsApp or Instagram
5. Verify message is pre-filled with case details

---

## 🧪 Test Scenarios

### Scenario 1: Share via WhatsApp (Mobile)
- [ ] Navigate to Cases page on mobile
- [ ] Click Share button on any case
- [ ] Select WhatsApp from share sheet
- [ ] Verify message includes title, description, progress, link
- [ ] Send to yourself or a test contact
- [ ] Click the link in WhatsApp
- [ ] Verify it opens the correct case with payment modal

### Scenario 2: Share via Instagram (Mobile)
- [ ] Click Share button
- [ ] Select "Copy" or Instagram from share sheet
- [ ] Open Instagram app
- [ ] Create a Story or DM
- [ ] Paste the copied text
- [ ] Verify formatting looks good

### Scenario 3: Deep Link Manual Testing
- [ ] Copy a case URL from share text
- [ ] Example: `http://localhost:5173/cases?caseId=CASE_001&donate=true`
- [ ] Paste in browser address bar
- [ ] Press Enter
- [ ] Verify auto-scroll and modal open

### Scenario 4: Multiple Cases
- [ ] Test share on 3 different cases
- [ ] Verify each shared link opens the correct case
- [ ] Verify case_id in URL matches the case

---

## 🐛 Troubleshooting

### Issue: Share button does nothing
**Fix**: Check browser console for errors. Web Share API might not be supported.

### Issue: Shared link opens wrong case
**Fix**: Check that `case_id` in URL matches case data.

### Issue: Payment modal doesn't open
**Fix**: 
1. Check browser console for errors
2. Verify `cases` array is loaded
3. Check timing in useEffect (500ms delay)
4. Ensure URL includes `donate=true` parameter

### Issue: Deep link doesn't scroll to case
**Fix**: Verify each CaseCard has unique ID: `case-${caseData.case_id}`

---

## 📊 Expected Results

### Share Text Format
```
Help Medical Emergency for Family

[Case description truncated to 200 chars]...

₹25,000 raised of ₹100,000 (25%)

Donate now: http://localhost:5173/cases?caseId=1&donate=true
```

### Share URL Format
```
http://localhost:5173/cases?caseId=1&donate=true
```

### Deep Link Parameters
- `caseId`: Case identifier (e.g., 1, 2, CASE_001, etc.)
- `donate`: Boolean flag to auto-open modal ("true" or absent)

---

## ✅ Success Criteria

All features are working if:
1. ✅ Share button opens native sharing on mobile
2. ✅ Share button opens WhatsApp or copies on desktop
3. ✅ Deep links work with manual URL entry
4. ✅ Payment modal auto-opens when donate=true parameter is present
5. ✅ Highlight effect shows when navigating to case
6. ✅ All URLs include correct case_id and donate=true

---

## 🎯 Next Steps After Testing

If everything works:
1. Test on production URL (Vercel deployment)
2. Share links on social media
3. Monitor donation conversions from shared links
4. Consider adding Open Graph meta tags for better link previews

If issues found:
1. Check browser console for errors
2. Review implementation in CaseCard.jsx and Cases.jsx
3. Test on different browsers (Chrome, Safari, Firefox)
4. Verify case_id format matches your database

---

## 📱 Mobile Testing Tips

### To test localhost on mobile:
1. Find your computer's local IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` or `ip addr`
2. Update Vite config to expose network:
   ```bash
   npm run dev -- --host
   ```
3. Open on phone: `http://YOUR_IP:5173`
   - Example: `http://192.168.0.105:5173`

### WhatsApp Testing:
- Test both WhatsApp app and WhatsApp Web
- Verify link preview shows (may need Open Graph tags)

### Instagram Testing:
- Instagram doesn't process links directly in posts
- Best method: Share via DM or Story text

---

**Testing Checklist**: ☐ Desktop Share | ☐ Mobile Share | ☐ Deep Link | ☐ WhatsApp Share | ☐ Instagram Share

**Status**: Ready for testing ✅
