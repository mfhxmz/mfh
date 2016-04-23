/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./nav.scss')

const angular = require('angular')

angular.module('app.components')
    .constant('NavList', {})
    .component('appNav', {
        template: require('./nav.html'),
        bindings: {
            collapsed: '=collapsed'
        },
        controller: function (NavList) {
            this.navList = NavList
            this.collapsed = true
            this.toggleCollapse = function() {
                this.collapsed = !this.collapsed
            }
        }
    })
