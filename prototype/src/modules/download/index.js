/**
 * Created by scott on 2016/4/20.
 */
'use strict'

const angular = require('angular')

angular.module('mf.download', [])
	.config(function ($stateProvider, NavList) {
		$stateProvider.state('download', {
			url: '/appInfo',
			component: 'appInfo',
			data: { pageTitle: 'download' },
			onEnter: function ($rootScope, $location, $anchorScroll, scrollTo) {

				scrollTo.to = 'app-dl'

				$rootScope.$broadcast('scrollTo', scrollTo.to)

			}
		})

		//NavList['download({"#":"app-dl"})'] = 'App下载'
		NavList['download'] = 'App下载'
	})
	.value('scrollTo', {
		to: null
	})
