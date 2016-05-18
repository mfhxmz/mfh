'use strict';

angular.module('brand').controller('BrandController', ['$scope', '$location', 'Authentication', 'BrandService', 'FileUploader',
  function ($scope, $location, Authentication, BrandService, FileUploader) {
    $scope.user = Authentication.user;

    $scope.newBrand = {};
    $scope.brands = [];
    $scope.updatedBrand = undefined;

    $scope.createUploader = new FileUploader({
      url: 'api/admin/brand',
      queueLimit: 1,
      removeAfterUpload: true
    });
    $scope.updateUploader = new FileUploader({
      url: 'api/admin/brand',
      method: 'PUT',
      queueLimit: 1,
      removeAfterUpload: true
    });
    $scope.createUploader.onBeforeUploadItem = function (item) {
      item.formData.push($scope.newBrand);
    };
    $scope.updateUploader.onBeforeUploadItem = function (item) {
      item.formData.push($scope.updatedBrand);
    };
    $scope.createUploader.onSuccessItem = function () {
      $scope.findBrand();
    };
    $scope.updateUploader.onSuccessItem = function () {
      $scope.updatedBrand = undefined;
      $scope.findBrand();
    };
    $scope.findBrand = function () {
      BrandService.query().$promise.then(function (data) {
        $scope.$broadcast('setGridData', data);
      });
    };
    $scope.findBrand();

    $scope.createNewBrand = function () {
      $scope.createUploader.uploadAll();
    };

    $scope.deleteBrand = function (brand) {
      BrandService.remove({
        id: brand._id
      }, function () {
        $scope.findBrand();
      });
    };

    $scope.updateBrand = function (brand) {
      if ($scope.updatedBrand && $scope.updatedBrand._id === brand._id) {
        if ($scope.updateUploader.queue && $scope.updateUploader.queue.length) {
          $scope.updateUploader.uploadAll();
        } else {
          BrandService.update($scope.updatedBrand, function () {
            $scope.updatedBrand = undefined;
            $scope.findBrand();
          });
        }
      } else {
        $scope.updatedBrand = angular.copy(brand);
      }
    };

  }
]);
