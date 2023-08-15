import { BuildOptions } from './types/config';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
		host: 'localhost',
    port: options.port,
		// static: './dist',
		watchFiles: ['src/**/*'],
    open: {
			target: '/mda-ui/',
			app: {
				name: 'chrome'
			}
		},
		devMiddleware: {
			writeToDisk: true
		},
		allowedHosts: 'all',
		// * Telling the server to fallback to index.html if the route is not found at the backend server
    historyApiFallback: true,
		https: true,
		hot: true,
		compress: false,
  };
}