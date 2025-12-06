# Cloudinary Setup Guide

## Overview

Your images and videos are now uploaded to Cloudinary. This guide shows you how to:
1. Get Cloudinary URLs for your media
2. Update your Google Sheets Media sheet
3. Optimize image loading performance

## Step 1: Get Cloudinary URLs

### For Images:

1. Go to your Cloudinary Media Library
2. Click on an image
3. Copy the **Delivery URL** (it looks like):
   ```
   https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/folder/image.jpg
   ```

### For Videos:

1. Go to your Cloudinary Media Library
2. Click on a video
3. Copy the **Delivery URL** (it looks like):
   ```
   https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/folder/video.mp4
   ```

## Step 2: Update Google Sheets Media Sheet

Your Media sheet should have these columns:
- `media_id` - Unique ID (e.g., media_001)
- `url` - Cloudinary URL (paste the Delivery URL here)
- `type` - Either "image" or "video"
- `starred` - TRUE for featured media, FALSE for others
- `case_id` - Optional, link to a specific case

### Example Media Sheet Data:

| media_id | url | type | starred | case_id |
|----------|-----|------|--------|---------|
| media_001 | https://res.cloudinary.com/yourcloud/image/upload/v123/folder/img1.jpg | image | TRUE | |
| media_002 | https://res.cloudinary.com/yourcloud/video/upload/v123/folder/vid1.mp4 | video | TRUE | case_001 |
| media_003 | https://res.cloudinary.com/yourcloud/image/upload/v123/folder/img2.jpg | image | FALSE | |

## Step 3: Automatic Optimization

The website **automatically optimizes Cloudinary URLs** when displaying images:

- **Width**: Automatically resized to 800px (fits most screens)
- **Quality**: Auto (Cloudinary chooses best quality)
- **Format**: Auto (serves WebP when supported)

**You don't need to add transformations manually** - the code handles it!

## Step 4: Manual Optimization (Optional)

If you want to customize image sizes, you can add Cloudinary transformations directly in the URL:

### Common Transformations:

**Resize to specific width:**
```
https://res.cloudinary.com/YOUR_CLOUD/image/upload/w_1200/folder/image.jpg
```

**Resize with quality:**
```
https://res.cloudinary.com/YOUR_CLOUD/image/upload/w_1200,q_80/folder/image.jpg
```

**Auto format (WebP when supported):**
```
https://res.cloudinary.com/YOUR_CLOUD/image/upload/w_1200,q_auto,f_auto/folder/image.jpg
```

**Thumbnail:**
```
https://res.cloudinary.com/YOUR_CLOUD/image/upload/w_300,h_300,c_fill/folder/image.jpg
```

### Transformation Parameters:

- `w_800` - Width 800px
- `h_600` - Height 600px
- `q_auto` - Auto quality
- `q_80` - Quality 80%
- `f_auto` - Auto format (WebP/AVIF when supported)
- `c_fill` - Crop to fill
- `c_scale` - Scale proportionally

## Step 5: Video Optimization

For videos, you can add transformations:

**Video thumbnail (poster):**
```
https://res.cloudinary.com/YOUR_CLOUD/video/upload/so_0/folder/video.mp4
```

**Compressed video:**
```
https://res.cloudinary.com/YOUR_CLOUD/video/upload/q_auto:best/folder/video.mp4
```

## Best Practices

### 1. Use Original URLs in Sheet
- Store the **original Cloudinary URL** in your sheet
- The website will automatically optimize it for display
- This gives you flexibility to change optimization later

### 2. Organize with Folders
- Use Cloudinary folders to organize media:
  ```
  /gallery/featured/image1.jpg
  /gallery/cases/case1.jpg
  /videos/testimonials/vid1.mp4
  ```

### 3. Naming Convention
- Use descriptive names: `hospital-fundraiser-2024.jpg`
- Avoid special characters
- Use lowercase with hyphens

### 4. Featured Media
- Set `starred = TRUE` for media you want on the homepage
- Only starred media appears in the gallery
- You can have unlimited starred items

## Troubleshooting

### Images Not Loading?

1. **Check URL format:**
   - Must be full Cloudinary URL
   - Should start with `https://res.cloudinary.com/`

2. **Check Media Sheet:**
   - `type` must be exactly "image" or "video"
   - `starred` must be TRUE (for gallery)
   - `url` column must have the URL

3. **Check Cloudinary:**
   - Make sure media is uploaded
   - Check if URL is accessible in browser
   - Verify folder permissions

### Slow Loading?

1. **Use Cloudinary transformations** (already automatic)
2. **Compress images** before uploading
3. **Use appropriate sizes** (don't upload 10MB images)

### Video Not Playing?

1. **Check video format** (MP4 recommended)
2. **Check URL** is correct
3. **Check browser console** for errors
4. **Verify video is accessible** in Cloudinary

## Quick Reference

### Media Sheet Structure:
```
media_id | url | type | starred | case_id
```

### Cloudinary URL Format:
```
Images: https://res.cloudinary.com/CLOUD/image/upload/PATH/image.jpg
Videos: https://res.cloudinary.com/CLOUD/video/upload/PATH/video.mp4
```

### Automatic Optimization:
- Images: Auto-resized to 800px width
- Quality: Auto
- Format: Auto (WebP when supported)
- Videos: Original quality (can add transformations)

## Next Steps

1. ✅ Copy Cloudinary URLs from Media Library
2. ✅ Paste into Google Sheets Media sheet
3. ✅ Set `starred = TRUE` for featured media
4. ✅ Set `type = "image"` or `type = "video"`
5. ✅ Test on your website!

Your gallery should now display Cloudinary images and videos with automatic optimization! 🚀

