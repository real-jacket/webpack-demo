const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const mock = require('./mock');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    // noParsew: /jquery|loadash/, // 不需要解析的依赖模块
    rules: [{
      enforce: 'pre', // 指定未前置类型
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    },
    {
      test: /\.jsx/, // 条件
      include: [
        path.resolve(__dirname, 'src'),
      ], // 条件
      use: 'babel-loader', // 规则应用结果
    },
    {
      test: /\.less$/,
      // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'less-loader',
        ],
      }),
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader'
      }],
    },
    ],
  },

  // 代码模块路径解析的配置
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],

    alias: {
      utils: path.resolve(__dirname, 'src/utils')
    },

    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
    // 匹配后缀的优先级
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'src/index.html', // 配置文件模板
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'typeof window': JSON.stringify('object'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.IgnorePlugin(/^\/locale$/, /moment$/),
    new webpack.LoaderOptionsPlugin({
      options: {
        // before 和 after 配置用于在webpack-dev-server定义额外的中间件
        before(app) {
          // app.get('/some/path', function (req, res) {
          //   res.json({
          //     custom: 'response'
          //   });
          // });
          mock(app);
        },

        proxy: {
          '/api': {
            target: 'http://localhost:3000', // 将 URL 中带有 /api 的请求代理到本地的3000端口的服务商
            pathRewrite: {
              '^/api': ''
            }, // 把 URL 中 path 部分的 'api' 移除掉
          }
        },

        // 不需要经过webpack构件，但是需在webpack-dev-server中提供访问的静态资源
        contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')],
      }
    })
  ],
};