'use strict';

angular.module('product').controller('ProductController', ['$scope', '$location', 'Authentication', 'ProductService', 'FileUploader',
  function ($scope, $location, Authentication, ProductService, FileUploader) {
    $scope.user = Authentication.user;

    $scope.newProduct = {};
    $scope.products = [];
    $scope.hotProducts = [];
    $scope.newProducts = [];
    $scope.updatedProduct = undefined;

    $scope.createUploader = new FileUploader({
      url: 'api/admin/product',
      queueLimit: 1,
      removeAfterUpload: true
    });
    $scope.updateUploader = new FileUploader({
      url: 'api/admin/product',
      method: 'PUT',
      queueLimit: 1,
      removeAfterUpload: true
    });
    $scope.createUploader.onBeforeUploadItem = function (item) {
      item.formData.push($scope.newProduct);
    };
    $scope.updateUploader.onBeforeUploadItem = function (item) {
      item.formData.push($scope.updatedProduct);
    };
    $scope.createUploader.onSuccessItem = function () {
      $scope.findProduct();
    };
    $scope.updateUploader.onSuccessItem = function () {
      $scope.updatedProduct = undefined;
      $scope.findProduct();
    };
    $scope.findProduct = function () {
      $scope.products = ProductService.query();
    };
    $scope.findProduct();

    $scope.createNewProduct = function (type) {
      $scope.newProduct.type = type;
      $scope.createUploader.uploadAll();
    };

    $scope.deleteProduct = function (product) {
      ProductService.remove({
        id: product._id
      }, function () {
        $scope.findProduct();
      });
    };

    $scope.updateProduct = function (product) {
      if ($scope.updatedProduct && $scope.updatedProduct._id === product._id) {
        if ($scope.updateUploader.queue && $scope.updateUploader.queue.length) {
          $scope.updateUploader.uploadAll();
        } else {
          ProductService.update($scope.updatedProduct, function () {
            $scope.updatedProduct = undefined;
            $scope.findProduct();
          });
        }
      } else {
        $scope.updatedProduct = angular.copy(product);
      }
    };

  }
]);
