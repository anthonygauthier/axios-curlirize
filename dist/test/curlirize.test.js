'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _curlirize = require('../curlirize');

var _curlirize2 = _interopRequireDefault(_curlirize);

var _CurlHelper = require('../lib/CurlHelper');

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _devapp = require('./devapp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _curlirize2.default)(_axios2.default);

describe('Testing curlirize', function () {
    it('should return a 200 with the value \'world\'', function (done) {
        _axios2.default.post('http://localhost:7500/', { dummy: 'data' }).then(function (res) {
            (0, _expect2.default)(res.status).toBe(200);
            (0, _expect2.default)(res.data.hello).toBe('world');
            done();
        }).catch(function (err) {
            _fancyLog2.default.error(err);
        });
    });

    it('should return the response with the defined curl command', function (done) {
        _axios2.default.post('http://localhost:7500/', { dummy: 'data' }).then(function (res) {
            (0, _expect2.default)(res.config.curlCommand).toBeDefined();
            (0, _expect2.default)(res.config.curlCommand).toBe('curl -X POST -H "Content-Type:application/x-www-form-urlencoded" --data {"dummy":"data"} http://localhost:7500/');
            done();
        }).catch(function (err) {
            _fancyLog2.default.error(err);
        });
    });
});

describe('Testing curl-helper module', function () {
    var fakeConfig = {
        adapter: function adapter() {
            return 'dummy';
        },
        transformRequest: { '0': function _() {
                return 'dummy';
            } },
        transformResponse: { '0': function _() {
                return 'dummy';
            } },
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        validateStatus: function validateStatus() {
            return 'dummy';
        },
        headers: { Accept: 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8' },
        method: 'post',
        url: 'http://localhost:7500/',
        data: { dummy: 'data' }
    };
    var curl = new _CurlHelper.CurlHelper(fakeConfig);

    it('should return a string with headers', function (done) {
        (0, _expect2.default)(curl.getHeaders().trim()).toBe('-H "Accept:application/json, text/plain, */*" -H "Content-Type:application/json;charset=utf-8"');
        done();
    });

    it('should return a string with HTTP method', function (done) {
        (0, _expect2.default)(curl.getMethod().trim()).toBe('-X POST');
        done();
    });

    it('should return a string with request body', function (done) {
        (0, _expect2.default)(curl.getBody().trim()).toBe('--data {"dummy":"data"}');
        done();
    });

    it('should return the URL of the request', function (done) {
        (0, _expect2.default)(curl.getUrl().trim()).toBe("http://localhost:7500/");
        done();
    });
});