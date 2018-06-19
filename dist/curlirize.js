'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axiosMiddleware = require('axios-middleware');

var _curlHelper = require('./lib/curl-helper');

var _curlHelper2 = _interopRequireDefault(_curlHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (instance) {
    var service = new _axiosMiddleware.HttpMiddlewareService(instance);

    service.register({
        onRequest: function onRequest(config) {
            _curlHelper2.default.transformRequest(config);
            return config;
        }
    });
};