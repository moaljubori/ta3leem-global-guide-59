
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');

let dbConfig;

try {
  const dbConfigPath = path.join(__dirname, '../database.config.json');
  if (fs.existsSync(dbConfigPath)) {
    const dbConfigRaw = fs.readFileSync(dbConfigPath, 'utf8');
    dbConfig = JSON.parse(dbConfigRaw);
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

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.username || 'dbuser',
  password: dbConfig.password || '',
  database: dbConfig.database,
  port: dbConfig.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

module.exports = {
  dbConfig,
  pool,
  testDbConnection
};
