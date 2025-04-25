
# Website Content Management System

A complete CMS solution designed for deployment on cPanel hosting environments. This application provides a full-featured admin panel to manage your website content, blog posts, media, and more using MySQL for data storage.

## Features

### Backend

- **MySQL Database**: Complete schema for all website content.
- **RESTful APIs**: Secure endpoints for CRUD operations on all content types.
- **Authentication**: JWT-based authentication and role-based access control.
- **File Management**: Upload and manage media files directly on your cPanel hosting.
- **Versioning**: Content versioning for pages and blog posts.

### Admin Panel

- **Dashboard**: Overview of website statistics and recent activity.
- **Content Management**: 
  - Pages: Create/edit/delete website pages
  - Blog: Full-featured blog management
  - Media: Upload and organize images and files
  - Countries and Services: Manage location-specific content
  - Users: Admin user management
- **Settings**: Configure website options and preferences

### Frontend Integration

- **Dynamic Content**: All website pages can be rendered from the database.
- **SEO Management**: Meta titles, descriptions, and custom URLs.
- **Blog System**: Feature-rich blog with categories and tags.

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: MySQL
- **Authentication**: JWT with refresh tokens
- **File Uploads**: Multer for handling file uploads
- **Frontend Admin**: React with Tailwind CSS
- **API Client**: Custom axios-based request library

## Setup and Installation

### Local Development

1. Clone the repository
2. Create a `.env` file based on `.env.example`
3. Install dependencies: `npm install`
4. Set up the database:
   - Create a MySQL database
   - Import the migration SQL files
5. Run the development server: `npm run dev`

### Database Setup

The project includes multiple migration SQL files that create the necessary database structure:

- `migration_admin.sql`: Admin users and notifications tables
- `migration_pages.sql`: Pages, versions, and sections tables
- `migration_blog.sql`: Blog posts and categories tables
- `migration_media.sql`: Media files table
- `migration_countries_services.sql`: Countries and services tables
- `migration_settings.sql`: Settings table
- `migration_users_auth.sql`: User authentication tables
- `migration_consultations.sql`: Consultation requests table
- `migration_custom_code.sql`: Custom HTML/CSS/JS code table
- `migration_ads.sql`: Advertisements table

### Creating an Admin User

Run the admin user creation script:

```bash
node server/scripts/create-admin-user.js
```

Follow the prompts to create your initial admin account.

## API Routes

The application provides comprehensive API endpoints:

- `/api/auth`: Authentication endpoints (login, refresh token, etc.)
- `/api/users`: User management
- `/api/pages`: Page content management
- `/api/blog`: Blog post management
- `/api/media`: Media file management
- `/api/countries`: Country data management
- `/api/services`: Services management
- `/api/settings`: System settings
- `/api/consultations`: Consultation requests

## Deployment

For detailed deployment instructions, please refer to [DEPLOYMENT.md](DEPLOYMENT.md).

### Key Considerations for cPanel

- Database configuration using cPanel MySQL
- Node.js setup via cPanel's Node.js Selector
- File permissions and directory structure
- Domain and subdomain configuration

## Security

- JWT-based authentication with refresh tokens
- Password hashing using bcrypt
- Role-based authorization (admin, editor)
- Rate limiting for API requests
- Input validation and sanitization
- Parameterized SQL queries

## Best Practices

- Always back up your database before making significant changes
- Use the versioning system for content changes
- Keep your Node.js and npm packages updated
- Monitor server logs for errors
- Use strong passwords for admin accounts

## License

This project is proprietary. All rights reserved.
