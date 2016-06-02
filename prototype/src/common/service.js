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
			vote: function (id) {
				var data = {
					pid: id
				}
				return $http.put(ServerAPI.VOTE, data)
			}
		}
	})

	/* -----------------------------------------------------------
	 * 对匹配的http请求及响应进行中间处理
	 * ----------------------------------------------------------- */
	.factory('HttpInterceptor', function ($cookies, $q, AuthCache) {
		const pattern = /^\/api.+/

		return {
			request: function (config) {
				if (!config.timeout) {
					config.timeout = 8000
				}

				if (config && AuthCache.key) {
					config.headers.Authorization = `Basic ${AuthCache.key}`
				}

				return config || $q.when(config)
			},
			response: function (response) {
				if (pattern.test(response.config.url)) {
					return response.data
				} else {
					return response
				}
			},
			responseError: function (rejection) {
				if (pattern.test(rejection.config.url)) {
					return $q.reject(rejection.data)
				} else {
					return $q.reject(rejection)
				}
			}
		}
	})
	.factory('ProductService', function (APIService) {
		return {
			vote: function (id) {
				return APIService.vote(id)
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
				ctrl.slides = [{
					imgUrl: 'http://placeholder.cn/1600x400',
					id: 1
				}]
			}
		}
	})
	.factory('AuthService', function ($rootScope, $cookies, CookieNames, AppEvents, APIService, session) {
		return {
			isLogin: function () {
				return !_.isEmpty(session.getUserInfo())
			},

			hasSessionBefore: function () {
				return $cookies.get(CookieNames.isLoggedIn) === 'true'
			},

			login: function (data) {
				return APIService.login(data)
					.then(function (response) {
						session.setUserInfo(response)

						$cookies.put(CookieNames.isLoggedIn, true, {
							expires: new Date(Date.now + 1000 * 3600 * 24 * 3)
						})

						$cookies.put(CookieNames.uid, data.username)

						$rootScope.$broadcast(AppEvents.LOGIN)
					}, function () {
						$cookies.remove(CookieNames.isLoggedIn)
						$cookies.remove(CookieNames.UID)
					})
			},
			register: function (data) {
				return APIService.register(data)
			},
			logout: function () {
				return APIService.logout()
					.then(function () {
						session.reset()
						$rootScope.$broadcast(AppEvents.LOGOUT)
						$cookies.remove(CookieNames.isLoggedIn)
					})
			},
			resetPassword: function (data) {
				return APIService.resetPassword(data)
			},
			sendSms: function (data) {
				return APIService.sendSms(data)
			},
			tryGetUserInfo: function () {

			}
		}
	})
	.service('session', function () {
		const user = {}

		return {
			setUserInfo: function (info) {
				Object.assign(user, info)
				user.coin = user.coin || 0
				user.nickname = user.nickname || user.username
			},
			getUserInfo: function () {
				return angular.copy(user)
			},
			reset: function () {
				Object.keys(user).forEach(function (key) {
					delete user[key]
				})
			}
		}
	})
