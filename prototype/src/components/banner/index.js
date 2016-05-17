/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./banner.scss')

const angular = require('angular')

angular.module('app.components')

	.component('banner', {
		template: require('./banner.html'),
		bindings: {
			page: '<'
		},
		controller: function (ProductService) {
			const vm = this

			initMethods()
			initListeners()
			initScope()

			function initListeners() {}

			function initMethods() {

			}

			function initScope() {
				ProductService.fakeSlides(vm)
				init()
			}

			function init() {
				ProductService.bannerList()
					.then(function (list) {
						vm.slides = list[vm.page]
					})
			}
		}
	})
	.directive('mfhBgImage', function ($parse) {
		return function (scope, element, attrs) {
			element.css({
				'background-image': 'url(' + $parse(attrs.mfhBgImage)(scope) + ')'
			})
		}
	})
