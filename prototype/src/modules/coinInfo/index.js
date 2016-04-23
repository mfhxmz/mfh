/**
 * Created by scott on 2016/4/20.
 */
'use strict'

require('./coinInfo.scss')

const angular = require('angular')

angular.module('mf.coinInfo', [])
    .config(function($stateProvider, NavList) {
        $stateProvider.state('coinInfo', {
            url: '/coinInfo',
            component: 'coinInfo',
            data: { pageTitle: 'coinInfo' }
        })
        
        NavList['coinInfo'] = '魔币介绍'
    })
    .component('coinInfo', {
        template: require('./coinInfo.html'),
        controller: function () {

        }
    })
