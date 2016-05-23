/**
 * Created by scott on 2016/4/20.
 */
'use strict'

require('./appInfo.scss')

const angular = require('angular')

angular.module('mf.appInfo', [])
	.config(function ($stateProvider, NavList, PageIDs) {
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
		PageIDs.appInfo = 'appInfo'
	})
	.component('appInfo', {
		template: require('./appInfo.html'),
		controller: function ($scope, $location, $anchorScroll, scrollTo, ProductService) {
			var vm = this

			$scope.$on('scrollTo', function (event, data) {
				$location.hash(data)
				$anchorScroll()
				scrollTo.to = null
			})

			this.isShowQrCode = false

			this.showQrcode = function () {
				if (!this.isShowQrCode) {
					$scope.$broadcast('showQrcode')
				}
				this.isShowQrCode = true
			}


			$scope.$on('outsideClick', function () {
				$scope.$apply(function () {
					vm.isShowQrCode = false
				})
			})

			ProductService.downloadLink()
				.then(function(data) {
					vm.dlLinks = data
				})

			ProductService.downloadQrcode()
				.then(function(data) {
					vm.qrcodeUrl = data.imgUrl
				})
		}
	})
	.directive('hideOnOutsideClick', function factory($timeout, $document) {
		return {
			restrict: 'A',
			scope: true,
			link: function postLink(scope, el, attrs, ctrl) {
				scope.$on(attrs.hideOnOutsideClick, function () {
					$timeout(function () {
						const reg = angular.element($document[0].body).bind('click', handler)

						function handler(event) {
							if (event.originalTarget !== el[0]) {
								scope.$emit('outsideClick')
								reg.unbind('click', handler)
							}
						}
					})

				})
			}
		}
	})

