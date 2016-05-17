'use strict';

module.exports = function (app) {
  var brand = require('../controllers/brand.server.controller.js');

  app.route('/api/admin/brand').get(brand.findBrand);
  app.route('/api/admin/brand').post(brand.createBrand);
  app.route('/api/admin/brand').put(brand.updateBrand);
  app.route('/api/admin/brand/:id').delete(brand.deleteBrand);
};
