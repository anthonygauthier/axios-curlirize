'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CurlHelper = require('./lib/CurlHelper');

function defaultLogCallback(curlResult, err) {
  var command = curlResult.command;

  if (err) {
    console.error(err);
  } else {
    console.info(command);
  }
}

exports.default = function (instance) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultLogCallback;

  instance.interceptors.request.use(function (req) {
    try {
      var curl = new _CurlHelper.CurlHelper(req);
      req.curlObject = curl;
      req.curlCommand = curl.generateCommand();
    } catch (err) {
      // Even if the axios middleware is stopped, no error should occur outside.
      callback(null, err);
    } finally {
      if (req.curlirize !== false) {
        callback({
          command: req.curlCommand,
          object: req.curlObject
        });
      }
      return req;
    }
  });
};