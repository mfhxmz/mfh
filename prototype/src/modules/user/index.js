/**
 * Created by scott on 16-5-8.
 */

'use strict'

require('./user.scss')


const angular = require('angular')

angular.module('mf.user', [])
	/**
	 * @name consistWith 密码重复输入时的一致性验证
	 * @directive
	 */
	.directive('consistWith', function () {
		return {
			restrict: 'A',
			require: "ngModel",
			scope: {
				consistModelValue: "=consistWith"
			},
			link: function (scope, element, attributes, formCtrl) {

				formCtrl.$validators.consistWith = function (modelValue) {
					return modelValue === scope.consistModelValue
				}

				scope.$watch("consistModelValue", function (newVal, oldVal) {
					if (oldVal)
						formCtrl.$validate()
				})
			}
		}
	})

require('./entrance.modal')
require('./recover.modal')
