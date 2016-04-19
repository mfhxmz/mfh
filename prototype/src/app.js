/**
 * Created by scott on 2015/12/7.
 */
'use strict';

require('./lib/loadScreen.css')
require('./app.scss')

import "./common/index";
import "./modules/home";
import "./components";
import bootstrap from "./bootstrap";

import "angular-ui-router";
import "angular-ui-bootstrap";
import "angular-animate";
import "angular-sanitize";
import "angular-messages";
import "angular-cookies";

const angular = require('angular')
let app = angular.module('app', [
        'ngCookies',
        'ngAnimate',
        'ngSanitize',
        'ngMessages',
        'ui.router',

        'app.common',
        'app.components',

        'app.home'
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

    .component('app', {
        template: require('./app.html'),
        controller: function AppController($scope) {
            this.hero = {
                name: 'Spawn'
            }
        }
    })


bootstrap(app)

export default app
