/**
 * Created by scott on 2016/4/20.
 */
'use strict'

require('./appInfo.scss')

const angular = require('angular')

angular.module('mf.appInfo', [])
    .config(function ($stateProvider, NavList) {
        $stateProvider.state('appInfo', {
            url: '/appInfo',
            component: 'appInfo',
            data: { pageTitle: 'appInfo' },
            onEnter: function ($location, $anchorScroll, scrollTo) {
                if (scrollTo.to) {
                    $location.hash(scrollTo.to)
                    $anchorScroll()
                    scrollTo.to = null
                }
            }
        })

        NavList['appInfo'] = 'App介绍'
    })
    .component('appInfo', {
        template: require('./appInfo.html'),
        controller: function ($scope, $location, $anchorScroll, scrollTo) {
            $scope.$on('scrollTo', function (event,data) {
                $location.hash(data)
                $anchorScroll()
                scrollTo.to = null
            })
        }
    })
