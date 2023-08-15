export type BuildMode = 'development' | 'production';

export type BuildPaths = {
  build: string,
	cesium: Array<CesiumConfig>,
	cesiumBuildSource: string,
	cesiumSource: string,
  entry: string,
	favicon: string,
  html: string,
  src: string,
	tsconfig: string,
}

type CesiumConfig = {
	from: string,
	to: string,
}
export type BuildEnv = {
  mode: BuildMode,
  port: number,
}

export type BuildOptions = {
  isDev: boolean,
  mode: BuildMode,
  paths: BuildPaths,
  port: number,
}