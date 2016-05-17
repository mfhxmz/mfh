/**
 * Created by scott on 2016/4/20.
 */
'use strict'

require('./consult.scss')

const url = require('./caption2.tpl.html')

const angular = require('angular')

angular.module('mf.consult', [])
	.config(function ($stateProvider, NavList, PageIDs) {
		$stateProvider.state('consult', {
			url: '/consult',
			component: 'consult',
			data: { pageTitle: 'consult' }
		})

		NavList['consult'] = '活动咨询'
		PageIDs.activity = 'activity'
	})
	.component('consult', {
		template: require('./consult.html'),
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
				
				init()
			}

			function init() {
				ProductService.bannerList({
					limitTo: 10,
					startFrom: 0
				})
					.then(function (list) {

					})
			}
		}
	})
