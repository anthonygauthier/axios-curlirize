'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurlHelper = exports.CurlHelper = function () {
    function CurlHelper(config) {
        _classCallCheck(this, CurlHelper);

        this.request = config;
    }

    _createClass(CurlHelper, [{
        key: 'getHeaders',
        value: function getHeaders() {
            var headers = this.request.headers;
            var curlHeaders = '';

            for (var property in headers) {
                curlHeaders = curlHeaders + ' -H "' + property + ':' + headers[property] + '"';
            }

            return curlHeaders;
        }
    }, {
        key: 'getMethod',
        value: function getMethod() {
            return '-X ' + this.request.method.toUpperCase();
        }
    }, {
        key: 'getBody',
        value: function getBody() {
            var data = _typeof(this.request.data) === 'object' || typeof this.request.data === 'array' ? JSON.stringify(this.request.data) : this.request.data;
            return '--data ' + JSON.stringify(this.request.data);
        }
    }, {
        key: 'getUrl',
        value: function getUrl() {
            return this.request.url;
        }
    }, {
        key: 'generateCommand',
        value: function generateCommand() {
            return 'curl ' + this.getMethod() + ' ' + this.getHeaders() + ' ' + this.getBody() + ' ' + this.getUrl();
        }
    }]);

    return CurlHelper;
}();