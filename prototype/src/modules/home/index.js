/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./home.scss')

const angular = require('angular')

angular.module('mf.home', [])
    .config(function ($stateProvider, $urlRouterProvider, NavList) {
        $stateProvider.state('home', {
            url: '/home',
            component: 'home',
            data: { pageTitle: 'Home' }
        })

        $urlRouterProvider.when('/', '/home')

        NavList['home'] = '主页'
    })
    .component('home', {
        template: require('./home.html'),
        controller: function () {

        }
    })

require('./banner')
require('./new-prod')
require('./hot-prod')
require('./services')
require('./brands')


