import { DefinePlugin, HotModuleReplacementPlugin, ProgressPlugin, WebpackPluginInstance } from 'webpack';

import { BuildOptions } from './types/config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlTagsPlugin from 'html-webpack-tags-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

// import fs, { PathLike } from 'fs';


// const htmlFiles: Array<string> = [];
// const directories = ['src'];
// while (directories.length > 0) {
//     const directory = directories.pop() ;
//     const dirContents = fs.readdirSync(directory as PathLike)
//         .map(file => path.join(directory as string, file));

//     htmlFiles.push(...dirContents.filter(file => file.endsWith('.html')));
//     directories.push(...dirContents.filter(file => fs.statSync(file).isDirectory()));
// }

export function buildPlugins({ paths, isDev }: BuildOptions): WebpackPluginInstance[] {
  const plugins = [
		// * Removes/cleans build folders and unused assets when rebuilding
		new CleanWebpackPlugin({
			// * Automatically remove all unused webpack assets on rebuild
			cleanStaleWebpackAssets: true,
			// * Do not allow removal of current webpack assets
			protectWebpackAssets: true,
		}),
		// * Copies files from target to destination folder
		new CopyWebpackPlugin({
			patterns: [
					{
						from: paths.cesiumBuildSource,
						to: 'cesium',
					},
					// TODO: Dont like using array numbers here -- need to find a better way
					// { from: paths.cesium[0].from, to: paths.cesium[0].to },
					// { from: paths.cesium[1].from, to: paths.cesium[1].to },
					// { from: paths.cesium[2].from, to: paths.cesium[2].to },
					// { from: paths.cesium[3].from, to: paths.cesium[3].to },
			]
		}),
		new DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
			// * Define relative base path in cesium for loading assets
			CESIUM_BASE_URL: JSON.stringify('/cesium')
    }),
		// * Generates an HTML file from a template
		new HtmlWebpackPlugin({
				template: paths.html,
				favicon: paths.favicon
			}),
		// ...htmlFiles.map(htmlFile =>
		// 	new HtmlWebpackPlugin({
		// 			template: htmlFile,
		// 			filename: htmlFile.replace(path.normalize("src/"), ""),
		// 			inject: false
		// 	})
		// ),
		// * Add cesium css and js to index.html on webpack build
		new HtmlTagsPlugin({
			append: false,
			tags: ['cesium/Widgets/widgets.css', 'cesium/Cesium.js'],
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
		// * Progress provides a way to customize how progress is reported during a compilation
		// new ProgressPlugin(),
		// * Terser minify/minimize your JavaScrip
		// new TerserPlugin(),
		// ? DEV MODE ONLY
		// * Use HotModuleReplacementPlugin & ReactRefreshWebpackPlugin in Dev mode
		...(isDev ? [
			new HotModuleReplacementPlugin(),
			new ReactRefreshWebpackPlugin(),
		] : []),
  ];

  return plugins;
}