
-- Table: api_endpoints
CREATE TABLE IF NOT EXISTS api_endpoints (
    endpoint_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) UNIQUE NOT NULL,
    method VARCHAR(10) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_url (url),
    INDEX idx_method (method)
);

-- Table: api_requests
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
