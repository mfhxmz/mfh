/**
 * Created by scott on 2015/12/7.
 */
'use strict';

let angular = require('angular')

angular.module('app.constant', [])
    .constant('DEBUG_MODE', __DEV__)
    .constant('AppName', 'JETS Lab')
