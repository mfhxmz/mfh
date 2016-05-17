/**
 * Created by scott on 2015/12/7.
 */
'use strict';

const angular = require('angular')
const $ = require('jquery')

/*Promise.config({
 // Enables all warnings except forgotten return statements.
 warnings: {
 wForgottenReturn: false
 }
 });*/

angular.module('app.directive', [])
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
	.directive('dynamicViewport', function($window) {
	    return {
		    restrict: 'A',
		    link: function(scope, element) {
			    $($window).resize(resizeHandler)

			    resizeHandler()


			    function resizeHandler() {
				    if($($window).width() <= 560){
					    element.attr('content', 'width=560px,user-scalable=no')
				    } else {
					    element.attr('content', 'width=device-width,user-scalable=no')
				    }
			    }
		    }

	    }
	})
