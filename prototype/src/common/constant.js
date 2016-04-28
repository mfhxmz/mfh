/**
 * Created by scott on 2015/12/7.
 */
'use strict';

const angular = require('angular')

angular.module('app.constant', [])
	.constant('DEBUG_MODE', __DEV__)
	.constant('AppName', 'MFH')
	.constant('ServerAPI', {
		HOT_PROD_LIST: '',
		NEW_PROD_LIST: '',
		ACTIVITY_PROD_LIST: '',
		BANNER_LIST: '',
		LOGIN: '',
		LOGOUT: '',
		REGISTER: '',
		LINK_LIST: '',
		BRAND_LIST: '',
		VOTE: ''
	})
	.constant('APIVersion', 'v1')
	.constant('AuthCache', {
		key: null
	})
	.constant('PageIDs', {})
