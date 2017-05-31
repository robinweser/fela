var path = require('path')
var webpack = require('webpack')

module.exports = {
  cache: true,
  entry: {
    app: './client.js'
  },
  output: {
    path: path.join(__dirname),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
}
