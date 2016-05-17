/**
 * Created by scott on 2016/5/9.
 */

'use strict'

const recoverurl = require('./recover.modal.tpl.html')

const angular = require('angular')

angular.module('mf.user')

	.service('recoverModal', function ($uibModal) {
		/**
		 *
		 * @param target['login'|'register']
		 * @param userInfo
		 */
		this.open = function open(target, userInfo) {
			$uibModal.open({
				templateUrl: recoverurl,
				controller: 'RecoverModalCtrl',
				controllerAs: 'rmc',
				windowClass: 'center',
				backdrop: 'static'
			})
		}
	})
	.controller('RecoverModalCtrl', function($interval,AuthService) {
		const vm = this
		let intervalTimer = null

		initMethods()
		initListeners()
		initScope()

		function initListeners() {}

		function initMethods() {
			vm.sendSms = function() {
				// todo delete
				smsCountDown(60)
				APIService.sendSms(vm.user.username)
					.then(function () {
						smsCountDown(60)
					})
			}

			vm.submitForm = function () {
				vm.loading = true
				AuthService.resetPassword(vm.user)
					.then(function () {
						const loginData = angular.copy(vm.user)
						delete loginData.smsCode
						return AuthService.login(loginData)
					})
					.then(function () {
						vm.onSuccess()
					})
					.finally(function () {
						vm.loading = false
					})
			}
		}

		function initScope() {}


		function smsCountDown(count) {
			$interval.cancel(intervalTimer)
			count = count ? count : 10
			vm.countDown = count
			intervalTimer = $interval(function () {
				vm.countDown--
			}, 1000, count)
		}

	})
