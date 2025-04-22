
-- Database: website_db

-- Table: admin_users
-- Stores admin user credentials and roles.
-- Includes fields for user profile information.
CREATE TABLE IF NOT EXISTS admin_users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    role VARCHAR(50) NOT NULL, -- e.g., 'admin', 'editor'
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_role (role)
);

-- Table: pages
-- Represents the structure of the website's pages.
-- Includes information for SEO and page content, with support for draft and published versions.
CREATE TABLE IF NOT EXISTS pages (
    page_id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    meta_description TEXT,
    parent_id INT,
    `order` INT,
    meta_keywords TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    version INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,    
    INDEX idx_is_published (is_published),
    INDEX idx_is_draft (is_draft)
);

-- Table: page_versions
-- Stores the history of page versions
CREATE TABLE IF NOT EXISTS page_versions (
    page_version_id INT AUTO_INCREMENT PRIMARY KEY,
    page_id INT NOT NULL,
    version INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (page_id) REFERENCES pages(page_id) ON DELETE CASCADE,
    INDEX idx_version(version)
);

-- Table: media_files
-- Stores information about uploaded media files.
-- Includes details like file name, path, and upload date.
-- IMPORTANT: This table is moved before sections to fix the foreign key constraint
CREATE TABLE IF NOT EXISTS media_files (
    file_id VARCHAR(36),
    file_version_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    `type` VARCHAR(50),
    `size` INT,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_upload_date (upload_date)
);

-- Table: sections
-- Represents the sections within a page.
-- Stores the content and type of each section.
-- Supports draft and published versions.
CREATE TABLE IF NOT EXISTS sections (
    section_id VARCHAR(36),
    section_version_id INT AUTO_INCREMENT PRIMARY KEY,
    page_version_id INT NOT NULL,
    type VARCHAR(255) NOT NULL, -- e.g., 'text', 'image', 'video'
    name VARCHAR(255),
    content TEXT,
    `order` INT,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    FOREIGN KEY (page_version_id) REFERENCES page_versions(page_version_id) ON DELETE CASCADE,
    INDEX idx_order (`order`)
);

-- Table: section_media
-- Join table to link media files to sections.
-- Defines the relationship between sections and media files.
-- IMPORTANT: This table must be created after both sections and media_files tables
CREATE TABLE IF NOT EXISTS section_media (
    section_version_id INT NOT NULL,
    file_version_id INT NOT NULL,
    PRIMARY KEY (section_version_id, file_version_id),
    FOREIGN KEY (section_version_id) REFERENCES sections(section_version_id) ON DELETE CASCADE,
    FOREIGN KEY (file_version_id) REFERENCES media_files(file_version_id) ON DELETE CASCADE,
    INDEX idx_section_version_id (section_version_id),
    INDEX idx_file_version_id (file_version_id)
);

-- Table: api_endpoints
-- Stores information about API endpoints.
-- Defines each API endpoint's name, URL, method, and description.
CREATE TABLE IF NOT EXISTS api_endpoints (
    endpoint_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) UNIQUE NOT NULL,
    method VARCHAR(10) NOT NULL, -- e.g., 'GET', 'POST', 'PUT', 'DELETE'
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_url (url),
    INDEX idx_method (method)
);

-- Table: api_requests
-- Tracks API requests and usage.
-- Logs each API request's details, including the status code.
CREATE TABLE IF NOT EXISTS api_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    endpoint_id INT NOT NULL,
    request_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_code INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (endpoint_id) REFERENCES api_endpoints(endpoint_id) ON DELETE CASCADE,
    INDEX idx_endpoint_id (endpoint_id),
    INDEX idx_request_date (request_date),
    INDEX idx_status_code (status_code)
);

-- Table: blog_posts
-- Stores information about blog posts.
-- Contains blog post details like title, content, image, publish date, and author. 
-- Supports draft and published versions.
CREATE TABLE IF NOT EXISTS blog_posts (
    post_id VARCHAR(36) PRIMARY KEY,
    post_version_id INT AUTO_INCREMENT UNIQUE,
    page_version_id INT UNIQUE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_version_id INT,
    publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    author_id INT,
    url VARCHAR(255),
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    category VARCHAR(255),
    tags TEXT,
    excerpt TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (page_version_id) REFERENCES page_versions(page_version_id) ON DELETE SET NULL,
    FOREIGN KEY (image_version_id) REFERENCES media_files(file_version_id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES admin_users(user_id) ON DELETE SET NULL
);

-- Table: consultations
-- Stores information about user consultations.
CREATE TABLE IF NOT EXISTS consultations (
    consultation_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status)
);

-- Table: notifications
-- Stores notifications for the admin panel.
CREATE TABLE IF NOT EXISTS notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(50),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES admin_users(user_id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read)
);

-- Table: emails
-- Stores email content and sending status.
CREATE TABLE IF NOT EXISTS emails (
    email_id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    recipient VARCHAR(255) NOT NULL,
    sent_at DATETIME,
    status VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_recipient (recipient),
    INDEX idx_status (status)
);

-- Table: custom_code
-- Stores custom HTML, CSS, or JavaScript code. 
-- Supports draft and published versions.
CREATE TABLE IF NOT EXISTS custom_code (
    code_id VARCHAR(36) PRIMARY KEY,
    code_version_id INT AUTO_INCREMENT UNIQUE,
    name VARCHAR(255) UNIQUE NOT NULL,
    html_code TEXT,
    css_code TEXT,
    js_code TEXT,
    location VARCHAR(255),
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name)
);

-- Table: settings
-- Stores website settings.
-- Supports draft and published versions
CREATE TABLE IF NOT EXISTS settings (
    setting_id VARCHAR(36) PRIMARY KEY,
    setting_version_id INT AUTO_INCREMENT UNIQUE,
    name VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(50),
    category VARCHAR(255),
    description TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name)
);

-- Table: blog_categories
CREATE TABLE IF NOT EXISTS blog_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name)
);

-- Table: advertisements
-- Stores information about website advertisements.
-- Supports draft and published versions.
CREATE TABLE IF NOT EXISTS advertisements (
    advertisement_id VARCHAR(36) PRIMARY KEY,
    advertisement_version_id INT AUTO_INCREMENT UNIQUE,
    name VARCHAR(255) NOT NULL,
    content TEXT,
    start_date DATETIME,
    end_date DATETIME,
    url VARCHAR(255),
    image_version_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,    
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (image_version_id) REFERENCES media_files(file_version_id) ON DELETE SET NULL,
    INDEX idx_is_active (is_active)
);
