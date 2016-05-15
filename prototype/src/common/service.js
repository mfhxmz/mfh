/**
 * Created by scott on 2015/12/7.
 */
const angular = require('angular')
const _ = require('lodash')

angular.module('app.service', [])
	.factory('APIService', function ($http, $httpParamSerializerJQLike, $q, ServerAPI, AuthCache) {
		return {
			bannerList: function () {
				return $http.get(ServerAPI.BANNER_LIST)
			},
			hotProdList: function () {
				return $http.get(ServerAPI.HOT_PROD_LIST)
			},
			newProdList: function () {
				return $http.get(ServerAPI.NEW_PROD_LIST)
			},
			brandList: function () {
				return $http.get(ServerAPI.BRAND_LIST)
			},
			activityProdList: function () {
				return $http.get(ServerAPI.ACTIVITY_PROD_LIST)
			},
			downloadLink: function () {
				return $http.get(ServerAPI.DOWNLOAD_LINK)
			},
			downloadQrcode: function () {
				return $http.get(ServerAPI.DL_QRCODE)
			},
			shareLink: function () {
				return $http.get(ServerAPI.SHARE_LINK)
			},
			appQrcode: function () {
				return $http.get(ServerAPI.APP_QRCODE)
			},
			login: function (data) {
				return $http.post(ServerAPI.LOGIN, data)
			},
			logout: function () {
				return $http.get(ServerAPI.LOGOUT)
			},
			register: function (data) {
				return $http.post(ServerAPI.REGISTER, data)
			},
			resetPassword: function (data) {
				return $http.post(ServerAPI.RESET_PWD, data)
			},
			sendSms: function (data) {
				return $http.post(ServerAPI.SMS, data)
			},
			vote: function (data) {
				return $http.put(ServerAPI.VOTE, data)
			}
		}
	})

	/* -----------------------------------------------------------
	 * 对匹配的http请求及响应进行中间处理
	 * ----------------------------------------------------------- */
	.factory('HttpInterceptor', function ($cookies, $q, AuthCache) {
		return {
			request: function (config) {
				if (!config.timeout) {
					config.timeout = 8000
				}

				if (config && AuthCache.key) {
					config.headers.Authorization = `Basic ${AuthCache.key}`
				}

				return config || $q.when(config)
			}
		}
	})
	.factory('ProductService', function (APIService) {
		return {
			vote: function (data) {
				return APIService.vote(data)
			},
			bannerList: function () {
				return APIService.bannerList()
			},
			hotProdList: function () {
				return APIService.hotProdList()
			},
			newProdList: function () {
				return APIService.newProdList()
			},
			brandList: function () {
				return APIService.brandList()
			},
			activityProdList: function () {
				return APIService.activityProdList()
			},
			downloadLink: function () {
				return APIService.downloadLink()
			},
			downloadQrcode: function () {
				return APIService.downloadQrcode()
			},
			shareLink: function () {
				return APIService.shareLink()
			},
			appQrcode: function () {
				return APIService.appQrcode()
			},
			fakeSlides: function (ctrl) {
				ctrl.slides = []
				for (var i = 0; i < 4; i++) {
					ctrl.slides.push({
						image: `http://placeholder.cn/1600x400/fe${i * 2 + 1}d38`,
						id: i
					})
				}
			}
		}
	})
	.factory('AuthService', function ($rootScope,AppEvents, APIService, session) {
		return {
			isLogin: function() {
			  return false  
			},
			
			login: function (data) {
				return APIService.login(data)
					.then(function(response) {
						session.setUserInfo(response)

						$rootScope.$broadcast(AppEvents.LOGIN)
					})
			},
			register: function (data) {
				return APIService.register(data)
			},
			logout: function () {
				return APIService.logout()
					.then(function() {
					    session.reset()
						$rootScope.$broadcast(AppEvents.LOGOUT)
					})
			},
			resetPassword: function(data) {
				return APIService.resetPassword(data)
			},
			sendSms: function(data) {
				return APIService.sendSms(data)
			}
		}
	})
	/* -----------------------------------------------------------
	 * 将modal与state整合封装成路由配置
	 * ----------------------------------------------------------- */
	.provider('modalState', function ($stateProvider) {
		var provider = this
		this.$get = function () {
			return provider
		}
		this.state = function (stateName, options) {
			var modalInstance
			$stateProvider.state(stateName, {
				url: options.url,
				onEnter: function ($uibModal, $state) {
					modalInstance = $uibModal.open(options)
					modalInstance.result.finally(function () {
						modalInstance = null
						if ($state.$current.name === stateName) {
							$state.go(options.toState || '^')
						}
					})
				},
				onExit: function () {
					if (modalInstance) {
						modalInstance.close()
					}
				}
			})
		}
	})
