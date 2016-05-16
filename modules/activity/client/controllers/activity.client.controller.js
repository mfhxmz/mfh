'use strict';

angular.module('activity').controller('ActivityController', ['$scope', '$location', 'Authentication', 'ActivityService', 'FileUploader',
  function ($scope, $location, Authentication, ActivityService, FileUploader) {
    $scope.user = Authentication.user;

    $scope.newActivity = {};
    $scope.activitys = [];
    $scope.updatedActivity = undefined;

    $scope.createUploader = new FileUploader({
      url: 'api/admin/activity'
    });
    $scope.updateUploader = new FileUploader({
      url: 'api/admin/activity',
      method: 'PUT'
    });
    $scope.createUploader.onBeforeUploadItem = function (item) {
      item.formData.push($scope.newActivity);
    };
    $scope.updateUploader.onBeforeUploadItem = function (item) {
      item.formData.push($scope.updatedActivity);
    };
    $scope.createUploader.onSuccessItem = function () {
      $scope.findActivity();
    };
    $scope.updateUploader.onSuccessItem = function () {
      $scope.updatedActivity = undefined;
      $scope.findActivity();
    };
    $scope.findActivity = function () {
      $scope.activitys = ActivityService.query();
    };
    $scope.findActivity();

    $scope.createNewActivity = function () {
      $scope.createUploader.uploadAll();
    };

    $scope.deleteActivity = function (activity) {
      ActivityService.remove({
        id: activity.id
      }, function () {
        $scope.findActivity();
      });
    };

    $scope.updateActivity = function (activity) {
      if ($scope.updatedActivity && $scope.updatedActivity.id === activity.id) {
        if ($scope.updateUploader.queue && $scope.updateUploader.queue.length) {
          $scope.updateUploader.uploadAll();
        } else {
          ActivityService.update($scope.updatedActivity, function () {
            $scope.updatedActivity = undefined;
            $scope.findActivity();
          });
        }
      } else {
        $scope.updatedActivity = angular.copy(activity);
      }
    };

  }
]);
