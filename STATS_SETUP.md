# Stats Section Setup Guide

## ✅ What Was Done

### 1. Installed NumberFlow Package
- Installed `@number-flow/react` for animated number display
- Created `NumberFlowComponent` wrapper in `src/components/ui/NumberFlow.jsx`

### 2. Updated Google Apps Script
- Added `getStats()` function to fetch stats from "Stats" sheet
- Added `?type=stats` endpoint to `doGet()` handler
- Reads columns: `total_donars`, `total_cases`, `our_volunteers`

### 3. Updated API Service
- Added `fetchStats()` function in `src/api/api.js`
- Includes caching (5 minutes)
- Returns default values if fetch fails

### 4. Updated Home Page
- Integrated NumberFlow components for animated stats
- Fetches stats from Google Sheets on page load
- Shows loading state while fetching
- Displays animated numbers with NumberFlow

## 📋 Google Sheet Setup

### Create "Stats" Sheet

1. **Open your Google Sheet** (the same one used for Cases, Media, Donations)

2. **Create a new sheet** named exactly: `Stats`

3. **Add column headers** in Row 1:
   - `total_donars` (Column A)
   - `total_cases` (Column B)
   - `our_volunteers` (Column C)

4. **Add data** in Row 2:
   - Example:
     ```
     total_donars | total_cases | our_volunteers
     5513         | 13          | 203
     ```

### Sheet Structure:
```
Row 1 (Headers):
| total_donars | total_cases | our_volunteers |
|--------------|-------------|----------------|
Row 2 (Data):
| 5513         | 13          | 203            |
```

## 🎨 Features

### NumberFlow Animation:
- ✅ Smooth number transitions
- ✅ Animated counting effect
- ✅ Professional number display
- ✅ Responsive design

### Stats Display:
- ✅ **Total Donated Donors**: Uses `total_donars`
- ✅ **Total Cases**: Uses `total_cases`
- ✅ **Total Donors**: Uses `total_donars` (same as Total Donated Donors)
- ✅ **Our Volunteers**: Uses `our_volunteers`

## 🔧 Customization

### Update Stats:
Simply update the values in your Google Sheet's "Stats" sheet, and the website will automatically display the new numbers with smooth animations.

### Change Column Names:
If you want different column names, update:
1. Column headers in Google Sheet
2. `apps-script/Code.gs` - `getStats()` function
3. `src/pages/Home.jsx` - stats state and display

## 🚀 How It Works

1. **Page Loads**: Home page fetches stats from Google Sheets
2. **NumberFlow Animates**: Numbers smoothly transition from 0 to actual values
3. **Auto-Update**: Stats are cached for 5 minutes, then refreshed

## 📝 Notes

- Stats are cached for 5 minutes to reduce API calls
- If the Stats sheet doesn't exist, default values (0) are shown
- NumberFlow provides smooth, professional number animations
- All stats update automatically when you change values in Google Sheets

Everything is ready! Just create the "Stats" sheet in your Google Sheet with the column headers and data. 🎉

