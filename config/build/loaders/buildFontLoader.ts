
export function buildFontLoader(isDev: boolean) {
  return  {
		test: /\.(woff|woff2|otf|eot|ttf|svg)$/i,
		type: 'asset/resource',
		generator: {
			filename: './fonts/[name]-[hash][ext]'
		}
	};
}