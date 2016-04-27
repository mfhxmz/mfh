/**
 * Created by scott on 2015/12/7.
 */
'use strict';

const angular = require('angular')
const $ = require('jquery')

angular.module('app.filter', [])
	/**
	 * @name limitToAppend
	 * @filter
	 */
	.filter('limitToPlus', function ($filter) {
		let limitTo = $filter('limitTo')
		return function (src, limit, append) {
			if (typeof src !== 'string')
				throw new Error('input of limitToAppend filter must be string')
			let dst = limitTo(src, limit)
			if (dst != src)
				dst += append || '...'
			return dst
		}
	})
