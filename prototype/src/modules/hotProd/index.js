/**
 * Created by scott on 2016/4/20.
 */
'use strict'

require('./hot-prod.scss')

const url = require('./caption3.tpl.html')


const angular = require('angular')

angular.module('mf.hotProd', [])
	.config(function ($stateProvider, NavList, PageIDs) {
		$stateProvider.state('hotProd', {
			url: '/hotProd',
			component: 'mfHotProd',
			data: { pageTitle: 'hotProd' }
		})

		NavList['hotProd'] = '爆品推荐'
		PageIDs.hotProd = 'hotProd'
	})
	.component('mfHotProd', {
		template: require('./hot-prod.html'),
		controller: function (ProductService, PageIDs) {
			const vm = this

			initMethods()
			initListeners()
			initScope()

			function initListeners() {}

			function initMethods() {}

			function initScope() {
				vm.list = [].constructor(8)
				vm.captionTpl = url
				vm.pageID = PageIDs.newProd
				vm.vote = function (id) {
					ProductService.vote(id)
				}

				ProductService.fakeSlides(vm)
			}

			function init() {
				ProductService.hotProdList()
					.then(function (list) {
						
					})
			}
		}
	})
