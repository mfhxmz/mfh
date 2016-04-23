/**
 * Created by scott on 2015/12/25.
 */
'use strict';

import './constant'
import './config'
import './filter'
import './service'
import './directive'

const angular = require('angular')

angular.module('app.common', [
        'app.constant',
        'app.config',
        'app.directive',
        'app.filter',
        'app.service'
    ])
    /* -----------------------------------------------------------
     * debug模式下 向angular事件系统注入log逻辑，记录每个事件的触发，todo: 待完善
     * ----------------------------------------------------------- */
    .run(function ($rootScope, $log, DEBUG_MODE) {

        if (DEBUG_MODE) {
            var scopePrototype = Object.getPrototypeOf($rootScope),
                origin$on = scopePrototype.$on

            scopePrototype.$on = function (name, listener) {
                return angular.bind(this, origin$on)(name, function () {
                    $log.warn('***** event ### ', name, ' ### fired! *****', arguments)
                    listener.apply(null, arguments)
                })
            }
        }
    })
