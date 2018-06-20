'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CurlHelper = require('./lib/CurlHelper');

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (instance) {
    instance.interceptors.request.use(function (req) {
        var curl = new _CurlHelper.CurlHelper(req);
        req.curlCommand = curl.generateCommand();
        _fancyLog2.default.info(req.curlCommand);
        return req;
    });
};