# Deployment Instructions

## Frontend Deployment

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

1. Copy `env.example` to `.env` (or `.env.local`)
2. Fill in your actual values:
   - `VITE_APP_SCRIPT_URL`: Your Google Apps Script Web App URL
   - `VITE_RAZORPAY_KEY_ID`: Your Razorpay Key ID (public key)

### Step 3: Test Locally

```bash
npm run dev
```

Visit `http://localhost:5173` to test the website.

### Step 4: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Step 5: Deploy

#### Option A: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables:
   - `VITE_APP_SCRIPT_URL`
   - `VITE_RAZORPAY_KEY_ID`
5. Deploy

#### Option B: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in Site settings
6. Deploy

#### Option C: Manual Deployment

1. Upload the contents of the `dist` folder to your web server
2. Configure your server to:
   - Serve `index.html` for all routes (SPA routing)
   - Enable HTTPS (required for Razorpay)

## Backend Deployment (Google Apps Script)

See `apps-script/README.md` for detailed backend setup instructions.

## Connecting Frontend to Backend

1. **Deploy Google Apps Script** as a Web App (see `apps-script/README.md`)
2. **Copy the Web App URL** from the deployment
3. **Update `.env` file** with the Web App URL:
   ```
   VITE_APP_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
4. **Rebuild and redeploy** your frontend

## Testing the Integration

1. Test API endpoints:
   - Visit: `YOUR_APP_SCRIPT_URL?type=cases`
   - Should return JSON with cases data

2. Test payment flow:
   - Go to `/cases` page
   - Click "Donate Now" on a case
   - Use Razorpay test credentials to complete payment

## Troubleshooting

### CORS Errors

- Ensure Google Apps Script Web App is deployed with "Anyone" access
- Check that you're using the Web App URL (not the script editor URL)

### Payment Not Working

- Verify Razorpay keys are correct
- Check browser console for errors
- Ensure HTTPS is enabled (Razorpay requires HTTPS)

### API Not Responding

- Verify the Web App URL is correct
- Check Google Apps Script execution logs
- Ensure Spreadsheet ID is correct in the script

## Production Checklist

- [ ] Environment variables configured
- [ ] Google Apps Script deployed and tested
- [ ] Razorpay keys configured (use live keys for production)
- [ ] HTTPS enabled
- [ ] All pages tested
- [ ] Payment flow tested
- [ ] Mobile responsiveness verified
- [ ] Contact information updated
- [ ] Trust address updated


