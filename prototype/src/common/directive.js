/**
 * Created by scott on 2015/12/7.
 */
'use strict';

let angular = require('angular')
let $ = require('jquery')
let Promise = require('bluebird')

Promise.config({
    // Enables all warnings except forgotten return statements.
    warnings: {
        wForgottenReturn: false
    }
});

angular.module('app.directive', [])
