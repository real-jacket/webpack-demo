const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: 'bable-loader',
            },
        ],
    },

    resolve: {
        module: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],

        extensions: ['.wasm', '.mjs', '.json', '.jsx']
    },

    plugins: [
        new HtmlWebpackPlugin(),
    ],
};