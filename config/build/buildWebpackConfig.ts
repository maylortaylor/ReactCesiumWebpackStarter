import { BuildOptions } from './types/config';
import { Configuration } from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import path from 'path';

export function buildWebpackConfig(options: BuildOptions): Configuration {
  const { mode, paths, isDev } = options;
  return {
		amd: {
			// * Enable webpack-friendly use of require in Cesium
			toUrlUndefined: true
		},
		// * The base directory (absolute path!) for resolving the entry option.
		context: __dirname,
		// * Where webpack looks to start building the bundle and include polyfill
    entry: {
			// * [name] === main
			main: paths.entry
		},
		externals: {
			cesium: 'Cesium'
		},
		// * Control how source maps are generated
		devtool: isDev ? 'inline-source-map' : 'source-map',
		// devtool: 'eval',
		// * Spin up a server for quick development
		devServer: isDev ? buildDevServer(options) : undefined,
		// * Set the mode to development or production
		mode: mode,
		// * Determine how modules within the project are treated
		module: {
			rules: buildLoaders(options),
			// generator: {
			// 	asset: {
			// 		// Generator options for asset modules
			// 		// Customize publicPath for asset modules, available since webpack 5.28.0
			// 		publicPath: 'https://cdn/assets/',
			// 		// Emit the asset in the specified folder relative to 'output.path', available since webpack 5.67.0
			// 		outputPath: 'cdn-assets/',
			// 	},
			// 	'asset/inline': {
			// 		// Generator options for asset/inline modules
			// 	},
			// 	'asset/resource': {
			// 		// Generator options for asset/resource modules
			// 		// Customize publicPath for asset/resource modules, available since webpack 5.28.0
			// 		publicPath: 'https://cdn/assets/',
			// 		// Emit the asset in the specified folder relative to 'output.path', available since webpack 5.67.0
			// 		outputPath: 'cdn-assets/',
			// 	},
			// }
		},
		node: {
			global: false,
			__filename: false,
			__dirname: false
		},
		// * Where webpack outputs the assets and bundles
		output: {
			// filename: '[name].[contenthash].js',
			filename: '[name].js',
			// chunkFilename: '[name].chunk.js',
			path: paths.build,
			// * tells webpack which URL to use in order to load all the generated files in the browser
			// publicPath: '/mda-ui/',
			// publicPath: 'auto',
			publicPath: '/',
			clean: false,
			// * Needed to compile multiline strings in Cesium
			sourcePrefix: '',
		},
		// optimization: {
		// 	splitChunks: {
		// 		chunks: 'all'
		// 	}
		// },
		// * Customize the webpack build process
    plugins: buildPlugins(options),
		// performance: {
		// 	maxEntrypointSize: Infinity,
		// 	maxAssetSize: 1024 ** 2,
		// 	hints: false
		// },
    resolve: buildResolvers(options),
		// * ENABLE "target: 'web'"  for use Hot Reload / HMR in Crome ( not in IE 11 )
		// * DISABLE ['web', 'es5'] for use IE 11 during testing => Hot Reload / HMR will stop working in Chrome due to a bug in Webpack 5
		// target: ['web', 'node', 'es5'],
		target: isDev ? 'web' : 'browserslist'
  };
}