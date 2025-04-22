
-- Table: blog_posts
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
