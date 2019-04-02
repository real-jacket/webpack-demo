import './index.less';
const { log } = require('./utils');
log('hello world');

// eslint-disable-next-line no-undef
// if (!PRODUCTION) {
//   console.log('Debug info');
// }

// // eslint-disable-next-line no-undef
// if (PRODUCTION) {
log('Production log');
// }

// document.querySelector('#demo').textContent = '一个测试';
// if (module.hot) {
//   module.hot.accept('./print.js', function() {
//     console.log('Accepting the updated printMe module!');
//     // eslint-disable-next-line no-undef
//     printMe();
//   });
// }

// import 作为一个方法使用，传入模块名即可，返回一个 promise 来获取模块暴露的对象
// 注释 webpackChunkName: "lodash" 可以用于指定 chunk 的名称，在输出文件时有用
// eslint-disable-next-line no-undef
import(/* webpackChunkName: "lodash" */ 'lodash').then((_) => {
    console.log(_.lash([1, 2, 3])) // 打印 3
  })