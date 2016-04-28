/**
 * Created by scott on 2016/4/20.
 */
'use strict'

require('./new-prod.scss')
const url = require('../hotProd/caption3.tpl.html')

const angular = require('angular')

angular.module('mf.newProd', [])
	.config(function ($stateProvider, NavList, PageIDs) {
		$stateProvider.state('newProd', {
			url: '/newProd',
			component: 'mfNewProd',
			data: { pageTitle: 'newProd' }
		})

		NavList['newProd'] = '新品推荐'
		PageIDs.newProd = 'newProd'
	})
	.component('mfNewProd', {
		template: require('./new-prod.html'),
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
