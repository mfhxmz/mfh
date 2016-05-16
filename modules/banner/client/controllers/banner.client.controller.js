'use strict';

angular.module('banner').controller('BannerController', ['$scope', '$location', 'Authentication', 'BannerService', 'FileUploader',
  function ($scope, $location, Authentication, BannerService, FileUploader) {
    $scope.user = Authentication.user;
    $scope.newBanner = {};
    $scope.banners = [];
    $scope.updatedBanner = undefined;

    $scope.createUploader = new FileUploader({
      url: 'api/admin/banner',
      queueLimit: 1,
      removeAfterUpload: true
    });
    $scope.updateUploader = new FileUploader({
      url: 'api/admin/banner',
      method: 'PUT',
      queueLimit: 1,
      removeAfterUpload: true
    });
    $scope.createUploader.onBeforeUploadItem = function (item) {
      item.formData.push({
        link: $scope.newBanner.link ? $scope.newBanner.link : '',
        scope: $scope.newBanner.scope
      });
    };
    $scope.updateUploader.onBeforeUploadItem = function (item) {
      item.formData.push($scope.updatedBanner);
    };
    $scope.createUploader.onSuccessItem = function () {
      $scope.findBanner();
    };
    $scope.updateUploader.onSuccessItem = function () {
      $scope.updatedBanner = undefined;
      $scope.findBanner();
    };
    $scope.findBanner = function () {
      $scope.banners = BannerService.get();
    };
    $scope.findBanner();

    $scope.createNewBanner = function (scope) {
      $scope.newBanner.scope = scope;
      $scope.createUploader.uploadAll();
    };

    $scope.deleteBanner = function (banner) {
      BannerService.remove({
        id: banner._id
      }, function () {
        $scope.findBanner();
      });
    };

    $scope.updateBanner = function (banner) {
      if ($scope.updatedBanner && $scope.updatedBanner._id === banner._id) {
        if ($scope.updateUploader.queue && $scope.updateUploader.queue.length) {
          $scope.updateUploader.uploadAll();
        } else {
          BannerService.update($scope.updatedBanner, function () {
            $scope.updatedBanner = undefined;
            $scope.findBanner();
          });
        }
      } else {
        $scope.updatedBanner = angular.copy(banner);
      }
    };
  }
]);
