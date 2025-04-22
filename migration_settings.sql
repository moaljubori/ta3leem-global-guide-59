
-- Table: settings
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
