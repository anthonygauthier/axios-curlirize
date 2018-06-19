'use strict';

var _axiosMiddleware = require('axios-middleware');

var _curlHelper = require('./lib/curl-helper');

var _curlHelper2 = _interopRequireDefault(_curlHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.curlirize = function (instance) {
    var service = new _axiosMiddleware.HttpMiddlewareService(instance);

    service.register({
        onRequest: function onRequest(config) {
            console.log(_curlHelper2.default.transformRequest(config));
        }
    });
};