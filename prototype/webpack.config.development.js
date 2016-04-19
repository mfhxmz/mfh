'use strict'
const webpack = require('webpack')
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SplitByPathPlugin = require('webpack-split-by-path')
const projectConf = require('./project-conf')


const webpackServerURL = 'http://localhost:8080'

let extractCSS = new ExtractTextPlugin('[contentHash:8].css')

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: [
			'babel-polyfill',
			'webpack-dev-server/client?' + webpackServerURL + '/',
			'webpack/hot/dev-server',
			'./app.js'
		]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: 'http://localhost:' + 3000 + '/',
		filename: '[name].js',
		devtoolModuleFilenameTemplate: function (info) {
			return "file:///" + info.absoluteResourcePath
		}
	},
	debug: true,
	devtool: 'source-map',
	devServer: {
		// Tell the webpack dev server from where to find the files to serve.
		contentBase: path.join(__dirname, 'dist'),
		colors: true,
		publicPath: webpackServerURL + '/',
		host: 'localhost',
		port: 8080,
		hot: true,
		stats: {
			assets: true,
			colors: true,
			version: true,
			hash: true,
			timings: true,
			chunks: false
		}
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				include: [
					path.resolve(__dirname, './src')
				],
				loaders: ['ng-annotate-loader', 'babel-loader'/*, 'eslint-loader'*/]
			},
			{
				test: /\.css$/,
				loader: extractCSS.extract(['css', 'postcss'])
			},
			{
				test: /\.scss$/,
				include: [
					path.resolve(__dirname, './src')
				],
				loaders: ['style', 'css?sourceMap', 'postcss', 'resolve-url', 'sass?sourceMap']
			},
			{
				test: /index\.html$/,
				include: [
					path.resolve(__dirname, './src')
				],
				loader: 'html?attrs=link:href img:src use:xlink:href'
			},
			{
				test: /\.html$/,
				exclude: /index\.html$/,
				include: [
					path.resolve(__dirname, './src')
				],
				// ng-cache can be reference later
				// ngtemplate?relativeTo=${path.resolve(__dirname, 'src/')}!  inconvenient for direct usage for require
				// run on use
				loader: `html?attrs=link:href img:src use:xlink:href`
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				include: [
					path.resolve(__dirname, './src')
				],
				loaders: [
					'file?name=[name].[ext]'
				]
			},
			{
				test: /\.ico$/,
				include: [
					path.resolve(__dirname, './src')
				],
				loader: 'file?name=[name].[ext]'
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery'
		}),
		new webpack.DefinePlugin(Object.assign({}, projectConf.globals, {
			__DEV__: true
		})),
		extractCSS,
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html'
		}),
		new SplitByPathPlugin([
			{
				name: 'vendor',
				path: path.join(__dirname, 'node_modules'),
				ignore: [
					path.join(__dirname, '/node_modules/css-loader'),
					path.join(__dirname, '/node_modules/style-loader'),
					/\.s?css/
				]
			}
		]),
		new BrowserSyncPlugin({
				host: 'localhost',
				port: 3000,
				proxy: webpackServerURL
			},
			{
				reload: false
			}),
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
		alias: {
			'blueimp-load-image': 'blueimp-load-image/js/load-image.js'
		}
	},
	node: {
		__dirname: true
	},
	eslint: {
		emitError: false,
		emitWarning: false,
		quiet: false,
		failOnWarning: false,
		failOnError: false
	},
	postcss: function () {
		return [
			require('autoprefixer')({
				browsers: [
					'last 2 versions',
					'> 1%',
					'not ie <= 8'
				],
				add: true
			}),
			require('postcss-normalize-charset')
		]
	}
}
