/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./nav.scss')

const angular = require('angular')

angular.module('app.components')
	.constant('NavList', {})
	.component('appNav', {
		template: require('./nav.html'),
		bindings: {
			collapsed: '=collapsed'
		},
		controller: function ($scope, AppEvents, session, NavList, entranceModal, recoverModal) {
			const vm = this
			this.navList = NavList
			this.collapsed = true

			this.entranceModal = entranceModal
			this.recoverModal = entranceModal

			$scope.$on(AppEvents.LOGIN, function () {
				vm.userInfo = angular.copy(session.getUserInfo())
			})

			$scope.$on(AppEvents.LOGOUT, function () {
				vm.userInfo = null
			})
		}
	})
