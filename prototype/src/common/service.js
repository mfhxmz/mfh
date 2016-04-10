/**
 * Created by scott on 2015/12/7.
 */
let angular = require('angular')
let _ = require('lodash')

angular.module('app.service', [])
	.constant('ServerAPI', {
		
	})
	.constant('serverAddress', __SERVERADDR__)
	.constant('APIVersion', 'v1')
	.constant('AuthCache', {
		key: null
	})
	.config(function (ServerAPI, APIVersion, serverAddress) {
		angular.forEach(ServerAPI, function (api, name) {
			ServerAPI[name] = `${serverAddress}/${APIVersion}${api}`
		})
	})
	.factory('netWorkService', function ($http, $httpParamSerializerJQLike, $q, ServerAPI, AuthCache) {
        
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
