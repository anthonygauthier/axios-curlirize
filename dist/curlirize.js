'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axiosMiddleware = require('axios-middleware');

var _CurlHelper = require('./lib/CurlHelper');

exports.default = function (instance) {
    var service = new _axiosMiddleware.HttpMiddlewareService(instance);

    service.register({
        onRequest: function onRequest(config) {
            var curl = new _CurlHelper.CurlHelper(config);
            console.log(curl.generateCommand());
            return config;
        }
    });
};