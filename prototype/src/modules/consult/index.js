/**
 * Created by scott on 2016/4/20.
 */
'use strict'

require('./consult.scss')

const angular = require('angular')

angular.module('mf.consult', [])
    .config(function($stateProvider, NavList) {
        $stateProvider.state('consult', {
            url: '/consult',
            component: 'consult',
            data: { pageTitle: 'consult' }
        })

        NavList['consult'] = '活动咨询'
    })
    .component('consult', {
        template: require('./consult.html'),
        controller: function () {
            this.list = [].constructor(8)
        }
    })
