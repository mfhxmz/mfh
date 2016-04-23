/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./service.scss')

const angular = require('angular')

angular.module('mf.home')
    .component('services', {
        template: require('./service.html'),
        controller: function () {

        }
    })

