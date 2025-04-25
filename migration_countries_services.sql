
-- Table: countries
CREATE TABLE IF NOT EXISTS countries (
    country_id VARCHAR(36) PRIMARY KEY,
    country_version_id INT AUTO_INCREMENT UNIQUE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(3) NOT NULL,
    flag_image_version_id INT,
    content TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    url_slug VARCHAR(255) UNIQUE,
    order_index INT,
    is_active BOOLEAN DEFAULT TRUE,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (flag_image_version_id) REFERENCES media_files(file_version_id) ON DELETE SET NULL,
    INDEX idx_is_active (is_active),
    INDEX idx_url_slug (url_slug)
);

-- Table: services
CREATE TABLE IF NOT EXISTS services (
    service_id VARCHAR(36) PRIMARY KEY,
    service_version_id INT AUTO_INCREMENT UNIQUE,
    name VARCHAR(255) NOT NULL,
    short_description TEXT,
    content TEXT,
    icon_version_id INT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    url_slug VARCHAR(255) UNIQUE,
    order_index INT,
    is_active BOOLEAN DEFAULT TRUE,
    is_published BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (icon_version_id) REFERENCES media_files(file_version_id) ON DELETE SET NULL,
    INDEX idx_is_active (is_active),
    INDEX idx_url_slug (url_slug)
);

-- Table: country_services (many-to-many relationship)
CREATE TABLE IF NOT EXISTS country_services (
    country_id VARCHAR(36) NOT NULL,
    service_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (country_id, service_id),
    FOREIGN KEY (country_id) REFERENCES countries(country_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE,
    INDEX idx_country_id (country_id),
    INDEX idx_service_id (service_id)
);

-- Add pages for static content if not already covered
INSERT IGNORE INTO pages (url, title, meta_description, is_published) 
VALUES 
    ('/privacy-policy', 'Privacy Policy', 'Our privacy policy', TRUE),
    ('/terms-of-use', 'Terms of Use', 'Our terms of use', TRUE);
