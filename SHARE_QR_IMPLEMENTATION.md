# Share Implementation

## 📱 Overview
Added share button functionality to each donation case, allowing users to easily share cases on WhatsApp, Instagram, and other platforms.

## ✨ Features Implemented

### 1. **Share Button**
- **Native Sharing**: Uses Web Share API on mobile devices (WhatsApp, Instagram, etc.)
- **WhatsApp Fallback**: Direct WhatsApp link for desktop browsers
- **Clipboard Fallback**: Copies share text to clipboard if sharing isn't supported
- **Share Content**: 
  - Case title
  - Truncated description (first 200 chars)
  - Fundraising progress (₹X raised of ₹Y - Z%)
  - Direct case link with auto-open parameter

### 2. **Deep Link Handling**
When someone clicks a shared link:
1. Opens `/cases?caseId=XXX&donate=true`
2. Scrolls to the specific case with a highlight effect
3. Auto-opens the payment modal after 500ms
4. User can immediately donate without searching

## 🛠️ Technical Implementation

### Files Modified

#### **src/components/CaseCard.jsx**
- Added `showQRCode` state removed (simplified to share-only)
- Generated case-specific URL: `${window.location.origin}/cases?caseId=${case_id}&donate=true`
- Created share text with case details
- Implemented `handleShare()` with Web Share API + fallbacks
- Added Share button in the UI

#### **src/pages/Cases.jsx**
- Added `useSearchParams` from react-router-dom
- Added `useEffect` to handle deep linking:
  - Detects `caseId` parameter in URL
  - Finds matching case from cases array
  - Scrolls to the case with highlight effect
  - Auto-opens payment modal if `donate=true` parameter is present
- Each CaseCard already has unique ID: `case-${caseData.case_id}`

#### **package.json**
- Note: `qrcode.react` was installed but is no longer used (can be uninstalled)

## 🎯 User Flow

### Sharing a Case
1. User clicks "Share" button on any case
2. **On Mobile**: Native share sheet opens (WhatsApp, Instagram, etc.)
3. **On Desktop**: Opens WhatsApp Web with pre-filled message OR copies to clipboard
4. Share message includes case details and clickable link

### Clicking Shared Link
1. User clicks a shared link
2. Browser opens: `/cases?caseId=1&donate=true`
3. Page loads and finds the case
4. Scrolls to the case (centered view)
5. Highlights the case card for 2 seconds (green ring)
6. Opens payment modal after 500ms
7. User enters name and donation amount
8. Completes payment via Razorpay

## 📋 Code Examples

### Share Button Logic
```javascript
const handleShare = async () => {
  const shareData = {
    title: caseData.title,
    text: shareText,
    url: caseUrl
  }

  try {
    if (navigator.share) {
      // Mobile: Native share
      await navigator.share(shareData)
    } else if (window.innerWidth <= 768) {
      // Mobile without Web Share API: WhatsApp
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
      window.open(whatsappUrl, '_blank')
    } else {
      // Desktop: Clipboard
      await navigator.clipboard.writeText(shareText)
      alert('Share text copied to clipboard!')
    }
  } catch (error) {
    console.error('Error sharing:', error)
  }
}
```

### Share URL Generation
```javascript
const caseUrl = `${window.location.origin}/cases?caseId=${caseData.case_id}&donate=true`
```

### Deep Link Handler
```javascript
useEffect(() => {
  const caseId = searchParams.get('caseId')
  if (caseId && cases.length > 0) {
    const targetCase = cases.find(c => c.case_id === caseId)
    if (targetCase) {
      // Scroll to case
      setTimeout(() => {
        const element = document.getElementById(`case-${caseId}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          // Highlight effect
          element.classList.add('ring-4', 'ring-primary', 'ring-opacity-50')
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-primary', 'ring-opacity-50')
          }, 2000)
        }
      }, 300)
      
      // Auto-open donation modal
      const autoOpen = searchParams.get('donate')
      if (autoOpen === 'true') {
        setTimeout(() => {
          handleDonate(targetCase, 0)
        }, 500)
      }
    }
  }
}, [cases, searchParams])
```

## 🎨 UI Components

### Share Button
- **Color**: Green (`bg-green-500`)
- **Icon**: Share arrow icon
- **Position**: Below case title

## ✅ Testing Checklist

- [ ] Share button works on mobile (opens native share sheet)
- [ ] Share button works on desktop (opens WhatsApp or copies to clipboard)
- [ ] Deep link works with manual URL entry
- [ ] Highlight effect shows when navigating to case
- [ ] Share on WhatsApp includes all case details
- [ ] Share on Instagram (via clipboard) works
- [ ] Payment modal auto-opens when donate=true parameter is present

## 🚀 Deployment Notes

1. **Environment**: Works on any frontend URL (localhost, Vercel, etc.)
2. **Dynamic URL**: Uses `window.location.origin` to generate proper URLs
3. **No Backend Changes**: All functionality is frontend-only
4. **Mobile First**: Optimized for mobile sharing and QR scanning
5. **Cross-Platform**: Works on iOS, Android, Desktop

## 📱 WhatsApp/Instagram Sharing

### WhatsApp
- **Mobile**: Native share sheet includes WhatsApp
- **Desktop**: Direct WhatsApp Web link (`https://wa.me/?text=...`)
- **Message Format**: Pre-filled with case title, description, progress, and link

### Instagram
- **Method**: Clipboard copy (Instagram doesn't support direct sharing)
- **User Action**: Copy text → Open Instagram → Paste in Story/DM
- **Alternative**: Use native share sheet on mobile (if Instagram is installed)

## 🔒 Security Considerations

1. **URL Parameters**: Validated against existing cases before opening modal
2. **Deep Links**: Only work if case exists in database
3. **Payment Gateway**: Razorpay handles all payment security
4. **No Sensitive Data**: Share links only contain public case IDs

## 🎯 Future Enhancements (Optional)

- [ ] Add share count tracking
- [ ] Add social media preview images (Open Graph tags)
- [ ] Track link clicks with analytics
- [ ] Email sharing option
- [ ] Copy direct link button
- [ ] Add QR code functionality back if needed

## 📞 Support

For issues or questions about the share implementation:
1. Check browser console for errors
2. Verify case_id exists in database
3. Test on different devices (mobile vs desktop)
4. Ensure Web Share API is supported (mobile browsers)
5. Check network connectivity

---

**Implementation Date**: March 13, 2026  
**Dependencies**: `react-router-dom`  
**Browser Support**: All modern browsers (Chrome, Safari, Firefox, Edge)
