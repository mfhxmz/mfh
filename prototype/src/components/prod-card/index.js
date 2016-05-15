/**
 * Created by scott on 2016/4/20.
 */
'use strict'

require('./prod-card.scss')

const angular = require('angular')

angular.module('app.components')
	.component('prodCard', {
		template: require('./prod-card.html'),
		bindings: {
			prodInfo: '<',
			template: '<'
		},
		controller: function (ProductService, AuthService, entranceModal) {
			const vm = this

			vm.vote = function (id) {
				if (AuthService.isLogin()) {
					ProductService.vote(id)
						.then(function () {
							// xxx.likeNum +1
						})
				} else {
					entranceModal.open('login')
				}
			}
		}
	})
