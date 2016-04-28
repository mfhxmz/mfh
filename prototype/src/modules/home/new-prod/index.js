/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./new-prod.scss')

const captionUrl = require('../caption.tpl.html')

const angular = require('angular')

angular.module('mf.home')
	.component('newProd', {
		template: require('./new-prod.html'),
		controller: function (ProductService) {
			const vm = this

			initMethods()
			initListeners()
			initScope()

			function initListeners() {}

			function initMethods() {}

			function initScope() {
				vm.list = [].constructor(4)
				vm.captionTpl = captionUrl
				vm.vote = function (id) {
					ProductService.vote(id)
				}
			}

			function init() {
				ProductService.newProdList(4)
					.then(function (list) {
						vm.brandList = list
					})
			}
		}
	})

