const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js'
  },

  resolve: {

  },
  module: {
    rules: [{
      test: /.\js$/,
      use: ['babel-loader'],
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
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192, // 单位是 Byte，当文件小于 8KB 时作为 DataURL 处理
          }
        }
      ]

    },
    {
      test: /.*\.(gif|png|jpe?g|svg|webp)$/i,
      use: [{
        loader: 'file-loader'
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {// 压缩 jepg 的配置
            progressive: true,
            quality: 65
          },
          optipng: {// 使用 imagemin-optipng 压缩 png，enable:false 为关闭
            enabled: false,
          },
          pngquant: {// 使用imagemin-pngquant 压缩 png
            quality: '65-90',
            speed: 4
          },
          gifsicle: {// 开启webp，会把 jpg 和 png 图片压缩为 webp 格式
            interlaced: 75
          }
        }
      }],
    },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    }
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'src/index.html', // 配置文件模板
      minify: {// 压缩HTML的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true, // 压缩 HTML 中出现的 JS 代码
        removeComments: true,
      }
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true, // dev server 的配置要启动hot，或者在命令行中带参数开启
  },
};