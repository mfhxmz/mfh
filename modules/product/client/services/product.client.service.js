'use strict';

angular.module('product').factory('ProductService', ['$resource',
  function ($resource) {
    return $resource('/api/admin/product/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
