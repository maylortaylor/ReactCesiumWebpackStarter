
export function buildTypescriptLoader(isDev: boolean) {
  return {
    test: /\.tsx?$/i,
    use: {
			loader: 'ts-loader',
			options: {
				onlyCompileBundledFiles: true,
				transpileOnly: true
			}
		},
    exclude: /node_modules/,
  };
}