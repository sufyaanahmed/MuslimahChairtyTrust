# Quick Setup: Cloudinary + Cases Preloading

## ✅ What's Been Done

### 1. Cases Now Load Immediately
- Cases are fetched **as soon as the website loads**
- No waiting when user clicks "Cases" page
- Data is cached for 5 minutes
- Available on all pages instantly

### 2. Cloudinary Image Optimization
- Automatically optimizes Cloudinary URLs
- Images resized to 800px width
- Auto quality and format (WebP when supported)
- Faster image loading

## 📋 Setup Steps

### Step 1: Get Cloudinary URLs

1. Go to your Cloudinary Media Library
2. For each image/video:
   - Click on it
   - Copy the **Delivery URL** (the full URL)

**Example URLs:**
```
Image: https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1234567890/folder/image.jpg
Video: https://res.cloudinary.com/YOUR_CLOUD/video/upload/v1234567890/folder/video.mp4
```

### Step 2: Update Google Sheets Media Sheet

Open your Google Sheet → **Media** sheet

**Column Structure:**
| media_id | url | type | starred | case_id |
|----------|-----|------|---------|---------|

**Fill in the data:**
- `media_id`: Unique ID (e.g., `media_001`, `media_002`)
- `url`: Paste the Cloudinary Delivery URL
- `type`: `image` or `video`
- `starred`: `TRUE` for featured media (shown in gallery), `FALSE` for others
- `case_id`: Optional, leave empty or link to a case

**Example Row:**
```
media_001 | https://res.cloudinary.com/yourcloud/image/upload/v123/folder/img1.jpg | image | TRUE | 
```

### Step 3: Test Your Website

1. **Refresh your website**
2. **Check Gallery page** - Should show Cloudinary images
3. **Check Cases page** - Should load instantly (no spinner)
4. **Check Home page** - Featured cases and media should appear

## 🎯 Key Points

### Cases Loading:
- ✅ Fetched immediately when website loads
- ✅ Cached for 5 minutes
- ✅ Available on all pages instantly
- ✅ No API call when clicking "Cases" page

### Cloudinary Images:
- ✅ Automatically optimized (800px width)
- ✅ Auto quality and format
- ✅ Faster loading
- ✅ Works with any Cloudinary URL format

### Media Sheet:
- ✅ Use Cloudinary Delivery URLs
- ✅ Set `starred = TRUE` for gallery
- ✅ Set `type = "image"` or `"video"`
- ✅ Can link to cases with `case_id`

## 🔍 Troubleshooting

### Images Not Showing?

1. **Check URL format:**
   - Must be full Cloudinary URL
   - Should start with `https://res.cloudinary.com/`

2. **Check Media Sheet:**
   - `type` must be exactly `"image"` or `"video"`
   - `starred` must be `TRUE` (for gallery)
   - `url` must have the Cloudinary URL

3. **Test URL:**
   - Copy URL from sheet
   - Paste in browser
   - Should show the image/video

### Cases Not Loading?

1. **Check Cases Sheet:**
   - Must have headers: `case_id`, `title`, `description`, `required_amount`, `amount_raised`
   - Data starts from row 2

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for errors
   - Check Network tab for API calls

### Slow Loading?

1. **Check Cloudinary URLs:**
   - Should be Delivery URLs (not upload URLs)
   - Should be accessible

2. **Check Cache:**
   - Cases cached for 5 minutes
   - Media cached for 5 minutes
   - First load may be slower

## 📊 What Happens Now

### When Website Loads:
1. ✅ Fetches cases from Google Sheets
2. ✅ Fetches media from Google Sheets
3. ✅ Caches both for 5 minutes
4. ✅ Makes data available to all pages

### When User Visits Pages:
- **Home**: Shows featured cases/media (already loaded)
- **Cases**: Shows all cases (already loaded, instant!)
- **Gallery**: Shows starred media (already loaded)

### Image Loading:
- Cloudinary URLs automatically optimized
- Images load with placeholders
- Smooth fade-in animation
- Error handling for failed loads

## ✅ Checklist

- [ ] Cloudinary images/videos uploaded
- [ ] Cloudinary URLs copied
- [ ] Media sheet updated with URLs
- [ ] `starred = TRUE` for featured media
- [ ] `type` set correctly (image/video)
- [ ] Test website - gallery shows images
- [ ] Test website - cases load instantly

## 🚀 You're Done!

Your website now:
- ✅ Loads cases immediately
- ✅ Displays Cloudinary images optimized
- ✅ Fast and responsive
- ✅ Better user experience

See `CLOUDINARY_SETUP.md` for detailed Cloudinary guide.
See `PERFORMANCE_IMPROVEMENTS.md` for technical details.

