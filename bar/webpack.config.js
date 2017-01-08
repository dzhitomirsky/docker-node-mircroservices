var path = require('path');
var webpack = require('webpack');
var PolyfillsPlugin = require('webpack-polyfills-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/client/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/',
    library: 'bar',
    libraryTarget: 'umd',
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    './cptable': 'var cptable',
    './jszip': 'jszip'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'polyfill-promise'
    }),
    new PolyfillsPlugin([
      'Object/assign',
      'requestAnimationFrame'
    ])
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.jsx', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-object-assign', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        include: /\.json$/,
        loaders: ["json-loader"]
      }
    ]
  },

  // Issue with joi package.
  // See https://github.com/request/request/issues/1529
  node: {
    net: 'empty',
    dns: 'empty',
    fs: "empty"
  }
};
