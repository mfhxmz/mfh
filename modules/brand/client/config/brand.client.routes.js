'use strict';

// Configure the 'chat' module routes
angular.module('brand').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('brand', {
        url: '/server-admin/brand',
        templateUrl: 'modules/brand/client/views/brand.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
