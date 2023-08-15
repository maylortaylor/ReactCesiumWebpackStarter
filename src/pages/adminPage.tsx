import { Container, Typography } from '@mui/material';

import DataTableComponent from '../components/dataTable/dataTable';
import PageContainerComponent from '../../src/layouts/pageContainer';
import React from 'react';

class AdminPage extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<PageContainerComponent>
				<Typography
					variant="h1"
					sx={{
						textAlign: 'center',
					}}
				>
					Admin
				</Typography>
				<DataTableComponent format={''} />
			</PageContainerComponent>
		);
	}
}

export default AdminPage;
