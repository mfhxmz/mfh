/**
 * Created by scott on 2016/4/20.
 */
'use strict'

require('./prod-card.scss')

const angular = require('angular')

angular.module('app.components')
    .component('prodCard2', {
        template: require('./prod-card.html'),
        bindings: {
            cardInfo: '<'
        },
        controller: function () {

        }
    })
