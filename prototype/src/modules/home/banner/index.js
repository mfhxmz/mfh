/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./banner.scss')

const angular = require('angular')

angular.module('app.home')
    .component('banner', {
        template: require('./banner.html'),
        controller: function() {

        }
    })
