
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const blogRoutes = require('./blog');
const mediaRoutes = require('./media');
const pagesRoutes = require('./pages');
const countriesRoutes = require('./countries');
const servicesRoutes = require('./services');
const settingsRoutes = require('./settings');
const consultationsRoutes = require('./consultations');

/**
 * Register all API routes
 * @param {Express} app - Express application
 */
function registerRoutes(app) {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/blog', blogRoutes);
  app.use('/api/media', mediaRoutes);
  app.use('/api/pages', pagesRoutes);
  app.use('/api/countries', countriesRoutes);
  app.use('/api/services', servicesRoutes);
  app.use('/api/settings', settingsRoutes);
  app.use('/api/consultations', consultationsRoutes);
}

module.exports = registerRoutes;
