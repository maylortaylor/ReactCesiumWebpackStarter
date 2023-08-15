import * as Cesium from 'cesium';
import * as React from 'react';

import {
	CartesianArgs,
	MainEntityArgs,
	ModelGraphicsArgs,
} from '../../resiumEntities';
import { EllipseGraphics, Entity } from 'resium';

import { customCesiumColor } from '../../../../../src/theme';

type CombinedArgs = MainEntityArgs & CartesianArgs & ModelGraphicsArgs;

const EllipseGraphicsEntity: React.FunctionComponent<CombinedArgs> = (args) => {
	const {
		id,
		name,
		description,
		longitude,
		latitude,
		height,
		ellipsoid,
		result,
		color = Cesium.Color.fromCssColorString(
			customCesiumColor.pointEntityColors.red,
		),
	} = args;

	return (
		<React.Fragment>
			<Entity
				id={id}
				name={name}
				description={description}
				point={{ color: color }}
				position={Cesium.Cartesian3.fromDegrees(
					longitude,
					latitude,
					height,
					ellipsoid,
					result,
				)}
			>
				<EllipseGraphics fill={true} />
			</Entity>
		</React.Fragment>
	);
};

export default EllipseGraphicsEntity;
