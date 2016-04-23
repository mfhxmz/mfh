/**
 * Created by scott on 2016/4/20.
 */
'use strict'

require('./new-prod.scss')

const angular = require('angular')

angular.module('mf.newProd', [])
    .config(function($stateProvider, NavList) {
        $stateProvider.state('newProd', {
            url: '/newProd',
            component: 'mfNewProd',
            data: { pageTitle: 'newProd' }
        })
        
        NavList['newProd'] = '新品推荐'
    })
    .component('mfNewProd', {
        template: require('./new-prod.html'),
        controller: function () {
            this.list = [].constructor(8)
        }
    })
