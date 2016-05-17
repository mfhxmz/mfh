'use strict';

angular.module('brand').factory('BrandService', ['$resource',
  function ($resource) {
    return $resource('/api/admin/brand/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
