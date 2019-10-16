const ES6 = require('./src/curlirize');
const { default: CommonJS } = require('./dist/curlirize');
module.exports = typeof process === 'object' ? CommonJS : ES6;
