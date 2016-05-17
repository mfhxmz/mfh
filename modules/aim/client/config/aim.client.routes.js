'use strict';

// Configure the 'chat' module routes
angular.module('aim').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('aim', {
        url: '/server-admin/aim',
        templateUrl: 'modules/aim/client/views/aim.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
