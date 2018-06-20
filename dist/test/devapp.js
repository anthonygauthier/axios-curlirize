'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/', function (req, res) {
    res.send({ hello: 'world' });
});

app.post('/', function (req, res) {
    res.send({ hello: 'world' });
});

app.listen(7500, function () {
    _fancyLog2.default.info('Express dev server listening on port 7500');
});

module.exports.app;