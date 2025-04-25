
# Deployment Guide for cPanel Hosting

This guide provides step-by-step instructions for deploying this application to a cPanel hosting environment.

## Prerequisites
- cPanel hosting account
- Node.js and npm installed on your local machine
- Access to cPanel File Manager or FTP
- MySQL database in your cPanel account

## Database Setup

1. Log into cPanel and create a new MySQL database:
   - Go to "MySQL Databases"
   - Create a new database (e.g., `your_cpanel_username_mydatabase`)
   - Create a new database user or use an existing one
   - Add the user to the database with "All Privileges"

2. Note down your database credentials:
   - Database name (usually prefixed with your cPanel username)
   - Database username (usually prefixed with your cPanel username)
   - Database password
   - Database host (usually "localhost")

3. Import the database schema:
   - Go to phpMyAdmin in cPanel
   - Select your database
   - Click on "Import"
   - Upload all migration SQL files in the following order:
     - `migration_admin.sql`
     - `migration_media.sql`
     - `migration_pages.sql`
     - `migration_blog.sql`
     - `migration_countries_services.sql`
     - `migration_consultations.sql`
     - `migration_emails.sql`
     - `migration_settings.sql`
     - `migration_custom_code.sql`
     - `migration_ads.sql`
     - `migration_api.sql`
     - `migration_users_auth.sql`

## Build Process

1. Clone the repository to your local machine.

2. Update `.env` file with your cPanel database credentials:
   ```
   DB_HOST=localhost
   DB_USER=your_cpanel_username_database
   DB_PASSWORD=your_cpanel_database_password
   DB_DATABASE=your_cpanel_username_mydatabase
   DB_PORT=3306
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the frontend:
   ```bash
   npm run build
   ```

## Deployment Steps

### Option 1: Using File Manager

1. Log in to your cPanel account.

2. Open the File Manager.

3. Navigate to your website's public directory (usually `public_html` or `www`).

4. Create a new directory for your application (e.g., `myapp`). If you want to deploy at root, skip this step.

5. Upload the following files/directories to your chosen directory:
   - `dist` directory (all contents)
   - `server` directory
   - `uploads` directory (create if it doesn't exist)
   - `package.json`
   - `package-lock.json` or `npm-lock.json`
   - `server.js`
   - `.htaccess`
   - `.env` (update with correct database credentials)
   - `database.config.json` (update with correct database credentials)

6. Create a Node.js app in cPanel:
   - Go to "Setup Node.js App" in cPanel
   - Create a new Node.js application
   - Set the "Application path" to your directory (e.g., `/public_html/myapp`)
   - Set the "Application URL" to your domain or subdomain
   - Set the "Application startup file" to `server.js`
   - Choose the Node.js version (14.x or higher recommended)
   - Save and start the application

### Option 2: Using FTP

1. Connect to your hosting using an FTP client.

2. Navigate to your website's public directory.

3. Upload all files as described in Option 1.

4. Set up your Node.js app through cPanel as described in Option 1, step 6.

## Create an Admin User

After deploying, you'll need to create an admin user to manage the system:

1. Connect to your cPanel server via SSH if available or use the Terminal feature in cPanel.

2. Navigate to your application directory:
   ```bash
   cd public_html/myapp  # or your specific directory
   ```

3. Run the admin user creation script:
   ```bash
   node server/scripts/create-admin-user.js
   ```

4. Follow the prompts to create your admin user.

## Setting Up for Production

1. Update your `.env` file for production:
   ```
   NODE_ENV=production
   JWT_SECRET=[generate a secure random string]
   VITE_PUBLIC_URL=https://your-domain.com
   ALLOW_DB_FAIL=false
   ```

2. Make sure all directories have the correct permissions:
   - `uploads` directory needs to be writable (usually 755)
   - Set executable permissions for Node.js files:
     ```bash
     chmod +x server.js
     ```

## Domain Configuration

### If using a subdomain or addon domain

If you're deploying to a subdomain (e.g., `app.yourdomain.com`) or an addon domain, make sure:

1. The domain/subdomain is properly set up in cPanel.
2. Your Node.js application is configured with the correct URL.
3. The `.env` file has the correct `VITE_PUBLIC_URL`.

### If deploying to a subfolder

If you're deploying to a subfolder (e.g., `yourdomain.com/app`):

1. Update `VITE_API_BASE_URL=/app/api` in your `.env` file.
2. Make sure your routes and API paths are properly configured.

## Troubleshooting

1. **Application Not Starting**:
   - Check the Node.js application logs in cPanel
   - Verify your `package.json` has all required dependencies
   - Make sure there are no errors in your `.env` file

2. **Database Connection Issues**:
   - Verify your database credentials in `.env` and `database.config.json`
   - Make sure the database user has the correct permissions
   - Check if your database server allows remote connections (usually not needed for cPanel)

3. **404 Errors on Routes**:
   - Check that your `.htaccess` file is correctly uploaded
   - Verify that your cPanel hosting supports `.htaccess` overrides
   - Ensure your Node.js application is correctly serving the React app

4. **API Errors**:
   - Check the server logs for API errors
   - Verify the API routes are correctly defined
   - Test API endpoints using a tool like Postman

5. **File Upload Issues**:
   - Check permissions on the `uploads` directory
   - Verify the `MAX_FILE_SIZE` setting
   - Check if your cPanel hosting has any file size limits

## Backup and Maintenance

1. Regularly backup your database using cPanel's backup tools.

2. Keep your Node.js dependencies updated by periodically running:
   ```bash
   npm outdated
   npm update
   ```

3. Monitor the application logs in cPanel to catch and address any errors.

## Security Best Practices

1. Ensure your JWT_SECRET is strong and unique.
2. Don't store sensitive credentials in your code repository.
3. Use HTTPS for your domain.
4. Consider setting up IP restrictions for admin access.
5. Update all dependencies regularly to address security vulnerabilities.

## Contact and Support

If you need assistance with this deployment, please reach out to your web developer or system administrator.
