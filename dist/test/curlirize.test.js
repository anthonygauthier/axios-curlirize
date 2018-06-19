'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _curlirize = require('../curlirize');

var _curlirize2 = _interopRequireDefault(_curlirize);

var _curlHelper = require('../lib/curl-helper');

var _curlHelper2 = _interopRequireDefault(_curlHelper);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _devapp = require('./devapp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _curlirize2.default)(_axios2.default);

describe('Testing axios-middleware module', function () {
    it('should return a 200 with the value \'world\'', function (done) {
        _axios2.default.get('http://localhost:7500/').then(function (res) {
            (0, _expect2.default)(res.status).toBe(200);
            (0, _expect2.default)(res.data.hello).toBe('world');
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
        headers: { Accept: 'application/json, text/plain, */*' },
        method: 'get',
        url: 'http://localhost:7500/',
        data: undefined
    };

    it('should return a string with headers', function (done) {

        done();
    });

    it('should return a string with HTTP method', function (done) {

        done();
    });

    it('should return a string with request body', function (done) {

        done();
    });

    it('should return the URL of the request', function (done) {

        done();
    });
});