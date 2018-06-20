'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurlHelper = exports.CurlHelper = function () {
    function CurlHelper(config) {
        _classCallCheck(this, CurlHelper);

        this.request = config;
        this.curlCommand = '';
    }

    _createClass(CurlHelper, [{
        key: 'getHeaders',
        value: function getHeaders() {
            return '';
        }
    }, {
        key: 'getMethod',
        value: function getMethod() {
            return '';
        }
    }, {
        key: 'getBody',
        value: function getBody() {
            return '';
        }
    }, {
        key: 'getUrl',
        value: function getUrl() {
            return '';
        }
    }, {
        key: 'generateCommand',
        value: function generateCommand() {
            this.curlCommand = 'curl ' + this.getMethod() + ' ' + this.getHeaders() + ' ' + this.getBody() + ' ' + this.getUrl();
            return this.curlCommand;
        }
    }]);

    return CurlHelper;
}();