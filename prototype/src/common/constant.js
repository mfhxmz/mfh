/**
 * Created by scott on 2015/12/7.
 */
'use strict';

const angular = require('angular')

angular.module('app.constant', [])
	.constant('DEBUG_MODE', __DEV__)
	.constant('AppName', 'MFH')
	.constant('ApiBase', '/api')
	.constant('ServerAPI', {
		HOT_PROD_LIST: '/product/hot',
		NEW_PROD_LIST: '/product/new',
		ACTIVITY_PROD_LIST: '/activity',
		BANNER_LIST: '/banner',
		LOGIN: '/user/login',
		LOGOUT: '/user/logout',
		REGISTER: '/user/register',
		RESET_PWD: '/user/reset-password',
		DOWNLOAD_LINK: '/app-download/url',
		DL_QRCODE: '/app-download/qrcode',
		SHARE_LINK: '/share-link',
		BRAND_LIST: '/brand',
		APP_QRCODE: '/app/qrcode',
		SMS: '/sms',
		VOTE: '/product/like'
	})
	.constant('APIVersion', '')
	.constant('AuthCache', {
		key: null
	})
	.constant('AppEvents', {
		LOGIN: 'LOGIN',
		REGISTER: 'REGISTER',
		LOGOUT: 'LOGOUT'
	})
	.constant('PageIDs', {})
