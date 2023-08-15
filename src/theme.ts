import { cyan, green, orange, red } from '@mui/material/colors';

export const customCesiumColor = {
	pointEntityColors: {
		green: '#66BB6A',
		orange: '#FF9800',
		red: '#EF5350',
		yellow: '#FFEE58',
	},
	polylineColors: {
		green: '#66BB6A',
		grey: '#90A4AE',
		red: '#EF5350',
		purple: '#9575CD',
		yellow: '#FFEE58',
	},
};
const palette = {
	light: {
		primary: {
			main: '#4F6EA1',
			light: '#7790BF',
			dark: '#1F3E74',
			contrastText: '#fff',
		},
		secondary: {
			main: '#87F5FB',
			light: '#516E9F',
			dark: '#051B42',
			contrastText: '#000',
		},
		background: {
			default: '#F2F2F2',
			paper: '#FEFDFA',
			// paper: '#FFFAFA',
			// paper: '#F8F8F8',
			// paper: '#FEFEFA',
			// paper: '#EFEFEF',
		},
		text: {
			primary: '#FCF8F2',
			secondary: '#000',
		},
		accent: {
			info: cyan[400],
			success: green[500],
			warning: orange[500],
			error: red[600],
		},
	},
	dark: {
		primary: {
			main: '#323432',
			light: '#5B5F5B',
			dark: '#090F09',
			contrastText: '#000',
		},
		background: {
			default: '#686467',
			paper: '#484347',
		},
		text: {
			primary: '#FCF8F2',
			secondary: '#FFFFFF',
		},
		accent: {
			info: cyan[700],
			success: green[700],
			warning: orange[700],
			error: red[900],
		},
	},
};

export const getDesignTokens = (mode: any) => ({
	breakpoints: {
		values: {
			xs: 0, // mobile
			sm: 600, // tablet
			md: 900, // laptop
			lg: 1200, // desktop
			xl: 1536, // large desktop
		},
	},
	typography: {
		fontFamily: ['Lato', 'Arial', 'sans-serif'].join(','),
		body1: {
			fontFamily: 'Lato, Arial, sans-serif',
		},
	},
	palette: {
		mode,
		...(mode === 'light'
			? {
					// LIGHT MODE COLOR PALETTE
					primary: {
						main: palette.light.primary.main,
						light: palette.light.primary.light,
						dark: palette.light.primary.dark,
						contrastText: palette.light.primary.contrastText,
					},
					background: {
						default: palette.light.background.default,
						paper: palette.light.background.paper,
					},
					text: {
						primary: palette.light.text.primary,
						secondary: palette.light.text.secondary,
					},
					info: {
						main: palette.light.accent.info,
					},
					success: {
						main: palette.light.accent.success,
					},
					warning: {
						main: palette.light.accent.warning,
					},
					error: {
						main: palette.light.accent.error,
					},
			  }
			: {
					// DARK MODE COLOR PALETTE
					primary: {
						main: palette.dark.primary.main,
						light: palette.dark.primary.light,
						dark: palette.dark.primary.dark,
						contrastText: palette.dark.primary.contrastText,
					},
					background: {
						default: palette.dark.background.default,
						paper: palette.dark.background.paper,
					},
					text: {
						primary: palette.dark.text.primary,
						secondary: palette.dark.text.secondary,
					},
					info: {
						main: palette.dark.accent.info,
					},
					success: {
						main: palette.dark.accent.success,
					},
					warning: {
						main: palette.dark.accent.warning,
					},
					error: {
						main: palette.dark.accent.error,
					},
			  }),
	},
});

export const getThemedComponents = (mode: any) => ({
	components: {
		...(mode === 'light'
			? {
					// LIGHT MODE THEME COMPONENTS
					MuiListItemText: {
						styleOverrides: {
							primary: {
								fontSize: '1rem',
								color: palette.light.text.secondary,
							},
							secondary: {
								fontSize: '0.8rem',
								color: palette.light.text.secondary,
							},
						},
					},
					MuiPagination: {
						styleOverrides: {
							root: {
								button: {
									color: palette.light.text.secondary,
									'&.Mui-selected': {
										backgroundColor: palette.light.primary.main,
										'&:hover': {
											backgroundColor: palette.light.accent.info,
										},
									},
									'&:hover': {
										backgroundColor: palette.light.accent.info,
									},
								},
							},
						},
					},
					MuiTablePagination: {
						styleOverrides: {
							root: {
								color: palette.light.text.secondary,
							},
						},
					},
					MuiList: {
						styleOverrides: {
							root: {
								color: palette.light.text.secondary,
							},
						},
					},
					MuiTypography: {
						styleOverrides: {
							root: {
								color: palette.light.text.secondary,
							},
						},
					},
					// MuiButton: {
					// 	styleOverrides: {
					// 		root: {
					// 			borderRadius: 0,
					// 			color: common.white,
					// 			fontFamily:
					// 				"Lato, Arial, sans-serif",
					// 			fontSize: 20,
					// 			borderWidth: 2,
					// 			'&:hover': {
					// 				borderWidth: 2,
					// 			},
					// 		},
					// 	},
					// 	variants: [
					// 		{
					// 			props: { variant: 'contained' },
					// 			style: {
					// 				fontFamily:
					// 					"Lato, Arial, sans-serif",
					// 			},
					// 		},
					// 		{
					// 			props: { variant: 'outlined' },
					// 			style: {
					// 				color: palette.light.primary.main,
					// 			},
					// 		},
					// 		{
					// 			props: { variant: 'primary', color: 'primary' },
					// 			style: {
					// 				border: '4px dashed blue',
					// 			},
					// 		},
					// 	],
					// },
			  }
			: {
					// DARK MODE THEME COMPONENTS
					MuiListItemText: {
						styleOverrides: {
							primary: {
								fontSize: '1rem',
								color: palette.dark.text.primary,
							},
							secondary: {
								fontSize: '0.8rem',
								color: palette.dark.text.primary,
							},
						},
					},
					MuiPagination: {
						styleOverrides: {
							root: {
								button: {
									color: palette.dark.text.secondary,
									'&.Mui-selected': {
										backgroundColor: palette.dark.primary.light,
										'&:hover': {
											backgroundColor: palette.dark.accent.info,
										},
									},
									'&:hover': {
										backgroundColor: palette.dark.accent.info,
									},
								},
							},
						},
					},
			  }),
	},
});
