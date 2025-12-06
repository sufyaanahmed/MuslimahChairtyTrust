# Setup Instructions

## Quick Start Commands

Run these commands in order:

```bash
# 1. Install all dependencies
npm install

# 2. Create environment file
# Copy env.example to .env and fill in your values
cp env.example .env

# 3. Start development server
npm run dev
```

## Detailed Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- React & React DOM
- React Router DOM
- Vite
- TailwindCSS
- PostCSS & Autoprefixer

### 2. Configure Environment Variables

1. Create a `.env` file in the root directory
2. Copy the contents from `env.example`
3. Fill in your actual values:

```env
VITE_APP_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

**Important:** 
- Get `VITE_APP_SCRIPT_URL` after deploying Google Apps Script (see `apps-script/README.md`)
- Get `VITE_RAZORPAY_KEY_ID` from your Razorpay dashboard

### 3. Start Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Next Steps

1. **Set up Google Sheets Backend** - Follow `apps-script/README.md`
2. **Deploy Google Apps Script** - Get your Web App URL
3. **Update `.env` file** - Add the Web App URL
4. **Test the website** - Verify all pages and payment flow
5. **Deploy frontend** - Follow `DEPLOYMENT.md`

## Project Structure

```
muslimah-charity-trust/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── api/             # API service functions
│   ├── styles/          # Global styles
│   ├── App.jsx          # Main app with routing
│   └── main.jsx         # Entry point
├── apps-script/         # Google Apps Script backend
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # TailwindCSS configuration
└── postcss.config.js    # PostCSS configuration
```

## Troubleshooting

### Port Already in Use

If port 5173 is busy, Vite will automatically use the next available port.

### Module Not Found Errors

Run `npm install` again to ensure all dependencies are installed.

### Environment Variables Not Working

- Make sure `.env` file is in the root directory
- Restart the dev server after changing `.env`
- Variables must start with `VITE_` to be accessible in the frontend

### TailwindCSS Not Working

- Ensure `tailwind.config.js` is configured correctly
- Check that `postcss.config.js` exists
- Verify `src/styles/index.css` has Tailwind directives

## Need Help?

- Check `README.md` for general information
- Check `apps-script/README.md` for backend setup
- Check `DEPLOYMENT.md` for deployment instructions


