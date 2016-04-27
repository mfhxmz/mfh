/**
 * Created by scott on 2015/12/7.
 */
'use strict';

const angular = require('angular')
const $ = require('jquery')
const Promise = require('bluebird')

/*Promise.config({
 // Enables all warnings except forgotten return statements.
 warnings: {
 wForgottenReturn: false
 }
 });*/

angular.module('app.directive', [])
	.directive('scrollTop', function () {
		return {
			restrict: 'A',
			link: function (scope, elem) {
				elem.on('click', function () {
					$('html, body').animate({
						scrollTop: 0
					}, "slow")
				})
			}
		}
	})
	.directive('clickStop', function ($parse) {
		return {
			restrict: 'A',
			compile: function ($element, attr) {
				var fn = $parse(attr['clickStop'], null, true)

				return function (scope, element) {
					element.on('click', function (event) {
						scope.$apply(function () {
							fn(scope, { $event: event })
							event.preventDefault()
							event.stopPropagation()
						})
					})
				}
			}
		}
	})
