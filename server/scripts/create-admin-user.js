
require('dotenv').config({ path: '../../.env' });
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const readline = require('readline');
const { v4: uuidv4 } = require('uuid');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdminUser() {
  console.log('Create Initial Admin User');
  console.log('------------------------');
  
  let db;
  
  try {
    // Get database configuration from environment variables
    const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'dbuser',
      password: process.env.DB_PASSWORD || 'dbpassword',
      database: process.env.DB_DATABASE || 'mydatabase',
      port: parseInt(process.env.DB_PORT || '3306', 10)
    };
    
    // Connect to database
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to database successfully.');
    
    // Check if admin_users table exists
    const [tables] = await db.query(`
      SELECT TABLE_NAME
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'admin_users'
    `, [dbConfig.database]);
    
    if (tables.length === 0) {
      throw new Error('admin_users table does not exist. Please run migrations first.');
    }
    
    // Check if any admin user already exists
    const [existingAdmins] = await db.query(`
      SELECT COUNT(*) as count
      FROM admin_users
      WHERE role = 'admin'
    `);
    
    if (existingAdmins[0].count > 0) {
      const override = await question('Admin user(s) already exist. Create another one? (y/n): ');
      if (override.toLowerCase() !== 'y') {
        console.log('Operation cancelled.');
        return;
      }
    }
    
    // Get user input
    const username = await question('Enter username: ');
    const email = await question('Enter email: ');
    const firstName = await question('Enter first name: ');
    const lastName = await question('Enter last name: ');
    const password = await question('Enter password (min 8 characters): ');
    
    // Validate inputs
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required.');
    }
    
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }
    
    // Check if username or email already exists
    const [existingUsers] = await db.query(`
      SELECT * FROM admin_users WHERE username = ? OR email = ?
    `, [username, email]);
    
    if (existingUsers.length > 0) {
      throw new Error('Username or email already in use.');
    }
    
    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Create initial refresh token
    const refreshToken = uuidv4();
    const tokenExpires = new Date();
    tokenExpires.setDate(tokenExpires.getDate() + 30); // 30 days from now
    
    // Insert admin user
    await db.query(`
      INSERT INTO admin_users (
        username, email, password_hash, first_name, last_name, 
        role, refresh_token, token_expires
      )
      VALUES (?, ?, ?, ?, ?, 'admin', ?, ?)
    `, [username, email, passwordHash, firstName, lastName, refreshToken, tokenExpires]);
    
    console.log('\nAdmin user created successfully!');
    console.log(`Username: ${username}`);
    console.log(`Role: admin`);
    console.log('\nYou can now log in to the admin panel with these credentials.');
    
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    if (db) await db.end();
    rl.close();
  }
}

createAdminUser();
