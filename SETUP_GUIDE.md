
# MySQL Database and API Setup Guide

This guide provides step-by-step instructions for setting up the database and API for your website.

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Database Setup](#database-setup)
3. [API Configuration](#api-configuration)
4. [Security Best Practices](#security-best-practices)
5. [Deployment Instructions](#deployment-instructions)
   - [cPanel Hosting](#cpanel-hosting)
   - [AWS](#aws)
   - [DigitalOcean](#digitalocean)

## Local Development Setup

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://your-repository-url.git
   cd your-project-folder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file with your database credentials and other settings.

## Database Setup

### Setting Up MySQL Database

1. Log in to your MySQL server:
   ```bash
   mysql -u root -p
   ```

2. Create the database:
   ```sql
   CREATE DATABASE mydatabase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. Create a database user:
   ```sql
   CREATE USER 'dbuser'@'localhost' IDENTIFIED BY 'your_strong_password';
   GRANT ALL PRIVILEGES ON mydatabase.* TO 'dbuser'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. Import the database schema:
   ```bash
   mysql -u dbuser -p mydatabase < database_schema.sql
   ```

5. Run additional migration scripts as needed:
   ```bash
   mysql -u dbuser -p mydatabase < migration_users_auth.sql
   mysql -u dbuser -p mydatabase < migration_blog.sql
   mysql -u dbuser -p mydatabase < migration_admin.sql
   mysql -u dbuser -p mydatabase < migration_api.sql
   ```

### Creating an Initial Admin User

Run the provided admin user creation script:

```bash
cd server/scripts
node create-admin-user.js
```

Follow the prompts to create your admin user.

## API Configuration

### Setting Up the Server

1. Make sure your `.env` file has the correct database and server configurations:

```
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key_here

# File Upload Limits
MAX_FILE_SIZE=10485760  # 10MB in bytes

# API URL Configuration
VITE_API_BASE_URL=/api

# Database Configuration - replace these with your database credentials
DB_HOST=localhost
DB_USER=dbuser
DB_PASSWORD=your_strong_password
DB_DATABASE=mydatabase
DB_PORT=3306
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

3. Test the API endpoints:
```bash
curl http://localhost:3001/api/status
```

## Security Best Practices

1. **Environment Variables**: Never commit sensitive information to your repository. Use environment variables for all secrets.

2. **Password Hashing**: All passwords are hashed using bcrypt with a strong salt factor.

3. **JWT Authentication**: The API uses JWT tokens for authentication with short expiration times.

4. **Refresh Tokens**: The app implements refresh tokens to maintain user sessions securely.

5. **Parameterized Queries**: All database queries use parameterized statements to prevent SQL injection.

6. **Input Validation**: API endpoints validate incoming data to prevent injection attacks.

7. **Role-Based Access Control**: Resources are protected by role-based middleware.

## Deployment Instructions

### cPanel Hosting

1. **Prepare your application**:
   - Set NODE_ENV to 'production' in your .env file
   - Build your frontend: `npm run build`

2. **Database setup**:
   - Create a MySQL database through cPanel
   - Import your database schema using phpMyAdmin or MySQL Wizard
   - Note down the database name, username, and password

3. **Uploading files**:
   - Upload your application files to your hosting account using FTP
   - Ensure file permissions are set correctly:
     - Files: 644
     - Directories: 755
     - Script files: 755

4. **Environment configuration**:
   - Update your `.env` file with cPanel database credentials
   - Set the correct domain name in VITE_PUBLIC_URL
   - Set a secure JWT_SECRET

5. **Setup Node.js application**:
   - In cPanel, locate "Setup Node.js App"
   - Create a new Node.js application
   - Configure the application:
     - Node.js version: Select the appropriate version
     - Application mode: Production
     - Application root: Path to your application
     - Application URL: Your domain or subdomain
     - Application startup file: server.js
     - Start and stop ports: Use default or as recommended by your host

6. **Setup persistent database connection**:
   - Update database.config.json with your cPanel MySQL credentials
   - Double-check that the connection parameters match your cPanel hosting

7. **Configure domain routing**:
   - Set up domain/subdomain pointing to your Node.js application
   - Make sure API requests are properly routed to your Node.js instance

### AWS

1. **EC2 Instance Setup**:
   - Launch an EC2 instance (Ubuntu Server recommended)
   - Configure security groups to allow HTTP (80), HTTPS (443), SSH (22)
   - Connect to your instance: `ssh -i your-key.pem ubuntu@your-ec2-ip`

2. **Install requirements**:
   ```bash
   sudo apt update
   sudo apt install mysql-server nodejs npm nginx git
   ```

3. **Database setup**:
   ```bash
   sudo mysql_secure_installation
   sudo mysql
   ```
   
   In MySQL console:
   ```sql
   CREATE DATABASE mydatabase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'dbuser'@'localhost' IDENTIFIED BY 'your_strong_password';
   GRANT ALL PRIVILEGES ON mydatabase.* TO 'dbuser'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

4. **Clone and configure your application**:
   ```bash
   git clone https://your-repository-url.git
   cd your-project-folder
   npm install
   cp .env.example .env
   nano .env  # Edit with your production settings
   ```

5. **Import database schema**:
   ```bash
   mysql -u dbuser -p mydatabase < database_schema.sql
   ```

6. **Setup PM2 for process management**:
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "my-app"
   pm2 startup
   ```

7. **Configure Nginx**:
   ```bash
   sudo nano /etc/nginx/sites-available/my-app
   ```
   
   Add:
   ```
   server {
     listen 80;
     server_name your-domain.com www.your-domain.com;
     
     location / {
       proxy_pass http://localhost:3001;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

8. **Enable site and configure SSL**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   
   # Install Certbot for SSL
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

### DigitalOcean

1. **Create a Droplet**:
   - Choose Ubuntu 20.04 (LTS)
   - Select appropriate size (minimum 1GB RAM recommended)
   - Add your SSH key
   - Create droplet

2. **Initial Server Setup**:
   ```bash
   ssh root@your-droplet-ip
   adduser your-username
   usermod -aG sudo your-username
   ```

3. **Install software**:
   ```bash
   apt update
   apt install mysql-server nodejs npm nginx git ufw
   ```

4. **Configure firewall**:
   ```bash
   ufw allow OpenSSH
   ufw allow 'Nginx Full'
   ufw enable
   ```

5. **Setup MySQL**:
   ```bash
   mysql_secure_installation
   mysql
   ```
   
   In MySQL console:
   ```sql
   CREATE DATABASE mydatabase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'dbuser'@'localhost' IDENTIFIED BY 'your_strong_password';
   GRANT ALL PRIVILEGES ON mydatabase.* TO 'dbuser'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

6. **Deploy your application**:
   ```bash
   mkdir -p /var/www
   cd /var/www
   git clone https://your-repository-url.git my-app
   cd my-app
   npm install
   cp .env.example .env
   nano .env  # Edit with your production settings
   mysql -u dbuser -p mydatabase < database_schema.sql
   ```

7. **Setup PM2**:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "my-app"
   pm2 startup systemd
   # Run the command PM2 gives you
   pm2 save
   ```

8. **Configure Nginx**:
   ```bash
   nano /etc/nginx/sites-available/my-app
   ```
   
   Add:
   ```
   server {
     listen 80;
     server_name your-domain.com www.your-domain.com;
     
     location / {
       proxy_pass http://localhost:3001;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

9. **Enable site and configure SSL**:
   ```bash
   ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   
   # Install Certbot for SSL
   apt install certbot python3-certbot-nginx
   certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

10. **Create an admin user**:
    ```bash
    cd /var/www/my-app/server/scripts
    node create-admin-user.js
    ```

## Example API Requests

### Authentication

**Login**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_password"}'
```

**Get Current User**
```bash
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Blog Posts

**Get All Posts**
```bash
curl http://localhost:3001/api/blog
```

**Get Single Post**
```bash
curl http://localhost:3001/api/blog/post_id_here
```

**Create Post** (requires authentication)
```bash
curl -X POST http://localhost:3001/api/blog \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"New Post","content":"Post content","is_published":true}'
```

**Update Post** (requires authentication)
```bash
curl -X PUT http://localhost:3001/api/blog/post_id_here \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Updated Title","content":"Updated content"}'
```

**Delete Post** (requires authentication)
```bash
curl -X DELETE http://localhost:3001/api/blog/post_id_here \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
