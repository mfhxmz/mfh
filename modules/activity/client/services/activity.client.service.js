'use strict';

angular.module('activity').factory('ActivityService', ['$resource',
  function ($resource) {
    return $resource('/api/admin/activity/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
