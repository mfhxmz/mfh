'use strict';

module.exports = function (app) {
  var activity = require('../controllers/activity.server.controller.js');

  app.route('/api/admin/activity').get(activity.findActivity);
  app.route('/api/admin/activity').post(activity.createActivity);
  app.route('/api/admin/activity').put(activity.updateActivity);
  app.route('/api/admin/activity/:id').delete(activity.deleteActivity);
};
