# Fix "vite: command not found" Error

## The Problem
```
sh: line 1: vite: command not found
Error: Command "vite build" exited with 127
```

This means Vercel is trying to run `vite build` directly, but `vite` isn't installed because dependencies weren't installed first.

## ✅ Solution: Fix Vercel Settings

### Step 1: Go to Vercel Dashboard
1. https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **General**
4. Scroll to **Build & Development Settings**

### Step 2: Configure These EXACT Settings

**Framework Preset:**
- Select **"Vite"** (or "Other" if Vite not available)

**Root Directory:**
- Leave empty (`.`)

**Build Command:**
- **IMPORTANT:** Make sure it's exactly: `npm run build`
- NOT `vite build` (that's the problem!)

**Output Directory:**
- Type: `dist`

**Install Command:**
- **IMPORTANT:** Make sure it's: `npm install`
- This installs dependencies BEFORE build

**Development Command:**
- `npm run dev` (optional)

### Step 3: Save and Redeploy

1. Click **Save**
2. Go to **Deployments** tab
3. Click **Redeploy** on latest deployment
4. Wait for build to complete

### Step 4: Verify Build Logs

After redeploy, you should see:
```
Installing dependencies...
npm install
...
Running "npm run build"
vite v5.4.21 building for production...
✓ 49 modules transformed.
```

## Why This Happens

Vercel might be:
- Running `vite build` directly (command not found)
- Not installing dependencies first
- Using wrong build command

**Solution:** Use `npm run build` (which runs the script in package.json)

## Alternative: Use npm ci

If `npm install` doesn't work, try:

**Install Command:**
```
npm ci
```

This is more reliable for production builds.

## Quick Checklist

- [ ] Framework: **Vite**
- [ ] Build Command: **npm run build** (NOT vite build!)
- [ ] Install Command: **npm install** (or npm ci)
- [ ] Output Directory: **dist**
- [ ] Click **Save**
- [ ] Redeploy
- [ ] Check logs show "Installing dependencies" first
- [ ] Check logs show "Running npm run build"
- [ ] Build succeeds

## Expected Build Log (After Fix)

```
Installing dependencies...
Running "npm install"
...
Running "npm run build"
vite v5.4.21 building for production...
✓ 49 modules transformed.
dist/index.html                   0.72 kB
dist/assets/index-*.css   14.54 kB
dist/assets/index-*.js   195.20 kB
✓ built in 5.44s
```

## If Still Not Working

### Option 1: Check package.json

Make sure `package.json` has:
```json
{
  "scripts": {
    "build": "vite build"
  },
  "devDependencies": {
    "vite": "^5.0.8"
  }
}
```

### Option 2: Use npm ci

Change Install Command to:
```
npm ci
```

This is more reliable for CI/CD.

### Option 3: Check Node Version

In Vercel Settings → General:
- **Node.js Version**: Should be 18.x or 20.x
- If not set, Vercel will auto-detect

## Summary

The key issue is:
- ❌ Vercel is running `vite build` directly (command not found)
- ✅ Should run `npm run build` (which uses the script in package.json)
- ✅ Must install dependencies first with `npm install`

Fix the Build Command to `npm run build` and it should work!

