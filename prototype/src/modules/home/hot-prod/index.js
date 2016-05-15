/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./hot-prod.scss')

const captionUrl = require('../caption.tpl.html')

const angular = require('angular')

angular.module('mf.home')
	.component('hotProd', {
		template: require('./hot-prod.html'),
		controller: function (ProductService) {
			const vm = this

			initMethods()
			initListeners()
			initScope()

			function initListeners() {}

			function initMethods() {}

			function initScope() {
				vm.captionTpl = captionUrl
				vm.list = [].constructor(8)
				vm.vote = function (id) {
					ProductService.vote(id)
				}
				init()
			}

			function init() {
				ProductService.hotProdList({
					limitTo: 8,
					startFrom: 0
				})
					.then(function (list) {
						vm.list = list
					})
			}


		}
	})

