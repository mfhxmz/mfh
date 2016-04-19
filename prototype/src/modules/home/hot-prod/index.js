/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./hot-prod.scss')

const angular = require('angular')

angular.module('app.home')
    .component('hotProd', {
        template: require('./hot-prod.html'),
        controller: function() {

        }
    })

