/**
 * Created by scott on 2016/4/19.
 */
'use strict'

require('./home.scss')

const angular = require('angular')

angular.module('app.home', [])
    .component('appHome', {
        template: require('./home.html'),
        controller: function() {

        }
    })

require('./banner')
require('./new-prod')
require('./hot-prod')
require('./services')
require('./brands')


