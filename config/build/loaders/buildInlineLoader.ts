export function buildInlineLoader(isDev: boolean) {
  return {
		test: /\.(xml|json)$/i,
		type: 'asset/inline',
	};
}