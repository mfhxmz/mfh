/**
 * Created by scott on 2016/5/9.
 */

const loginUrl = require('./entrance.login.tpl.html')
const registerUrl = require('./entrance.register.tpl.html')
const entranceUrl = require('./entrance.modal.tpl.html')

const angular = require('angular')

angular.module('mf.user')
	.service('entranceModal', function ($uibModal, recoverModal) {
		/**
		 *
		 * @param target['login'|'register']
		 */
		this.open = function open(target) {
			const mInstance = $uibModal.open({
				templateUrl: entranceUrl,
				controller: 'EntranceModalCtrl',
				controllerAs: 'emc',
				windowClass: 'center',
				backdrop: 'static',
				resolve: {
					target: function () {
						return target || 'user'
					}
				}
			})

			mInstance.result.then(function () {

			}, function (jump) {
				if (jump) {
					recoverModal.open()
				}
			})
		}
	})
	.controller('EntranceModalCtrl', function ($scope, target) {

		const vm = this

		const tabMap = {
			login: 0,
			register: 1
		}

		initMethods()
		initListeners()
		initScope()

		function initListeners() {}

		function initMethods() {}

		function initScope() {
			vm.active = tabMap[target]
		}
	})
	.component('login', {
		templateUrl: loginUrl,
		bindings: {
			onSuccess: '&',
			onJumpRecover: '&'
		},
		controller: function (AuthService) {

			const vm = this

			initMethods()
			initListeners()
			initScope()

			function initListeners() {}

			function initMethods() {
				vm.submitForm = function () {
					vm.loading = true
					AuthService.login(vm.user)
						.then(function () {
							vm.onSuccess()
						})
						.finally(function () {
							vm.loading = false
						})
				}

				vm.gotoRecoverModal = function () {
					vm.onJumpRecover()
				}
			}

			function initScope() {
				vm.user = {}
			}

		},
		controllerAs: 'login'
	})
	.component('register', {
		templateUrl: registerUrl,
		bindings: {
			onSuccess: '&'
		},
		controller: function ($interval, AuthService) {

			const vm = this
			let intervalTimer = null

			initMethods()
			initListeners()
			initScope()

			function initListeners() {}

			function initMethods() {
				vm.submitValidateForm = function () {
					vm.loading = true

					vm.sendSms()
				}
				
				vm.sendSms = function() {
					// todo delete
					vm.selection = 'register'
					smsCountDown(60)
					AuthService.sendSms(vm.user.username)
						.then(function () {
							smsCountDown(60)
							vm.selection = 'register'
						})
				}


				vm.submitForm = function () {
					vm.loading = true
					AuthService.register(vm.user)
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

			function initScope() {
				vm.selection = 'sendSms'
			}

			function smsCountDown(count) {
				$interval.cancel(intervalTimer)
				count = count ? count : 10
				vm.countDown = count
				intervalTimer = $interval(function () {
					vm.countDown--
				}, 1000, count)
			}

		},
		controllerAs: 'register'
	})
	.directive('countDown', function ($interval) {
		return {
			restrict: 'A',
			scope: {
				count: '@countDown',
				counting: '=?',
				trigger: '=?'
			},
			link: function (scope, elem) {
				scope.count = parseInt(scope.count)
				scope.counting = 0

				elem.click(function (e) {
					scope.$apply(function () {
						startCounting()
					})
				})

				scope.$watch('trigger', function (newVal, oldVal) {
					if (newVal !== oldVal && newVal === true) {
						startCounting()
					}
				})

				function startCounting() {
					scope.counting = scope.count

					$interval(function () {
						scope.counting--
					}, 1000, scope.count)
				}
			}
		}
	})
