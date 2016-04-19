/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./brands.scss')

const angular = require('angular')

angular.module('app.home')
    .component('brands', {
        template: require('./brands.html'),
        controller: function() {

        }
    })
