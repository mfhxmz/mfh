'use strict';

// Configure the 'chat' module routes
angular.module('banner').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('other', {
        url: '/other',
        templateUrl: 'modules/other/client/views/other.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
