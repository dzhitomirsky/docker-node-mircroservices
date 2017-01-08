"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const getAvailableServiceNames = require('./utils/serviceDiscovery').getAvailableServiceNames;
const APPLICATION_NAME = process.env.APPLICATION_NAME || 'root';

const app = express();
const mode = process.env.NODE_ENV || 'development';
const port = process.env.PORT ? process.env.PORT : 3001;
const host = process.env.HOST ? process.env.HOST : 'localhost';

const webpackConfig = require('../../webpack.config.js');
const compiler = webpack([webpackConfig]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const exphbs = require('express-handlebars');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + '/templates'));
app.use(express.static(__dirname + '/public'));
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));
app.get('/', (req, res) => {
  getAvailableServiceNames().then((serviceNames) => {
    let externalHost = req.get('X-Forwarded-Host') || req.get('Host');
    res.render('index', {
      availableServices: _.map(serviceNames, (serviceName) => {
        return {
          name: serviceName,
          location: `${req.protocol}://${externalHost}/${serviceName}`,
          currentApplication: serviceName === APPLICATION_NAME
        }
      }),
      helpers: {
        json: (value) => {
          return JSON.stringify(value);
        }
      }
    });
  });
});

// launch application
app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});
