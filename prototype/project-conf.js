/**
 * Created by scott on 16-4-10.
 */
'use strict'

module.exports = {
	globals: {
		__SERVERADDR__: ''
	}
}


function getIP() {
    var os = require('os');
    var iFaces = os.networkInterfaces();
    for (let dev in iFaces) {
        if (iFaces.hasOwnProperty(dev)) {
            for (let details of iFaces[dev]) {
                if (details.family === 'IPv4' && details.mac !== '00.00.00.00.00.00') {
                    return details.address
                }
            }
        }
    }
}

