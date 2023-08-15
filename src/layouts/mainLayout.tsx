import BGWavesDark from '../assets/images/wave_background_dark.png';
import BGWavesLight from '../assets/images/wave_background_light.png';
import { Box } from '@mui/material';
import FooterComponent from '../layouts/footer/footer';
import { Outlet } from 'react-router-dom';
import React from 'react';
import TopNavigationComponent from '../layouts/topNavigation/topNavigation';
import themeModeAtom from '../../src/store/themeModeAtom';
import { useAtom } from 'jotai';

export default function MainLayoutComponent(props: any) {
	const [themeMode] = useAtom(themeModeAtom);

	return (
		<>
			<TopNavigationComponent title="MDA Header" subtitle="mda subtitle" />
			<Box id="main-layout-container">
				<Box
					id="outlet-wrapper"
					sx={{
						backgroundImage:
							themeMode === 'dark'
								? `url(${BGWavesDark})`
								: `url(${BGWavesLight})`,
					}}
				>
					<Outlet />
				</Box>
			</Box>
			<FooterComponent />
		</>
	);
}
