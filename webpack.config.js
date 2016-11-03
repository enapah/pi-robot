var path = require("path");

module.exports = {
	entry: {
		app: [
			'./client/index.js'
		]
	},
	output: {
		path: path.resolve(__dirname + '/dist'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.(css|scss)$/,
				loaders: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: 'file?name=[name].[ext]'
			},
			{
				test: /\.elm$/,
				exclude: [/elm-stuff/, /node_modules/],
				loader: 'elm-webpack'
			}
		],
		noParse: /\.elm$/
	},
	devServer: {
		inline: true,
		stats: {
			colors: true
		},
		host: '0.0.0.0',
		noInfo: true,
		public: true,
		open: true
	}
};