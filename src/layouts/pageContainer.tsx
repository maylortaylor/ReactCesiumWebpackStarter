import { Container } from '@mui/material';
import React from 'react';

export default function PageContainerComponent(props: any) {
	return (
		<Container
			id="page-container"
			sx={{
				maxWidth: {
					xs: '84%',
					sm: '86%',
					md: '90%',
					lg: '93%',
				},
				marginRight: {
					xs: '15px',
				},
			}}
			disableGutters
		>
			{props.children}
		</Container>
	);
}
