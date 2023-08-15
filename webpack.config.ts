// * The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
// const cesiumBuildSource = 'node_modules/cesium/Source';
// const cesiumWorkers = '../Build/Cesium/Workers';

import { BuildEnv, BuildPaths } from './config/build/types/config';

import { Configuration } from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import path from 'path';

export default (env: BuildEnv) => {
	const paths: BuildPaths = {
		build: path.resolve(__dirname, 'dist/mda-ui/'),
		cesiumBuildSource: path.resolve(
			__dirname,
			'node_modules/cesium/Build/Cesium',
		),
		cesiumSource: path.resolve(__dirname, cesiumSource),
		entry: path.resolve(__dirname, 'src', 'main.tsx'),
		favicon: path.resolve(__dirname, 'src', 'assets/images/favicon.png'),
		// html: path.resolve(__dirname, 'index.html'),
		html: path.join(path.resolve(__dirname, ''), 'index.html'),
		src: path.resolve(__dirname, 'src'),
		tsconfig: path.join(__dirname, 'tsconfig.json'),
		cesium: [
			// {
			// 	from: path.resolve(__dirname, cesiumSource, cesiumWorkers),
			// 	to: 'Workers',
			// },
			// { from: path.resolve(__dirname, cesiumSource, 'Assets'), to: 'Assets' },
			// { from: path.resolve(__dirname, cesiumSource, 'Widgets'), to: 'Widgets' },
			// {
			// 	from: path.resolve(__dirname, cesiumSource, 'ThirdParty'),
			// 	to: 'ThirdParty',
			// },
		],
	};

	const mode = env.mode || 'development';
	const PORT = env.port || 5173;
	const isDev = mode === 'development';

	const config: Configuration = buildWebpackConfig({
		mode,
		paths,
		isDev,
		port: PORT,
	});

	return config;
};
