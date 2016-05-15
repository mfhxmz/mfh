'use strict';

module.exports = function (app) {
  var other = require('../controllers/other.server.controller.js');

  app.route('/api/admin/other').get(other.findOther);
  app.route('/api/admin/other').put(other.updateOther);
};
