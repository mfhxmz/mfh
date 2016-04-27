/**
 * Created by scott on 2016/4/20.
 */
'use strict'

require('./aim.scss')

const angular = require('angular')

angular.module('mf.aim', [])
	.config(function ($stateProvider, NavList) {
		$stateProvider.state('aim', {
			url: '/aim',
			component: 'aim',
			data: { pageTitle: 'aim' }
		})

		NavList['aim'] = 'MF宗旨'
	})
	.component('aim', {
		template: require('./aim.html'),
		controller: function () {

		}
	})
