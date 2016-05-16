'use strict';

// Configure the 'chat' module routes
angular.module('activity').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('activity', {
        url: '/activity',
        templateUrl: 'modules/activity/client/views/activity.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
