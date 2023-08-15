import { BuildOptions } from './types/config';
import { RuleSetRule } from 'webpack';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildFontLoader } from './loaders/buildFontLoader';
import { buildImageLoader } from './loaders/buildImageLoader';
import { buildInlineLoader } from './loaders/buildInlineLoader';
import { buildTypescriptLoader } from './loaders/buildTypescriptLoader';

export function buildLoaders({ isDev, paths }: BuildOptions): RuleSetRule[] {

	// * https://www.npmjs.com/package/babel-loader
	// * JavaScript: Use Babel to transpile JavaScript files
  const babelLoader = buildBabelLoader(isDev);

	// * Styles: Inject CSS into the head with source maps
  const cssLoader = buildCssLoader(isDev);

	// * Images: Copy image files to build folder
  const imageLoader = buildImageLoader(isDev);

	// * exports a data URI of the asset. Previously achievable by using url-loader
	const inlineLoader = buildInlineLoader(isDev);

	// * Woff | TTF | EOT | OTF files: emits a separate file and exports the URL. Previously achievable by using file-loader
	const fontLoader = buildFontLoader(isDev);

	// * https://www.npmjs.com/package/ts-loader
  const typeScriptLoader = buildTypescriptLoader(isDev);

  return [
		babelLoader,
    cssLoader,
    imageLoader,
		inlineLoader,
		fontLoader,
    typeScriptLoader,
  ];
}