/**
 * Created by scott on 16-5-8.
 */

'use strict'

require('./scroll-top.scss')

const angular = require('angular')
const url = require('./scrollTopBtn.tpl.html')
const $ = require('jquery')

angular.module('app.components')
	.directive('scrollTop', function () {
		return {
			restrict: 'A',
			templateUrl: url,
			link: function (scope, elem, attrs) {
				elem.on('click', function () {
					$(attrs.scrollTop).animate({
						scrollTop: 0
					}, "slow")
				})

				const reg = $(attrs.scrollTop).on('scroll', function (event, data) {
					if (event.target.scrollTop > event.target.clientHeight / 2) {
						elem.removeClass('hidden')
					} else {
						elem.addClass('hidden')
					}
				})

				elem.on('$destroy', function () {
					reg()
				})

				elem.addClass('hidden')
			}
		}
	})
