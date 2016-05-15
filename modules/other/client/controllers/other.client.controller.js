'use strict';

angular.module('other').controller('OtherController', ['$scope', '$location', 'Authentication', 'OtherService', 'FileUploader',
  function ($scope, $location, Authentication, OtherService, FileUploader) {
    $scope.user = Authentication.user;
    $scope.other = OtherService.get();

    $scope.uploader = new FileUploader({
      url: 'api/admin/other',
      method: 'PUT'
    });
    $scope.uploader.onBeforeUploadItem = function (item) {
      item.formData.push({
        _id: $scope.other._id,
        appDownloadAndroid: $scope.other.appDownloadAndroid,
        appDownloadIos: $scope.other.appDownloadIos
      });
    };
    $scope.uploader.onSuccessItem = function () {
      $scope.other = OtherService.get();
      alert('保存成功');
    };
    $scope.uploader.onErrorItem = function () {
      $scope.other = OtherService.get();
      alert('保存失败，请重试');
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'otherForm');
        return false;
      }
      if ($scope.uploader.queue && $scope.uploader.queue.length) {
        $scope.uploader.uploadAll();
      } else {
        OtherService.update($scope.other, function () {
          alert('保存成功');
        }, function () {
          alert('保存失败，请重试');
        });
      }
    };

    angular.element(document.querySelector('#footerQrCode')).on('change', function () {
      if (typeof FileReader === 'undefined') {
        return false;
      }

      var file = this.files[0];
      if (!/image\/\w+/.test(file.type)) {
        alert("请确保文件为图像类型");
        return false;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        $scope.other.footerQrCodeImgUrl = this.result;
        $scope.$apply();
      };

    });
  }
]);
