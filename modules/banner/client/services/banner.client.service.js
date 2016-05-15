'use strict';

angular.module('banner').factory('BannerService', ['$resource',
  function ($resource) {
    return $resource('/api/admin/banner/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
