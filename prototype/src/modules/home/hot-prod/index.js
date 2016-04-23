/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./hot-prod.scss')

require('../components/prod-card')

const angular = require('angular')

angular.module('mf.home')
    .component('hotProd', {
        template: require('./hot-prod.html'),
        controller: function () {
            const vm = this
            
            vm.list=[].constructor(8)
        }
    })

