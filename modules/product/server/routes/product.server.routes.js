'use strict';

module.exports = function (app) {
  var product = require('../controllers/product.server.controller.js');

  app.route('/api/admin/product').get(product.findProductByType);
  app.route('/api/admin/product').post(product.createProduct);
  app.route('/api/admin/product').put(product.updateProduct);
  app.route('/api/admin/product/:id').delete(product.deleteProduct);
};
