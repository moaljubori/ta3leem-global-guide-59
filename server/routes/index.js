
const authRoutes = require('./auth');
const pagesRoutes = require('./pages');
const mediaRoutes = require('./media');
const usersRoutes = require('./users');
const advertisementsRoutes = require('./advertisements');
const consultationsRoutes = require('./consultations');
const settingsRoutes = require('./settings');
const blogRoutes = require('./blog');
const customCodeRoutes = require('./custom-code');

function registerRoutes(app) {
  app.use('/api/auth', authRoutes);
  app.use('/api/pages', pagesRoutes);
  app.use('/api/media', mediaRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/advertisements', advertisementsRoutes);
  app.use('/api/consultations', consultationsRoutes);
  app.use('/api/settings', settingsRoutes);
  app.use('/api/blog', blogRoutes);
  app.use('/api/custom-code', customCodeRoutes);
}

module.exports = registerRoutes;
