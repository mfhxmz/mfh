'use strict';

angular.module('product').controller('ProductController', ['$scope', '$location', 'Authentication', 'ProductService', 'FileUploader',
  function ($scope, $location, Authentication, ProductService, FileUploader) {
    $scope.user = Authentication.user;

    $scope.newProduct = {};
    $scope.products = [];
    $scope.updatedProduct = undefined;

    $scope.createUploader = new FileUploader({
      url: 'api/admin/product'
    });
    $scope.updateUploader = new FileUploader({
      url: 'api/admin/product',
      method: 'PUT'
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

    $scope.createNewProduct = function () {
      $scope.createUploader.uploadAll();
    };

    $scope.deleteProduct = function (product) {
      ProductService.remove({
        id: product.id
      }, function () {
        $scope.findProduct();
      });
    };

    $scope.updateProduct = function (product) {
      if ($scope.updatedProduct && $scope.updatedProduct.id === product.id) {
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
