/**
 * Created by scott on 2016/5/15.
 */

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const util = require('util')
const proxy = require('http-proxy-middleware')

const webpackConfig = require('./webpack.config.development')


const compiler = webpack(webpackConfig)

const server = new WebpackDevServer(compiler, webpackConfig.devServer)

server.use(proxy(['api'], {
	target: 'localhost',
	ws: true,
	changeOrigin: true,
	secure: false
}))


server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, function () {
	console.log('webpack-dev-server running...')
})
