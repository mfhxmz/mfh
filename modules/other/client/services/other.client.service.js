'use strict';

angular.module('other').factory('OtherService', ['$resource',
  function ($resource) {
    return $resource('/api/admin/other', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
