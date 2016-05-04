'use strict';

module.exports = function (app) {
  var common = require('../controllers/common.server.controller');

  app.route('/api/query/product').get(common.queryProduct);
};
