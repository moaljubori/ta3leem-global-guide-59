
-- Table: advertisements
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
