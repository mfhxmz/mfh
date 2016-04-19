/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./new-prod.scss')

const angular = require('angular')

angular.module('app.home')
    .component('newProd', {
        template: require('./new-prod.html'),
        controller: function() {

        }
    })

