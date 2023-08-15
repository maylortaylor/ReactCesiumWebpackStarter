
export function buildBabelLoader(isDev: boolean) {
  return {
    test: /\.(js|jsx|ts|tsx)$/i,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
				sourceType: 'unambiguous',
				plugins: isDev ? ['react-refresh/babel'] : [],
        presets: [
					[
						'@babel/preset-env',
						{
							targets: {
								browsers: ['> .5% or last 3 versions, not IE <= 11'],
							},
							loose: false,
							modules: false,
						},
					],
					['@babel/preset-react', { runtime: 'automatic' }],
					'@babel/preset-typescript',
				],
      },
    },
  };
}