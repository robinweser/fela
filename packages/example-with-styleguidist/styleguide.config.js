const loaders = require('loaders')
const webpack = require('webpack')
const path = require('path')

module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	template: 'src/common/index.html',
	styleguideComponents: {
		Wrapper: path.join(__dirname, 'src/common/Provider')
	},
	webpackConfig: {
		module: {
			loaders: loaders.all
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

