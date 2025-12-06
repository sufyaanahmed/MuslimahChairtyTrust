# Vercel Deployment Guide

## ✅ Fixed: 404 Error

The `vercel.json` file has been created to fix the 404 error. This file:
- Redirects all routes to `index.html` (required for React Router)
- Sets up proper caching headers
- Optimizes asset delivery

## Deployment Steps

### 1. Push to GitHub

Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Add vercel.json and performance optimizations"
git push origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Add Environment Variables

In Vercel dashboard → Project Settings → Environment Variables, add:

```
VITE_APP_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

**Important:** 
- Add these for **Production**, **Preview**, and **Development**
- Click "Save" after adding each variable

### 4. Deploy

Click **"Deploy"** and wait for build to complete.

### 5. Verify Deployment

1. Visit your Vercel URL (e.g., `your-app.vercel.app`)
2. Test all routes:
   - `/` - Home page
   - `/cases` - Cases page
   - `/gallery` - Gallery page
   - `/story` - Story page
   - `/contact` - Contact page
   - `/volunteers` - Volunteers page

All routes should work without 404 errors.

## Troubleshooting

### Still Getting 404?

1. **Check `vercel.json` exists** in your repository
2. **Redeploy** on Vercel (Settings → Deployments → Redeploy)
3. **Clear browser cache** and try again

### Build Fails?

1. Check build logs in Vercel dashboard
2. Common issues:
   - Missing environment variables
   - Build command incorrect
   - Dependencies not installed

### Environment Variables Not Working?

1. Make sure variable names start with `VITE_`
2. Redeploy after adding variables
3. Check variable values are correct (no extra spaces)

## Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatic

## Performance Monitoring

Vercel provides:
- **Analytics**: View page views, performance
- **Speed Insights**: Real user metrics
- **Logs**: Debug production issues

Enable in Vercel dashboard → Analytics tab.

## Continuous Deployment

Vercel automatically:
- ✅ Deploys on every push to main branch
- ✅ Creates preview deployments for PRs
- ✅ Runs build checks
- ✅ Provides deployment URLs

## Next Steps

1. ✅ Deploy to Vercel (follow steps above)
2. ✅ Add environment variables
3. ✅ Test all routes
4. ✅ Set up custom domain (optional)
5. ✅ Enable analytics (optional)

Your site should now work perfectly on Vercel! 🚀

