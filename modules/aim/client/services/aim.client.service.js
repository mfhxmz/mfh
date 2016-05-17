'use strict';

angular.module('aim').factory('AimService', ['$resource',
  function ($resource) {
    return $resource('/api/admin/aim/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
