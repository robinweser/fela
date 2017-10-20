const path = require('path')

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
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [['es2015', { modules: false }]],
          plugins: ['inferno']
        }
      }
    ]
  }
}
