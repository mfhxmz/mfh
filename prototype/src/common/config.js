/**
 * Created by scott on 2015/12/7.
 */
'use strict';

const angular = require('angular')

angular.module('app.config', [])
    /* -----------------------------------------------------------
     * set up HttpInterceptor
     * ----------------------------------------------------------- */
    .config(function ($httpProvider, DEBUG_MODE) {
        // push an interceptor into the queue
        $httpProvider.interceptors.push('HttpInterceptor')
        $httpProvider.defaults.withCredentials = DEBUG_MODE
    })


    /* -----------------------------------------------------------
     * setup ngCookie
     * ----------------------------------------------------------- */
    .config(function ($cookiesProvider) {
        angular.extend($cookiesProvider.defaults, {
            expires: new Date(Date.now() + 1000 * 3600 * 24 * 180)
        })
    })


    /* -----------------------------------------------------------
     * debug log config
     * ----------------------------------------------------------- */
    .config(function ($logProvider, DEBUG_MODE) {
        $logProvider.debugEnabled(DEBUG_MODE)
    })


    /* -----------------------------------------------------------
     * debug css class config
     * ----------------------------------------------------------- */
    .config(function ($compileProvider, DEBUG_MODE) {
        $compileProvider.debugInfoEnabled(DEBUG_MODE)
    })

    /* -----------------------------------------------------------
     * 设置非法路径跳转
     * ----------------------------------------------------------- */
    .config(function ($stateProvider, $urlRouterProvider) {
        // todo specify a 404 page
        $urlRouterProvider.otherwise('/')
    })
