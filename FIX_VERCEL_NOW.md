# ⚠️ URGENT FIX: "vite: command not found"

## The Problem
Vercel is running `vite build` directly, but `vite` isn't installed because dependencies weren't installed first.

## ✅ IMMEDIATE FIX

### Step 1: Go to Vercel Dashboard
1. https://vercel.com/dashboard
2. Click your project
3. **Settings** → **General**
4. Scroll to **Build & Development Settings**

### Step 2: Check These Settings EXACTLY

**⚠️ CRITICAL - Build Command:**
- Must be: `npm run build`
- **NOT** `vite build` (this is the problem!)
- **NOT** `npx vite build`

**Install Command:**
- Must be: `npm install`
- This installs dependencies BEFORE build

**Output Directory:**
- Must be: `dist`

### Step 3: If Settings Look Wrong

If you see `vite build` in Build Command:
1. **Delete** the current build command
2. Type: `npm run build`
3. Click **Save**

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **three dots (⋯)** on latest
3. Click **Redeploy**
4. Wait for build

### Step 5: Check Build Logs

You should see:
```
Installing dependencies...
Running "npm install"
...
Running "npm run build"
vite v5.4.21 building for production...
```

## Why This Happens

Vercel's Vite preset might be setting:
- Build Command: `vite build` ❌ (wrong - command not found)
- Instead of: `npm run build` ✅ (correct - uses package.json script)

## Alternative: Use npm ci

If `npm install` doesn't work, change:

**Install Command:**
```
npm ci
```

This is more reliable for production.

## Quick Action

1. ✅ Go to Settings → General → Build & Development Settings
2. ✅ **Build Command**: Change to `npm run build`
3. ✅ **Install Command**: Make sure it's `npm install`
4. ✅ Click **Save**
5. ✅ Redeploy
6. ✅ Check logs show "Installing dependencies" first

## Expected Logs (After Fix)

```
Installing dependencies...
Running "npm install"
added 137 packages...
Running "npm run build"
vite v5.4.21 building for production...
✓ 49 modules transformed.
✓ built in 5.44s
```

If you see "vite: command not found", the Build Command is still wrong!

## Summary

**The issue:** Vercel is running `vite build` directly
**The fix:** Change Build Command to `npm run build`

This will:
1. Install dependencies first (`npm install`)
2. Run the build script (`npm run build`)
3. Which runs `vite build` from node_modules

Fix the Build Command and it will work! 🚀

