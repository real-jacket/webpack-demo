const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },

    module: {
        noParsew: /jquery|loadash/, // 不需要解析的依赖模块
        rules: [
            {
                enforce: 'pre', // 指定未前置类型
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.jsx?/, // 条件
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
                use: [
                    {
                        loader: 'file-loader'
                    },
                ],
            },
        ],
    },

    // 代码模块路径解析的配置
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src'),
        ],

        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
        // 匹配后缀的优先级
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: 'src/index.html', // 配置文件模板
        }),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin.DefinePlugin({// 配置一些全局常量
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('23avb45'),
            BROWSER_SUPPORT_HTML: true,
            CONSTANTS: {
                APP_VERSION: JSON.stringify('1.1.2')
            }
        })
    ],
};