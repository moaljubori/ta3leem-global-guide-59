-- Database: website_db

-- Table: admin_users
-- Stores admin user credentials and roles.
-- Includes fields for user profile information.
CREATE TABLE admin_users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    role VARCHAR(50) NOT NULL, -- e.g., 'admin', 'editor'
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_role (role)
);

-- Table: pages
-- Represents the structure of the website's pages.
-- Includes information for SEO and page content, with support for draft and published versions.
CREATE TABLE pages (
    page_version_id INT AUTO_INCREMENT PRIMARY KEY,
    page_id INT NOT NULL,
    url VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    meta_description TEXT,
    meta_keywords TEXT,
    is_published BOOLEAN DEFAULT FALSE, -- Indicates if this is the published version
    is_draft BOOLEAN DEFAULT TRUE, -- Indicates if this is a draft version
    version INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_page_id (page_id),
    INDEX idx_is_draft (is_draft),
    INDEX idx_version(version)
);

-- Table: page_versions
-- Stores the history of page versions
CREATE TABLE page_versions (
    page_version_id INT AUTO_INCREMENT PRIMARY KEY,
    page_id INT NOT NULL,
    
    FOREIGN KEY (page_id) REFERENCES pages(page_id) ON DELETE CASCADE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Change section_version_id to page_version_id
-- Table: sections
-- Represents the sections within a page.
-- Stores the content and type of each section.
-- Supports draft and published versions.
CREATE TABLE sections (
    section_version_id INT AUTO_INCREMENT PRIMARY KEY,
    section_id INT NOT NULL,
    page_version_id INT NOT NULL,
    type VARCHAR(255) NOT NULL, -- e.g., 'text', 'image', 'video'
    content TEXT,
    order_number INT,
    is_published BOOLEAN DEFAULT FALSE, -- Indicates if this is the published version
    is_draft BOOLEAN DEFAULT TRUE, -- Indicates if this is a draft version
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,    
    INDEX idx_type (type),
    FOREIGN KEY (page_version_id) REFERENCES page_versions(page_version_id) ON DELETE CASCADE,
    INDEX idx_order_number (order_number)
);

-- Table: media_files
-- Stores information about uploaded media files.
-- Includes details like file name, path, and upload date.
-- Supports draft and published versions
CREATE TABLE media_files (
    file_version_id INT AUTO_INCREMENT PRIMARY KEY,
    file_id INT,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    upload_date DATETIME,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_upload_date (upload_date)
);

CREATE TABLE media_files_versions (
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_upload_date (upload_date)
);

-- Add section_id index
-- Table: section_media
-- Join table to link media files to sections.
-- Defines the relationship between sections and media files. 
-- All related data are versioned
CREATE TABLE section_media (
    section_version_id INT,
    file_version_id INT,
    PRIMARY KEY (section_version_id, file_version_id),
    FOREIGN KEY (section_version_id) REFERENCES sections(section_version_id) ON DELETE CASCADE,
    FOREIGN KEY (file_version_id) REFERENCES media_files(file_version_id) ON DELETE CASCADE,
    INDEX idx_section_version_id (section_version_id),
    INDEX idx_file_version_id (file_version_id)
    
);

-- Table: api_endpoints
-- Stores information about API endpoints.
-- Defines each API endpoint's name, URL, method, and description.
CREATE TABLE api_endpoints (
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
CREATE TABLE api_requests (
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
CREATE TABLE blog_posts (
    post_version_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    page_version_id INT UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_version_id INT,
    publish_date DATETIME,
    author_id INT,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (page_version_id) REFERENCES page_versions(page_version_id) ON DELETE CASCADE,
    FOREIGN KEY (image_version_id) REFERENCES media_files(file_version_id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES admin_users(user_id) ON DELETE SET NULL,
    INDEX idx_page_id (page_id),
    INDEX idx_publish_date (publish_date)
);

-- Table: consultations

CREATE TABLE blog_posts_versions (
    post_version_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES blog_posts(post_id) ON DELETE CASCADE,

    page_version_id INT UNIQUE NOT NULL,
);

-- Stores information about user consultations.
CREATE TABLE consultations (
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
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES admin_users(user_id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read)
);

-- Table: emails
-- Stores email content and sending status.
CREATE TABLE emails (
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
CREATE TABLE custom_code (
    code_version_id INT AUTO_INCREMENT PRIMARY KEY,
    code_id INT,
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


CREATE TABLE custom_code_versions (
    code_version_id INT AUTO_INCREMENT PRIMARY KEY,
    code_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name)
);

-- Table: settings
-- Stores website settings.
-- Supports draft and published versions
CREATE TABLE settings (
    setting_version_id INT AUTO_INCREMENT PRIMARY KEY,
    setting_id INT NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(50),
    description TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name)
);

CREATE TABLE settings_versions (
    setting_version_id INT AUTO_INCREMENT PRIMARY KEY,
    setting_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name)
);

-- Table: advertisements
-- Stores information about website advertisements.
-- Supports draft and published versions.
CREATE TABLE advertisements (
    advertisement_version_id INT AUTO_INCREMENT PRIMARY KEY,
    advertisement_id INT,
    name VARCHAR(255) NOT NULL,
    content TEXT,
    start_date DATETIME,
    end_date DATETIME,
    is_active BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,    
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_is_active (is_active)
);

CREATE TABLE advertisements_versions (
    advertisement_version_id INT AUTO_INCREMENT PRIMARY KEY,
    advertisement_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: headers
-- Stores website headers.
-- Supports draft and published versions.
CREATE TABLE headers (
    header_version_id INT AUTO_INCREMENT PRIMARY KEY,
    header_id INT,
    content TEXT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,    
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE headers_versions (
    header_version_id INT AUTO_INCREMENT PRIMARY KEY,
    header_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,    
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: footers
-- Stores website footers.
-- Supports draft and published versions.
CREATE TABLE footers (
    footer_version_id INT AUTO_INCREMENT PRIMARY KEY,
    footer_id INT,
    content TEXT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,    
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE footers_versions (
    footer_version_id INT AUTO_INCREMENT PRIMARY KEY,
    footer_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,    
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);








