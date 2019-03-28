require('./index.less');
// const { log } = require('./utils');
console.log('hello world');

// eslint-disable-next-line no-undef
if (!PRODUCTION) {
  console.log('Debug info');
}

// eslint-disable-next-line no-undef
if (PRODUCTION) {
  console.log('Production log');
}