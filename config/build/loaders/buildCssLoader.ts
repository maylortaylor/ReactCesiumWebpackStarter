import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildCssLoader(isDev: boolean) {
  return {
		test: /\.(sa|sc|c)ss$/i,
		// type: 'asset/resource',
		use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
		// use: ["style-loader", "css-loader", "sass-loader"]
    // use: [
    //   isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    //   {
    //     loader: 'css-loader',
    //     options: {
    //       modules: {
    //         auto: (resPath: string) => Boolean(resPath.includes('.module.')),
    //         localIdentName: isDev
    //           ? '[path][name]__[local]'
    //           : '[hash:base64:8]',
    //       },
    //     },
    //   },
    //   'sass-loader',
    // ],
  };
}