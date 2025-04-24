
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');

let dbConfig;

try {
  const dbConfigPath = path.join(__dirname, '../database.config.json');
  if (fs.existsSync(dbConfigPath)) {
    const dbConfigRaw = fs.readFileSync(dbConfigPath, 'utf8');
    dbConfig = JSON.parse(dbConfigRaw);
    
    // Override with environment variables if provided
    // This allows configuration via environment variables or .env file
    if (process.env.DB_HOST) dbConfig.host = process.env.DB_HOST;
    if (process.env.DB_USER) dbConfig.username = process.env.DB_USER;
    if (process.env.DB_PASSWORD) dbConfig.password = process.env.DB_PASSWORD;
    if (process.env.DB_DATABASE) dbConfig.database = process.env.DB_DATABASE;
    if (process.env.DB_PORT) dbConfig.port = parseInt(process.env.DB_PORT, 10);
  } else {
    dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'dbuser',
      password: process.env.DB_PASSWORD || 'dbpassword',
      database: process.env.DB_DATABASE || 'mydatabase',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0
    };
  }
  
  console.log('Database configuration loaded:', {
    host: dbConfig.host,
    database: dbConfig.database,
    port: dbConfig.port
  });
} catch (error) {
  console.error('Failed to load database configuration:', error);
  process.exit(1);
}

// Create the database connection pool with detailed configuration
const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.username || dbConfig.user, // Support both formats
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  debug: process.env.NODE_ENV !== 'production',
  // Add cPanel specific settings if needed
  multipleStatements: true,
  dateStrings: true
});

// Extended test database connection
async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    
    // Test query to verify connection
    const [result] = await connection.query('SELECT 1 as connected');
    console.log('Database query successful:', result);
    
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed with error:', error);
    
    // Provide more specific error messages based on common cPanel issues
    if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused. Please check if the database server is running and the host/port is correct.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Access denied. Please verify your database username and password.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('Database does not exist. Please check your database name.');
    }
    
    return false;
  }
}

module.exports = {
  dbConfig,
  pool,
  testDbConnection
};
