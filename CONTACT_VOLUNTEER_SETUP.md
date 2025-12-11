# Contact & Volunteer Form Setup Guide

## Overview
Both the Contact page and Volunteer Registration page now submit data directly to Google Sheets instead of using email.

## Google Sheets Setup

### 1. Create "Contacts" Sheet
In your Google Spreadsheet, create a new sheet named **"Contacts"** with these columns (in order):
- `timestamp` - Auto-filled by the script
- `name` - From contact form
- `email` - From contact form
- `phone` - From contact form (optional)
- `subject` - From contact form (optional)
- `message` - From contact form

**Note:** The script will automatically create headers if the sheet is empty, but it's better to create them manually.

### 2. Create "Applicants" Sheet
In your Google Spreadsheet, create a new sheet named **"Applicants"** with these columns (in order):
- `full_name` - From volunteer form
- `phone_number` - From volunteer form
- `email` - From volunteer form
- `age` - From volunteer form
- `gender` - From volunteer form
- `interested_areas` - From volunteer form
- `blood_group` - From volunteer form (optional)
- `address` - From volunteer form

**Note:** The script will automatically create headers if the sheet is empty, but it's better to create them manually.

## Contact Page Features

### Design
- Hero section with breadcrumbs ("Home / Contact")
- Clean form layout with green/white color scheme
- Contact info cards at the bottom:
  - Helpline (phone number)
  - Send email (email address)
  - Address (location)

### Form Fields
- Your name (required)
- Email address (required)
- Phone (optional)
- Subject (optional)
- Write a message (required)

### Data Storage
All contact form submissions are saved to the **"Contacts"** sheet in your Google Spreadsheet.

## Volunteer Registration Page Features

### Form Fields
- Full Name (required)
- Phone Number (required)
- Email (required)
- Age (required, minimum 18)
- Select Gender (required dropdown)
- Choose Interested areas (required textarea)
- Blood Group (optional dropdown)
- Address (required textarea)

### Confirmation Dialog
Before submitting, users see a confirmation dialog showing all their entered information. They can:
- **Confirm & Submit** - Submits the form to Google Sheets
- **Edit** - Returns to the form to make changes

### Data Storage
All volunteer applications are saved to the **"Applicants"** sheet in your Google Spreadsheet.

## Apps Script Updates

The Apps Script has been updated with two new functions:

1. **`submitContactForm(postData)`** - Handles contact form submissions
2. **`submitVolunteerApplication(postData)`** - Handles volunteer form submissions

Both functions:
- Check if the sheet exists
- Create headers if the sheet is empty
- Append new rows with the form data
- Return success/error responses

## API Endpoints

### Contact Form Submission
```
POST /exec?type=submitContact
Body: {
  name: string,
  email: string,
  phone: string (optional),
  subject: string (optional),
  message: string
}
```

### Volunteer Application Submission
```
POST /exec?type=submitVolunteer
Body: {
  full_name: string,
  phone_number: string,
  email: string,
  age: string,
  gender: string,
  interested_areas: string,
  blood_group: string (optional),
  address: string
}
```

## Frontend API Functions

Two new functions have been added to `src/api/api.js`:

- `submitContactForm(formData)` - Submits contact form
- `submitVolunteerApplication(formData)` - Submits volunteer application

Both functions handle errors and return success/error responses.

## Testing

1. **Test Contact Form:**
   - Fill out the contact form
   - Submit and check the "Contacts" sheet for the new row

2. **Test Volunteer Form:**
   - Fill out all required fields
   - Click "Submit Application"
   - Review the confirmation dialog
   - Click "Confirm & Submit"
   - Check the "Applicants" sheet for the new row

## Troubleshooting

### Forms not submitting?
- Check browser console for errors
- Verify Apps Script is deployed correctly
- Ensure sheet names match exactly: "Contacts" and "Applicants"
- Check that columns match the expected order

### Data not appearing in sheets?
- Verify sheet names are correct (case-sensitive)
- Check Apps Script execution logs
- Ensure the Web App is deployed with "Anyone" access
- Verify CORS headers are set correctly

## Color Scheme

Both pages use the green and white color scheme:
- Primary green: `#22c55e` (Tailwind `primary`)
- White backgrounds
- Green accents for buttons and highlights
- Gray text for labels and secondary information

