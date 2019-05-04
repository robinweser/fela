const webpack = require('webpack')
const path = require('path')

module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	styleguideComponents: {
		Wrapper: path.join(__dirname, 'src/common/Provider')
	},
	webpackConfig: {
		module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
      ],
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('development')
				},
				__SERVER__: false,
				__CLIENT__: true,
				__STATISTICS__: false
			})
		]
	}
}

