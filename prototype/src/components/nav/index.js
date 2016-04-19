/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./nav.scss')

const angular = require('angular')

angular.module('app.components')
    .component('appNav', {
        template: require('./nav.html'),
        controller: function() {

        }
    })
