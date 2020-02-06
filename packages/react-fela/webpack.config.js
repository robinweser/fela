const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, './src'),
  entry: './index',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './umd'),
    libraryTarget: 'umd',
    library: 'ReactFela',
    umdNamedDefine: true,
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
          options: {
            presets: ['@babel/preset-flow'],
          },
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
  ],

  externals: {
    react: 'React',
  },
}
