/**
 * Created by scott on 2016/4/20.
 */
'use strict'

require('./hot-prod.scss')

const url = require('./caption3.tpl.html')


const angular = require('angular')

angular.module('mf.hotProd', [])
	.config(function ($stateProvider, NavList) {
		$stateProvider.state('hotProd', {
			url: '/hotProd',
			component: 'mfHotProd',
			data: { pageTitle: 'hotProd' }
		})

		NavList['hotProd'] = '爆品推荐'
	})
	.component('mfHotProd', {
		template: require('./hot-prod.html'),
		controller: function () {
			this.list = [].constructor(8)
			this.captionTpl = url
		}
	})
