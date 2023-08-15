import './resium.scss';

import * as Cesium from 'cesium';

import { Component, createRef } from 'react';
import { ImageryLayer, Viewer } from 'resium';
import { WritableAtom, useAtom } from 'jotai';
import {
	mapboxImageryProvider_infrared,
	mapboxImageryProvider_radar,
} from '../../utils/mapbox/imageryProviders';

import EllipseGraphicsEntity from './resiumEntities/ellipseGraphics/eliipseGraphicsEntity';
import { PointEntity } from '../../components/resium/resiumEntities';
import React from 'react';
import axios from 'axios';
import { fakeShipData } from '../../configs/fakeShipData';
import { imageryProviderAtom } from '../../store/imageryProviderLayersAtom';
import { isLeftSideDrawerOpenAtom } from '../../store/leftSideDrawerAtom';
import mapboxProviderViewModels from '../../utils/mapbox/providerViewModels';
import moment from 'moment';

const emptyCredits = document.createElement('div');
type Props = {
	leftSideDrawerIsOpen: boolean;
	isActive_infrared: boolean;
	isActive_radar: boolean;
};

type ResiumState = {
	cesiumRef: any;
	isLoading: boolean;
	items: any;
	xmin: number | undefined;
	xmax: number | undefined;
	ymin: number | undefined;
	ymax: number | undefined;
};

class ResiumComponent extends Component<Props, ResiumState> {
	constructor(props: any) {
		super(props);

		this.state = {
			cesiumRef: null,
			isLoading: true,
			items: new Array(),
			xmin: undefined,
			xmax: undefined,
			ymin: undefined,
			ymax: undefined,
		};

		this.clickMap = this.clickMap.bind(this);
	}

	componentDidMount() {
		this.setState({ cesiumRef: createRef() });

		setTimeout(() => {
			this.setState(
				this.state.cesiumRef.current.cesiumElement.scene.camera.flyTo({
					destination: Cesium.Cartesian3.fromDegrees(0.0, 0.0, 40000000),
					duration: 0,
				}),
			);
		}, 500);

		const xmin = '-82.880859';
		const ymin = '27.604454';
		const xmax = '-82.372742';
		const ymax = '27.953165';
		this.getData(xmin, ymin, xmax, ymax);
	}

	getLocationFromScreenXY = (x: number, y: number) => {
		const scene = this.state.cesiumRef.current?.cesiumElement?.scene;
		if (!scene) return;
		const ellipsoid = scene.globe.ellipsoid;
		const cartesian = scene.camera.pickEllipsoid(
			new Cesium.Cartesian2(x, y),
			ellipsoid,
		);
		if (!cartesian) return;
		const { latitude, longitude, height } =
			ellipsoid.cartesianToCartographic(cartesian);
		let lon = longitude * (180 / Math.PI);
		let lat = latitude * (180 / Math.PI);
		return { lat, lon, height };
	};

	async getData(xmin, ymin, xmax, ymax) {
		this.setState({ isLoading: true });
		const urlbase =
			'https://a569ed50236e64bfa972710bc3472a78-1954532563.us-gov-west-1.elb.amazonaws.com/mda-next/api/v1/streamio/messages/bbox';
		const date = moment().format('YYYY-MM-DD');
		const fullUrl = `${urlbase}?xmin=${xmin}&ymin=${ymin}&xmax=${xmax}&ymax=${ymax}&date=${date}`;

		console.log('API URL', fullUrl);
		var options = {
			method: 'GET',
			url: fullUrl,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		};
		try {
			const response = await axios.request<AxiosResponse>(options);
			console.log('RESPONSE API', response.data);
			this.setState({
				isLoading: false,
				items: response.data,
			});
		} catch (error) {
			console.log(error);
		}
	}

	clickMap = (object, entity) => {
		let coords = this.getLocationFromScreenXY(
			object.position.x,
			object.position.y,
		);
		console.log('coords', coords);

		this.setState(
			{
				items: this.state.items,
				xmin: coords!.lon,
				ymin: coords!.lat,
				xmax: coords!.lon + 0.4,
				ymax: coords!.lat + 0.4,
			},
			() => {
				this.getData(
					this.state.xmin,
					this.state.ymin,
					this.state.xmax,
					this.state.ymax,
				);
			},
		);
	};

	render() {
		console.log(this.state.items);

		const shipEntities = this.state.items.map((ship: any) => (
			<PointEntity
				key={ship.id}
				id={ship.id}
				name={ship.id}
				description={`vessel name: ${ship.id} <br/><br/> lat: ${ship.Latitude}, <br/> long: ${ship.Longitude}`}
				longitude={ship.Longitude}
				latitude={ship.Latitude}
				height={100}
				color={ship.color}
			/>
		));

		return (
			<Viewer
				key={'resium-map-viewer'}
				id="resium-map-viewer"
				// full={true}
				ref={this.state.cesiumRef}
				sceneMode={Cesium.SceneMode.SCENE2D}
				timeline={false}
				animation={false}
				navigationInstructionsInitiallyVisible={false}
				imageryProviderViewModels={mapboxProviderViewModels}
				creditContainer={emptyCredits}
				// baseLayerPicker={false}
				// dataSources={mapboxDataSources}
				onClick={this.clickMap}
				className={
					this.props.leftSideDrawerIsOpen
						? 'resium-viewer-open'
						: 'resium-viewer-closed'
				}
			>
				{/* <ImageryLayer
					imageryProvider={
						new ArcGisMapServerImageryProvider({
							url: '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
						})
					}
				></ImageryLayer> */}

				<ImageryLayer
					show={this.props.isActive_infrared}
					imageryProvider={mapboxImageryProvider_infrared}
				/>
				<ImageryLayer
					show={this.props.isActive_radar}
					imageryProvider={mapboxImageryProvider_radar}
				/>

				<EllipseGraphicsEntity
					id={'new-api-point'}
					name={'new API point'}
					description={'new API point description'}
					longitude={0}
					latitude={0}
				/>

				{shipEntities}

				{/* {fakeShipData.lines.map((shipLine: any) => (
					<PolylineGraphicsEntity
						key={shipLine.name}
						name={shipLine.name}
						description={`vessel name: ${
							shipLine.name
						} <br/><br/> ${shipLine.coordinates.join('<br/>,')}`}
						coordinates={shipLine.coordinates}
						width={2}
						color={shipLine.color}
					></PolylineGraphicsEntity>
				))} */}

				{/* {fakeShipData.ships.map((ship: any) => (
					<PointEntity
						key={ship.name}
						name={ship.name}
						description={`vessel name: ${ship.name} <br/><br/> lat: ${ship.latitude}, <br/> long: ${ship.longitude}`}
						longitude={ship.longitude}
						latitude={ship.latitude}
						height={100}
						color={ship.color}
					></PointEntity>
				))} */}
			</Viewer>
		);
	}
}

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
	const [isLeftSideDrawerOpen] = useAtom(isLeftSideDrawerOpenAtom);

	const [isActive_infrared] = useAtom(
		imageryProviderAtom.layers.find((l) => l.name === 'Infrared')
			?.layer as WritableAtom<boolean, unknown[], any>,
	);
	const [isActive_radar] = useAtom(
		imageryProviderAtom.layers.find((l) => l.name === 'Radar')
			?.layer as WritableAtom<boolean, unknown[], any>,
	);

	return (
		<ResiumComponent
			key={'resium-component'}
			isActive_infrared={isActive_infrared}
			isActive_radar={isActive_radar}
			leftSideDrawerIsOpen={isLeftSideDrawerOpen}
		/>
	);
};
