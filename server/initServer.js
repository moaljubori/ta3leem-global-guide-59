
const { pool, testDbConnection, dbConfig } = require('./database');
const app = require('./app');

const PORT = process.env.PORT || 3001;

// Start server
async function startServer() {
  let dbConnected = false;
  try {
    dbConnected = await testDbConnection();
  } catch (err) {
    console.error('Database connection test failed:', err);
  }

  if (!dbConnected && (process.env.ALLOW_DB_FAIL === 'true' || process.env.NODE_ENV !== 'production')) {
    console.warn('⚠️ WARNING: Database connection failed, but continuing server startup');
    console.warn('Please check your database configuration and ensure your database is running');
  } else if (!dbConnected) {
    console.error('❌ ERROR: Database connection failed and ALLOW_DB_FAIL is not set to true');
    console.error('Set ALLOW_DB_FAIL=true in your environment variables to start the server anyway');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API accessible at http://localhost:${PORT}/api`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Database connection: ${dbConnected ? 'Successful' : 'Failed'}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
