const path = require('path')
const merge = require('webpack-merge')
const common = require('../../webpack.umd.js')

module.exports = merge(common, {
  context: path.resolve(__dirname, './src'),
  output: {
    path: path.resolve(__dirname, './umd'),
    library: 'FelaDOM',
  },

  externals: {
    fela: 'Fela',
  },
})
