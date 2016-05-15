'use strict';

module.exports = function (app) {
  var common = require('../controllers/common.server.controller');

  app.route('/api/product/hot/').get(common.queryHotProduct);
  app.route('/api/product/new/').get(common.queryNewProduct);
  app.route('/api/product/like/').put(common.likeProduct);

  app.route('/api/activity').get(common.queryActivity);
  app.route('/api/brand').get(common.queryBrand);

  app.route('/api/banner').get(common.queryBanner);

  app.route('/api/user/register').post(common.userRegister);
  app.route('/api/user/login').post(common.userLogin);
  app.route('/api/user/logout').post(common.userLogout);
};
