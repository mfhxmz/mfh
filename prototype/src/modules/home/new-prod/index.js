/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./new-prod.scss')

const captionUrl = require('../caption.tpl.html')

const angular = require('angular')

angular.module('mf.home')
    .component('newProd', {
        template: require('./new-prod.html'),
        controller: function () {
            this.list = [].constructor(4)
            this.captionTpl = captionUrl
        }
    })

