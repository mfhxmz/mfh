/**
 * Created by Scott on 2015/4/1.
 */
'use strict';

import loadScreen from '../lib/loadScreen.js'

let angular = require('angular')

function bootstrap(app) {
    angular.element(document).ready(function () {
        console.log('angular.bootstrap', '### ' + app.name + ' ###', 'modules:', app.requires)

        angular.bootstrap(document, [app.name], {
            strictDi: true
        })

        loadScreen.loaded()
    })
}

export default bootstrap
