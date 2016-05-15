'use strict';

// Configure the 'chat' module routes
angular.module('banner').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('banner', {
        abstract: true,
        url: '/banner',
        templateUrl: 'modules/banner/client/views/banner.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('banner.home', {
        url: '/home',
        templateUrl: 'modules/banner/client/views/banner-home.client.view.html'
      })
      .state('banner.hot', {
        url: '/home',
        templateUrl: 'modules/banner/client/views/banner-hot.client.view.html'
      })
      .state('banner.new', {
        url: '/home',
        templateUrl: 'modules/banner/client/views/banner-new.client.view.html'
      })
      .state('banner.activity', {
        url: '/home',
        templateUrl: 'modules/banner/client/views/banner-activity.client.view.html'
      });
  }
]);
