var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/main'
    // 'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      path: './src',
      filename: 'bundle.js',
      library: 'main'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, './src')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
    ]
  },
  devServer: {
    contentBase: "./src"
  }
};
