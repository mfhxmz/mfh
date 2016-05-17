'use strict';

angular.module('aim').controller('AimController', ['$scope', '$location', 'Authentication', 'AimService', 'FileUploader',
  function ($scope, $location, Authentication, AimService, FileUploader) {
    $scope.user = Authentication.user;

    $scope.newAim = {};
    $scope.aims = [];
    $scope.updatedAim = undefined;

    $scope.createUploader = new FileUploader({
      url: 'api/admin/aim',
      queueLimit: 1,
      removeAfterUpload: true
    });
    $scope.updateUploader = new FileUploader({
      url: 'api/admin/aim',
      method: 'PUT',
      queueLimit: 1,
      removeAfterUpload: true
    });
    $scope.createUploader.onBeforeUploadItem = function (item) {
      item.formData.push($scope.newAim);
    };
    $scope.updateUploader.onBeforeUploadItem = function (item) {
      item.formData.push($scope.updatedAim);
    };
    $scope.createUploader.onSuccessItem = function () {
      $scope.findAim();
    };
    $scope.updateUploader.onSuccessItem = function () {
      $scope.updatedAim = undefined;
      $scope.findAim();
    };
    $scope.findAim = function () {
      $scope.aims = AimService.query();
    };
    $scope.findAim();

    $scope.createNewAim = function () {
      $scope.createUploader.uploadAll();
    };

    $scope.deleteAim = function (aim) {
      AimService.remove({
        id: aim._id
      }, function () {
        $scope.findAim();
      });
    };

    $scope.updateAim = function (aim) {
      if ($scope.updatedAim && $scope.updatedAim._id === aim._id) {
        if ($scope.updateUploader.queue && $scope.updateUploader.queue.length) {
          $scope.updateUploader.uploadAll();
        } else {
          AimService.update($scope.updatedAim, function () {
            $scope.updatedAim = undefined;
            $scope.findAim();
          });
        }
      } else {
        $scope.updatedAim = angular.copy(aim);
      }
    };

  }
]);
