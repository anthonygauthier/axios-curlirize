"use strict";

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
    key: "getHeaders",
    value: function getHeaders() {
      var headers = this.request.headers,
          curlHeaders = "";

      // get the headers concerning the appropriate method (defined in the global axios instance)
      if (headers.hasOwnProperty("common")) {
        headers = this.request.headers[this.request.method];
      }

      // add any custom headers (defined upon calling methods like .get(), .post(), etc.)
      for (var property in this.request.headers) {
        if (!["common", "delete", "get", "head", "patch", "post", "put"].includes(property)) {
          headers[property] = this.request.headers[property];
        }
      }

      for (var _property in headers) {
        var header = _property + ":" + headers[_property];
        curlHeaders = curlHeaders + " -H \"" + header + "\"";
      }

      return curlHeaders.trim();
    }
  }, {
    key: "getMethod",
    value: function getMethod() {
      return "-X " + this.request.method.toUpperCase();
    }
  }, {
    key: "getBody",
    value: function getBody() {
      if (typeof this.request.data !== "undefined" && this.request.data !== "" && Object.keys(this.request.data).length && this.request.method.toUpperCase() !== "GET") {
        var data = _typeof(this.request.data) === "object" || Object.prototype.toString.call(this.request.data) === "[object Array]" ? JSON.stringify(this.request.data) : this.request.data;
        return ("--data '" + data + "'").trim();
      } else {
        return "";
      }
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return this.request.url;
    }
  }, {
    key: "getQueryString",
    value: function getQueryString() {
      var params = "",
          i = 0;

      for (var param in this.request.params) {
        if (i != 0) {
          params += "&" + param + "=" + this.request.params[param];
        } else {
          params = "?" + param + "=" + this.request.params[param];
        }
        i++;
      }

      return params;
    }
  }, {
    key: "getBuiltURL",
    value: function getBuiltURL() {
      var url = this.getUrl();

      if (this.getQueryString() != "") {
        url = url.charAt(url.length - 1) == '/' ? url.substr(0, url.length - 1) : url;
        url += this.getQueryString();
      }

      return url.trim();
    }
  }, {
    key: "generateCommand",
    value: function generateCommand() {
      return ("curl " + this.getMethod() + " " + this.getHeaders() + " " + this.getBody() + " \"" + this.getBuiltURL() + "\"").trim().replace(/\s{2,}/g, " ");
    }
  }]);

  return CurlHelper;
}();