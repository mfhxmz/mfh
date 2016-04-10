/**
 * Created by scott on 2015/12/25.
 */
'use strict';

import './constant'
import './config'
import './filter'
import './service'
import './directive'

let angular = require('angular')

angular.module('app.common', [
        'app.constant',
        'app.config',
        'app.directive',
        'app.filter',
        'app.service'
    ])
