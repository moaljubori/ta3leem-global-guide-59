
-- Table: pages
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
CREATE TABLE IF NOT EXISTS page_versions (
    page_version_id INT AUTO_INCREMENT PRIMARY KEY,
    page_id INT NOT NULL,
    version INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (page_id) REFERENCES pages(page_id) ON DELETE CASCADE,
    INDEX idx_version(version)
);

-- Table: sections
CREATE TABLE IF NOT EXISTS sections (
    section_id VARCHAR(36),
    section_version_id INT AUTO_INCREMENT PRIMARY KEY,
    page_version_id INT NOT NULL,
    type VARCHAR(255) NOT NULL,
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
CREATE TABLE IF NOT EXISTS section_media (
    section_version_id INT NOT NULL,
    file_version_id INT NOT NULL,
    PRIMARY KEY (section_version_id, file_version_id),
    FOREIGN KEY (section_version_id) REFERENCES sections(section_version_id) ON DELETE CASCADE,
    FOREIGN KEY (file_version_id) REFERENCES media_files(file_version_id) ON DELETE CASCADE,
    INDEX idx_section_version_id (section_version_id),
    INDEX idx_file_version_id (file_version_id)
);
