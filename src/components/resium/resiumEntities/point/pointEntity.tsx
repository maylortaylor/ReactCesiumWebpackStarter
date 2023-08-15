import * as Cesium from 'cesium';
import * as React from 'react';

import {
	CartesianArgs,
	MainEntityArgs,
} from '../../../../components/resium/resiumEntities';
import { Entity, PointPrimitive, PointPrimitiveCollection } from 'resium';

import { customCesiumColor } from '../../../../../src/theme';

type CombinedArgs = MainEntityArgs & CartesianArgs;

const PointEntity: React.FunctionComponent<CombinedArgs> = (args) => {
	const {
		id,
		name,
		description,
		longitude,
		latitude,
		height = 100,
		ellipsoid,
		result,
		pixelSize = 7,
		color = Cesium.Color.fromCssColorString(
			customCesiumColor.pointEntityColors.orange,
		),
	} = args;

	return (
		<React.Fragment>
			{/* <Entity
				key={id}
				id={id}
				name={name}
				description={description}
				position={Cesium.Cartesian3.fromDegrees(
					longitude,
					latitude,
					height,
					ellipsoid,
					result,
				)}
				point={{ pixelSize: pixelSize, color: color }}
			/> */}
			<PointPrimitiveCollection>
				<PointPrimitive
					key={id}
					id={id}
					position={Cesium.Cartesian3.fromDegrees(
						longitude,
						latitude,
						height,
						ellipsoid,
						result,
					)}
					pixelSize={pixelSize}
					color={color}
					// name={name}
					// description={description}
				/>
			</PointPrimitiveCollection>
		</React.Fragment>
	);
};

export default PointEntity;
