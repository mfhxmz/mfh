'use strict';

angular.module('banner').controller('ProductController', ['$scope', '$location', 'Authentication', 'ProductService', 'FileUploader',
  function ($scope, $location, Authentication, ProductService, FileUploader) {
    $scope.user = Authentication.user;

  }
]);
