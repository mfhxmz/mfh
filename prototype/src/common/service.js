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
			linkList: function () {
				return $http.get(ServerAPI.LINK_LIST)
			},
			login: function (data) {
				return $http.post(ServerAPI.LOGIN)
			},
			register: function (data) {
				return $http.post(ServerAPI.REGISTER)
			},
			logout: function () {
				return $http.put(ServerAPI.LOGOUT)
			},
			vote: function (data) {
				return $http.put(ServerAPI.VOTE)
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
			vote: function () {
			},
			bannerList: function () {
			},
			hotProdList: function () {
			},
			newProdList: function () {
			},
			brandList: function () {
			},
			activityProdList: function () {
			},
			linkList: function () {
			},
			fakeSlides: function(ctrl) {
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
	.factory('AuthService', function (APIService) {
		return {
			login: function () {
			},
			register: function () {
			},
			logout: function () {
			},
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
