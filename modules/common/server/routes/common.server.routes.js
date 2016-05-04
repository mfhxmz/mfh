'use strict';

module.exports = function (app) {
  var common = require('../controllers/common.server.controller');

  app.route('/api/query/product').get(common.queryProduct);
  app.route('/api/query/activity').get(common.queryActivity);

  app.route('/api/user/register').post(common.userRegister);
  app.route('/api/user/login').post(common.userLogin);
  app.route('/api/user/logout').post(common.userLogout);
};
