'use strict';

module.exports = function (app) {
  var banner = require('../controllers/banner.server.controller.js');

  app.route('/api/admin/banner').get(banner.findBannerByScope);
  app.route('/api/admin/banner').post(banner.createBanner);
  app.route('/api/admin/banner').put(banner.updateBanner);
  app.route('/api/admin/banner/:id').delete(banner.deleteBanner);
};
