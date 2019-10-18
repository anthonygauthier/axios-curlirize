const { default: CommonJS } = require('./dist/curlirize');
module.exports =
  typeof process === 'object' ? CommonJS : require('./src/curlirize');
