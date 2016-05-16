'use strict';

// Configure the 'chat' module routes
angular.module('product').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/product',
        templateUrl: 'modules/product/client/views/product.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
