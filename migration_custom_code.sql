
-- Table: custom_code
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
