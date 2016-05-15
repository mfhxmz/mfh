'use strict';

// Configure the 'chat' module routes
angular.module('product').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('product', {
        abstract: true,
        url: '/product',
        templateUrl: 'modules/product/client/views/product.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('product.hot', {
        url: '/hot',
        templateUrl: 'modules/product/client/views/product-hot.client.view.html'
      })
      .state('product.new', {
        url: '/new',
        templateUrl: 'modules/product/client/views/product-new.client.view.html'
      });
  }
]);
