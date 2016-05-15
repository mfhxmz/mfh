/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./brands.scss')

const angular = require('angular')

angular.module('mf.home')
	.component('brands', {
		template: require('./brands.html'),
		controller: function (ProductService) {
			const vm = this

			initMethods()
			initListeners()
			initScope()

			function initListeners() {}

			function initMethods() {}

			function initScope() {
				vm.brandList = [].constructor(20)
				init()
			}

			function init() {
				ProductService.brandList()
					.then(function (list) {
						vm.brandList = list
					})
			}
		}
	})
