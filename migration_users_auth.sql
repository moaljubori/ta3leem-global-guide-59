
-- User authentication and authorization migrations

-- Additional fields for auth in admin_users table if not already present
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS refresh_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS token_expires DATETIME;

-- Add defaults for existing users if needed
UPDATE admin_users 
SET role = 'admin' 
WHERE role IS NULL AND user_id = 1;

-- Create a sessions table for managing user sessions
CREATE TABLE IF NOT EXISTS user_sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    is_valid BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES admin_users(user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_expires (expires_at)
);

-- Create API keys table for application/service authentication
CREATE TABLE IF NOT EXISTS api_keys (
    key_id VARCHAR(36) PRIMARY KEY,
    api_key VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    user_id INT,
    permissions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES admin_users(user_id) ON DELETE SET NULL,
    INDEX idx_api_key (api_key),
    INDEX idx_is_active (is_active)
);
