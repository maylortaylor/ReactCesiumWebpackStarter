

export function buildImageLoader(isDev: boolean) {
  return  {
		test: /\.(ico|png|jpg|jpeg|gif|svg)$/i,
		type: 'asset/resource',
		generator: {
			filename: './images/[name]-[hash][ext][query]'
		},
		// parser: {
		// 	dataUrlCondition: {
		// 		maxSize: 30 * 1024
		// 	}
		// }
	};
}