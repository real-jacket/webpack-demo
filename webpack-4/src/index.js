import './index.less';
// const { log } = require('./utils');
console.log('hello world');

// eslint-disable-next-line no-undef
// if (!PRODUCTION) {
//   console.log('Debug info');
// }

// // eslint-disable-next-line no-undef
// if (PRODUCTION) {
console.log('Production log');
// }

document.querySelector('#demo').textContent = '一个测试';
// if (module.hot) {
//   module.hot.accept('./print.js', function() {
//     console.log('Accepting the updated printMe module!');
//     // eslint-disable-next-line no-undef
//     printMe();
//   });
// }