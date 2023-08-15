import '../utils/keyCommands';

import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StrictMode, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { escapeKey, rightSquareBracket } from '../utils/keyCommands';
import { getDesignTokens, getThemedComponents } from '../theme';

import AdminPage from '../pages/adminPage';
import { DevTools } from 'jotai-devtools';
import ErrorPage from '../pages/errorPage';
import MainLayoutComponent from '../layouts/mainLayout';
import MapPage from '../pages/mapPage';
import MessagesPage from '../pages/messagesPage';
import PortInformationPage from '../pages/portInformationPage';
import React from 'react';
import VesselInformationPage from '../pages/vesselInformationPage';
import { deepmerge } from '@mui/utils';
import themeModeAtom from '../store/themeModeAtom';
import { useAtom } from 'jotai';

export default function AppComponent() {
	const [themeMode] = useAtom(themeModeAtom);

	// * keyboard shortcuts
	escapeKey();
	rightSquareBracket();

	const appTheme = useMemo(
		() =>
			createTheme(
				deepmerge(getDesignTokens(themeMode), getThemedComponents(themeMode)),
			),
		[themeMode],
	);

	return (
		<React.Fragment key={'app-component'}>
			<Box>
				{/* <StrictMode> */}
				{/* <DevTools theme='dark' /> */}

				<BrowserRouter>
					<ThemeProvider theme={appTheme}>
						<CssBaseline />
						<Routes>
							<Route path="/mda-ui/" element={<MainLayoutComponent />}>
								<Route index element={<MapPage />} />
								<Route index path="/mda-ui/map/" element={<MapPage />} />
								<Route path="/mda-ui/messages/" element={<MessagesPage />} />
								<Route
									path="vessel-information/"
									element={<VesselInformationPage />}
								/>
								<Route
									path="/mda-ui/port-information/"
									element={<PortInformationPage />}
								/>
								<Route path="/mda-ui/admin/" element={<AdminPage />} />
								<Route path="*" element={<ErrorPage />} />
							</Route>
						</Routes>
					</ThemeProvider>
				</BrowserRouter>
				{/* </StrictMode> */}
			</Box>
		</React.Fragment>
	);
}
