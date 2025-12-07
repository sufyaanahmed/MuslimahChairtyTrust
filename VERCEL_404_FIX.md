# Fix Vercel 404 Error - Step by Step

## The Problem
Getting 404 errors on all routes except the home page on Vercel.

## Solution Steps

### Step 1: Verify vercel.json is in Repository

The `vercel.json` file should be in the root of your repository. It's already there, but verify it's committed:

```bash
git status
```

If `vercel.json` shows as untracked or modified, commit it:

```bash
git add vercel.json
git commit -m "Fix Vercel 404 with proper routing"
git push
```

### Step 2: Check Vercel Project Settings

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **General**
4. Check these settings:

**Build & Development Settings:**
- **Framework Preset**: `Vite` (or `Other`)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Redeploy

After updating settings:

1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger redeploy

### Step 4: Clear Cache (If Still Not Working)

1. In Vercel dashboard → **Settings** → **General**
2. Scroll to **Deployment Protection**
3. Clear any cache if available
4. Redeploy

### Step 5: Alternative - Use _redirects File

If `vercel.json` still doesn't work, create a `public/_redirects` file:

1. Create `public` folder in root (if it doesn't exist)
2. Create `public/_redirects` file with:
   ```
   /*    /index.html   200
   ```

3. Commit and push:
   ```bash
   git add public/_redirects
   git commit -m "Add redirects file for Vercel"
   git push
   ```

## Quick Fix Checklist

- [ ] `vercel.json` is in root directory
- [ ] `vercel.json` is committed to Git
- [ ] Vercel project settings:
  - [ ] Framework: Vite
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
- [ ] Redeployed after changes
- [ ] Cleared browser cache
- [ ] Tested in incognito mode

## Verify It's Working

After redeploying, test these URLs:
- `https://your-app.vercel.app/` - Should work
- `https://your-app.vercel.app/cases` - Should work (not 404)
- `https://your-app.vercel.app/gallery` - Should work (not 404)
- `https://your-app.vercel.app/story` - Should work (not 404)

## Still Not Working?

### Option 1: Check Build Logs

1. Go to Vercel dashboard → **Deployments**
2. Click on the latest deployment
3. Check **Build Logs** for errors
4. Make sure build completed successfully

### Option 2: Manual Configuration

1. In Vercel dashboard → **Settings** → **General**
2. Under **Build & Development Settings**, manually set:
   - Framework: `Vite`
   - Root Directory: `.` (or leave empty)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Option 3: Delete and Re-import

If nothing works:
1. Delete the project in Vercel
2. Re-import from GitHub
3. Configure settings during import
4. Deploy

## Common Issues

### Issue: vercel.json Not Applied
**Fix:** Make sure it's in the root directory and committed to Git

### Issue: Wrong Output Directory
**Fix:** Set Output Directory to `dist` in Vercel settings

### Issue: Build Fails
**Fix:** Check build logs, ensure all dependencies are in package.json

### Issue: Still 404 After Fix
**Fix:** 
1. Clear browser cache
2. Try incognito mode
3. Wait a few minutes (CDN propagation)

## Updated vercel.json

The `vercel.json` has been updated with:
- Explicit build settings
- Better routing pattern
- Framework specification

After pushing, Vercel should automatically apply these settings.

## Next Steps

1. ✅ Verify `vercel.json` is committed
2. ✅ Check Vercel project settings
3. ✅ Redeploy
4. ✅ Test all routes
5. ✅ If still 404, try `public/_redirects` method

Your routes should work after these steps! 🚀

