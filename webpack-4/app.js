const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackOptions = require('./webpack.config.js');

webpackOptions.mode = 'development';

const compiler = webpack(webpackOptions);
const express = require('express');
const app = express();

app.use(middleware(compiler, {

}));

app.listen(3000, () => console.log('Example app listen on port 3000!'));