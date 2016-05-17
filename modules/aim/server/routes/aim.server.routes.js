'use strict';

module.exports = function (app) {
  var aim = require('../controllers/aim.server.controller.js');

  app.route('/api/admin/aim').get(aim.findAim);
  app.route('/api/admin/aim').post(aim.createAim);
  app.route('/api/admin/aim').put(aim.updateAim);
  app.route('/api/admin/aim/:id').delete(aim.deleteAim);
};
