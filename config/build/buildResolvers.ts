import { BuildOptions } from './types/config';
import { ResolveOptions } from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
    alias: {
			// * CesiumJS module name
			// * "node_modules/cesium/Source"
			// cesium: options.paths.cesiumSource,
			// '@/*': options.paths.src,
		},
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
		fallback: {
			// assert: require.resolve('assert/'),
			// buffer: require.resolve('buffer/'),
			// http: require.resolve('stream-http'),
			// https: require.resolve('https-browserify'),
			// stream: require.resolve('stream-browserify'),
			// url: require.resolve('url/'),
			// zlib: require.resolve('browserify-zlib'),
			https: false,
			zlib: false,
			http: false,
			url: false,
		},
    mainFields: ['module', 'main'],
    mainFiles: ['index', 'Cesium'],
    // modules: [__dirname, 'node_modules'],
		// preferAbsolute: true,
		// symlinks: true
		plugins: [
			new TsconfigPathsPlugin({
				configFile: options.paths.tsconfig,
				// baseUrl: options.paths.src,
				// logLevel: 'INFO',
        // extensions: ['.ts', '.tsx'],
        // mainFields: ['browser', 'main'],
        // references: ["../example/tsconfig.json"]
			}),
		],
  };
}