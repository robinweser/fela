const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const packageJson = require('./package.json')

const DASH = /-([a-z])/g

function getLibraryName(str) {
  return (
    str.charAt(0).toUpperCase() +
    str.substr(1).replace(DASH, (match) => match[1].toUpperCase())
  )
}

module.exports = {
  mode: 'production',
  entry: './index',
  context: path.resolve(__dirname, './src'),
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, './umd'),
    library: getLibraryName(packageJson.name),
  },

  externals: {
    fela: 'Fela',
    react: 'React',
  },

  resolve: {
    extensions: ['.json', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [new CleanWebpackPlugin()],
}
