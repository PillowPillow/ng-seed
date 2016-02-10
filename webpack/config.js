var webpackMerge = require('webpack-merge');
var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');

var projectdir = path.join(__dirname, '..'),
	webdir = path.join(projectdir, '/web'),
	moddir = path.join(webdir, '/modules'),
	stldir = path.join(webdir, '/styles'),
	hlpdir = path.join(webdir, '/helpers'),
	npmdir = path.join(projectdir, 'node_modules');

var common = {
	resolve: {
		extensions: ['', '.js', '.json']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel?experimental&optional=es7',
				exclude: [npmdir]
			}
		]
	}
};

var client = {
	target: 'web',
	entry: projectdir + '/web/app',
	output: {
		path: projectdir + '/.tmp/web'
	},
	module: {
		loaders: [
			{test: /\.css/, loader: 'style!css'},
			{
				test: /\.scss$/,
				loader: 'style!css!resolve-url!sass?outputStyle=expanded&includePaths[]=../node_modules/bourbon/app/assets/stylesheets/'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.css', '.scss', '.json'],
		alias: {
			md: moddir,
			stl: stldir,
			hlp: hlpdir,
			npm: npmdir
		}
	},
	plugins: [
		new LiveReloadPlugin()
	]
};

var server = {
	target: 'node',
	entry: projectdir + '/app/app',
	output: {
		path: projectdir + '/.tmp/server'
	},
	externals: function checkNodeImport(context, request, cb) {
		if(!path.isAbsolute(request) && request.charAt(0) !== '.') {
			cb(null, 'commonjs ' + request);
			return;
		}
		cb();
	},
	node: {
		global: true,
		__dirname: true,
		__filename: true,
		process: true,
		Buffer: true
	}
};

var defaults = {
	context: projectdir,
	resolve: {
		root: projectdir
	},
	output: {
		publicPath: path.resolve(__dirname),
		filename: 'bundle.js'
	}
}

module.exports = [
	// Client
	webpackMerge({}, defaults, common, client),

	// Server
	webpackMerge({}, defaults, common, server)
]
