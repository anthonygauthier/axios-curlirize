'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _curlirize = require('../curlirize');

var _curlirize2 = _interopRequireDefault(_curlirize);

var _CurlHelper = require('../lib/CurlHelper');

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
      console.error(err);
    });
  });

  it('should return a generated command with XML as data', function (done) {
    _axios2.default.post('http://localhost:7500', "<myTestTag></myTestTag>").then(function (res) {
      (0, _expect2.default)(res.config.curlObject.getBody()).toBe("--data '<myTestTag></myTestTag>'");
      (0, _expect2.default)(res.config.curlCommand).toContain("<myTestTag></myTestTag>");
      done();
    }).catch(function (err) {
      console.error(err);
    });
  });

  it('should return the response with the defined curl command', function (done) {
    _axios2.default.post('http://localhost:7500/', { dummy: 'data' }).then(function (res) {
      (0, _expect2.default)(res.config.curlCommand).toBeDefined();
      (0, _expect2.default)(res.config.curlCommand).toBe('curl -X POST -H "Content-Type:application/x-www-form-urlencoded" --data \'{"dummy":"data"}\' "http://localhost:7500/"');
      done();
    }).catch(function (err) {
      console.error(err);
    });
  });

  it('should return the generated command with no --data attribute', function (done) {
    _axios2.default.post('http://localhost:7500/').then(function (res) {
      (0, _expect2.default)(res.config.curlCommand).toBeDefined();
      (0, _expect2.default)(res.config.curlCommand).toBe('curl -X POST -H "Content-Type:application/x-www-form-urlencoded" "http://localhost:7500/"');
      done();
    }).catch(function (err) {
      console.error(err);
    });
  });

  it('should return the generated command with headers specified on method call', function (done) {
    _axios2.default.post('http://localhost:7500/', {}, { headers: { Authorization: 'Bearer 123', testHeader: 'Testing' } }).then(function (res) {
      (0, _expect2.default)(res.config.curlCommand).toBeDefined();
      (0, _expect2.default)(res.config.curlCommand).toBe('curl -X POST -H \"Content-Type:application/x-www-form-urlencoded\" -H \"Authorization:Bearer 123\" -H \"testHeader:Testing\" "http://localhost:7500/"');
      done();
    }).catch(function (err) {
      console.error(err);
    });
  });

  it('should return the generated command with a queryString specified in the URL', function (done) {
    _axios2.default.post('http://localhost:7500/', {}, { params: { test: 1 } }).then(function (res) {
      (0, _expect2.default)(res.config.curlCommand).toBeDefined();
      (0, _expect2.default)(res.config.curlCommand).toBe('curl -X POST -H \"Content-Type:application/x-www-form-urlencoded\" "http://localhost:7500?test=1"');
      done();
    }).catch(function (err) {
      console.error(err);
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
    data: { dummy: 'data' },
    params: { testParam: 'test1', testParam_two: "test2" }
  };
  var curl = new _CurlHelper.CurlHelper(fakeConfig);

  it('should return an empty string if data is undefined', function (done) {
    var emptyConfig = {
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
      data: undefined
    };
    var emptyDataCurl = new _CurlHelper.CurlHelper(emptyConfig);
    (0, _expect2.default)(emptyDataCurl.getBody()).toBe('');
    done();
  });

  it('should return an empty string if data is == empty string', function (done) {
    var emptyConfig = {
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
      data: ''
    };
    var emptyDataCurl = new _CurlHelper.CurlHelper(emptyConfig);
    (0, _expect2.default)(emptyDataCurl.getBody()).toBe('');
    done();
  });

  it('should return an empty string if data is == {}', function (done) {
    var emptyConfig = {
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
      data: {}
    };
    var emptyDataCurl = new _CurlHelper.CurlHelper(emptyConfig);
    (0, _expect2.default)(emptyDataCurl.getBody()).toBe('');
    done();
  });

  it('should return a string with headers', function (done) {
    (0, _expect2.default)(curl.getHeaders()).toBe('-H "Accept:application/json, text/plain, */*" -H "Content-Type:application/json;charset=utf-8"');
    done();
  });

  it('should return a string with HTTP method', function (done) {
    (0, _expect2.default)(curl.getMethod()).toBe('-X POST');
    done();
  });

  it('should return a string with request body', function (done) {
    (0, _expect2.default)(curl.getBody()).toBe('--data \'{"dummy":"data"}\'');
    done();
  });

  it('should return the URL of the request', function (done) {
    (0, _expect2.default)(curl.getUrl()).toBe("http://localhost:7500/");
    done();
  });

  it('should return the queryString of the request', function (done) {
    (0, _expect2.default)(curl.getQueryString()).toBe("?testParam=test1&testParam_two=test2");
    done();
  });
});