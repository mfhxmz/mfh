/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./footer.scss')

const angular = require('angular')

angular.module('app.components')
	.component('appFooter', {
		template: require('./footer.html'),
		controller: function (ProductService) {
			const vm = this

			ProductService.appQrcode()
				.then(function (data) {
					vm.qrcodeUrl = data
				})
			
		}
	})
