/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./home.scss')

const angular = require('angular')

angular.module('mf.home', [])
	.config(function ($stateProvider, $urlRouterProvider, NavList, PageIDs) {
		$stateProvider.state('home', {
			url: '/home',
			component: 'home',
			data: { pageTitle: 'Home' }
		})

		$urlRouterProvider.when('/', '/home')

		NavList['home'] = '主页'
		PageIDs.home = 'home'
	})
	.component('home', {
		template: require('./home.html'),
		controller: function (PageIDs) {
			const vm = this

			initMethods()
			initListeners()
			initScope()

			function initListeners() {}

			function initMethods() {}

			function initScope() {
				vm.pageID = PageIDs.home
			}
		}
	})

require('./new-prod')
require('./hot-prod')
require('./services')
require('./brands')


