# Fix "Could not read package.json" Error

## The Problem
```
npm error path /vercel/path0/package.json
npm error errno -2
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory
```

Vercel is looking for `package.json` in the wrong directory.

## ✅ Solution: Set Root Directory

### Step 1: Go to Vercel Dashboard
1. https://vercel.com/dashboard
2. Click your project
3. **Settings** → **General**
4. Scroll to **Build & Development Settings**

### Step 2: Check Root Directory Setting

Look for **"Root Directory"** field (it might be above Framework Preset).

**Set it to:**
- Leave it **EMPTY** (`.`)
- OR type: `.` (current directory)

**If Root Directory is set to something else:**
- Clear it
- Leave it empty
- Click **Save**

### Step 3: Verify Other Settings

Make sure these are correct:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Output Directory**: `dist`
- **Root Directory**: Empty (`.`)

### Step 4: Save and Redeploy

1. Click **Save**
2. Go to **Deployments** tab
3. Click **Redeploy**
4. Wait for build

### Step 5: Check Build Logs

You should see:
```
Cloning github.com/...
Cloning completed
Running "install" command: `npm install`...
added 137 packages...
Running "npm run build"...
vite v5.4.21 building for production...
```

## Why This Happens

Vercel might be:
- Looking in a subdirectory instead of root
- Root Directory setting is wrong
- Repository structure issue

**Solution:** Set Root Directory to `.` (empty) so it looks in the repository root.

## Alternative: Check Repository Structure

Make sure `package.json` is in the root of your GitHub repository:
```
MuslimahChairtyTrust/
  ├── package.json  ← Must be here
  ├── vite.config.js
  ├── src/
  └── ...
```

If `package.json` is in a subdirectory, set Root Directory to that subdirectory.

## Quick Checklist

- [ ] Go to Settings → General → Build & Development Settings
- [ ] **Root Directory**: Set to `.` (empty/current directory)
- [ ] Build Command: `npm run build`
- [ ] Install Command: `npm install`
- [ ] Output Directory: `dist`
- [ ] Click **Save**
- [ ] Redeploy
- [ ] Check logs show "added packages" (npm install worked)
- [ ] Check logs show "Running npm run build"

## Expected Build Log (After Fix)

```
Cloning github.com/...
Cloning completed
Running "install" command: `npm install`...
added 137 packages, and audited 138 packages
Running "npm run build"...
vite v5.4.21 building for production...
✓ 49 modules transformed.
✓ built in 5.44s
```

## If Still Not Working

### Option 1: Verify package.json is in Repository

1. Go to your GitHub repository
2. Check that `package.json` is in the root
3. If it's in a subdirectory, set Root Directory to that subdirectory

### Option 2: Check Repository Branch

Make sure Vercel is deploying from the correct branch:
- Settings → Git → Production Branch
- Should be `main` (or your default branch)

### Option 3: Re-import Project

1. Delete project in Vercel
2. Re-import from GitHub
3. During import, make sure:
   - Root Directory is empty (`.`)
   - Framework is Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

## Summary

**The issue:** Vercel can't find `package.json` (wrong directory)
**The fix:** Set Root Directory to `.` (empty) in Vercel settings

This tells Vercel to look in the repository root where `package.json` is located.

