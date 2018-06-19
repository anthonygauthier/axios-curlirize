'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _curlirize = require('../curlirize');

var _curlirize2 = _interopRequireDefault(_curlirize);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _devapp = require('./devapp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Tests concerning the curl-helper', function () {
    it('should send a request', function (done) {
        _axios2.default.get('http://localhost:7500/').then(function (res) {
            (0, _expect2.default)(res.data.hello).toBe('world');
            done();
        }).catch(function (err) {
            _fancyLog2.default.error(err);
        });
    });
});