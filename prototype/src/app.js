/**
 * Created by scott on 2015/12/7.
 */
'use strict';

require('./lib/loadScreen.css')
require('./app.scss')

import "./common";
import "./components";
import "angular-animate";
import "angular-messages";
import "angular-touch";
import "angular-cookies";
import "angular-ui-router";
import "angular-ui-router/release/stateEvents";
import "angular-ui-bootstrap";
import "angular-ladda";
//import "angular-viewport-watch";
//import "angular-lazy-image";
import "imports?this=>window!jquery.scrollbar";
import "./modules/home";
import "./modules/appInfo";
import "./modules/coinInfo";
import "./modules/newProd";
import "./modules/hotProd";
import "./modules/download";
import "./modules/consult";
import "./modules/aim";
import "./modules/user";
import bootstrap from "./bootstrap";
//import "angular-sanitize";

const angular = require('angular')
let app = angular.module('app', [
	'ngCookies',
	'ngAnimate',
	//'ngSanitize',
	'ngMessages',
	'ngTouch',

	'ui.router',
	'ui.router.state.events',
	'ui.bootstrap',
	'angular-ladda',
	//'angularViewportWatch',
	//'afkl.lazyImage',
	'jQueryScrollbar',

	'app.common',
	'app.components',

	'mf.home',
	'mf.appInfo',
	'mf.coinInfo',
	'mf.newProd',
	'mf.hotProd',
	'mf.download',
	'mf.consult',
	'mf.aim',
	'mf.user'
])

	.run(function ($rootScope, $log, $state, AppName) {
		$rootScope.$on('$stateChangeSuccess', function (event, toState, toStateParams, fromState, fromStateParams) {
			$rootScope.pageTitle = $state.current.data.pageTitle + ' - ' + AppName

			$rootScope.prevState = fromState.name
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
	.run(function($cookies, CookieNames) {
	    if(!$cookies.get(CookieNames.DevID)){
		    $cookies.put(CookieNames.DevID, Date.now * (Math.random()%1))
	    }
	})
	.controller('RootController', function () {
		this.jqueryScrollbarOption = {
			ignoreMobile: true,
			ignoreOverlay: true
		}
	})

	.component('app', {
		template: require('./app.html'),
		controller: function AppController($scope, AuthService) {
			this.$onInit = function() {
			    if(AuthService.hasSessionBefore()){
				    AuthService.tryGetUserInfo()
			    }
			}
		}
	})


bootstrap(app)

export default app
