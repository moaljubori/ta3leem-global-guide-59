
# Deployment Guide for cPanel Hosting

This guide provides step-by-step instructions for deploying this application to a cPanel hosting environment.

## Prerequisites
- cPanel hosting account
- Node.js and npm installed on your local machine
- Access to cPanel File Manager or FTP

## Build Process

1. Build the application locally:
```bash
npm run build
```

2. The build process will create a `dist` directory with the compiled application.

## Deployment Steps

### Option 1: Using File Manager
1. Log in to your cPanel account.
2. Open the File Manager.
3. Navigate to your website's public directory (usually `public_html` or `www`).
4. Create a new directory for your application or use an existing one.
5. Upload all files from the `dist` directory to this directory.
6. Ensure the `.htaccess` file is uploaded as well (it might be hidden).

### Option 2: Using FTP
1. Connect to your hosting using an FTP client.
2. Navigate to your website's public directory.
3. Upload all files from the `dist` directory to this directory.
4. Ensure the `.htaccess` file is uploaded as well (it might be hidden).

## Verifying the Deployment

1. Open your browser and navigate to your domain.
2. Test all routes to ensure the SPA routing is working correctly.
3. If you encounter issues, check the following:
   - The `.htaccess` file is present in the root directory.
   - Your hosting supports `.htaccess` and mod_rewrite is enabled.
   - The `index.html` file is in the correct location.

## Troubleshooting

If you encounter a 404 error when navigating to a route:
- Confirm the `.htaccess` file was correctly uploaded.
- Contact your hosting provider to ensure mod_rewrite is enabled for your account.
- Try creating a simple HTML file at the root to confirm basic file serving works.

If API calls are failing:
- Check that your API base URL is correctly configured.
- Ensure your hosting environment supports the backend technology you're using.
- Check server logs for any errors.
