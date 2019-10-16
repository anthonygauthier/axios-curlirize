'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/', function (req, res) {
  res.send({ hello: 'world' });
});

app.post('/', function (req, res) {
  res.send({ hello: 'world' });
});

app.listen(7500, function () {
  console.info('Express dev server listening on port 7500');
});

module.exports.app;