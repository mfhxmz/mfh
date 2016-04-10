/**
 * Created by scott on 2015/12/7.
 */
'use strict';

require('./lib/loadScreen.css')
require('./app.scss')

import './common/common'

import './modules/home'

import bootstrap from './bootstrap'

require('angular-ui-router')
require('angular-ui-bootstrap')
require('angular-animate')
require('angular-sanitize')
require('angular-messages')
require('angular-cookies')

let angular = require('angular')
let app = angular.module('app', [
        'ngCookies',
        'ngAnimate',
        'ngSanitize',
        'ngMessages',
        'ui.router',

        'app.common',

        'app.home',
        'app.about',
        'app.connect',
        'app.projects'
    ])

    .run(function ($rootScope, $log, $state, AppName) {
        $rootScope.$on('$stateChangeSuccess', function () {
            $rootScope.pageTitle = $state.current.data.pageTitle + ' - ' + AppName
        })

        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState, fromStateParams) {
            $log.debug({
                'toState': JSON.stringify(toState),
                'fromState': JSON.stringify(fromState)
            })
        })

        $rootScope.$on('DataLoading', function () {
            $rootScope.loading = true
        })

        $rootScope.$on('DataLoaded', function () {
            $rootScope.loading = false
        })
    })

    /* -----------------------------------------------------------
     * fix the ie 10-11 scroll bar overlaying
     * ----------------------------------------------------------- */
    .run(function () {

        if (/(IEMobile\/10\.0)|(rv:11)|(MSIE\s*10)/.test(navigator.userAgent)) {
            var msViewPortStyle = document.createElement('style')
            msViewPortStyle.appendChild(
                document.createTextNode(
                    '@-ms-viewport{width:auto!important}'
                )
            )
            document.querySelector('head').appendChild(msViewPortStyle)
        }
    })

bootstrap(app)

export default app
