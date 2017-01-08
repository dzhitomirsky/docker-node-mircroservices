"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const APPLICATION_NAME = process.env.APPLICATION_NAME || 'bar';

const app = express();
const mode = process.env.NODE_ENV || 'development';
const port = process.env.PORT ? process.env.PORT : 3001;
const host = process.env.HOST ? process.env.HOST : 'localhost';

const webpackConfig = require('../../webpack.config.js');
const compiler = webpack([webpackConfig]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


console.log(`Starting application in '${mode}' mode...`);

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

app.use(express.static(__dirname + '/public'));
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

// launch application
app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});
