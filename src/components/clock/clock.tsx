import React from 'react';
import Typography from '@mui/material/Typography';
import moment from 'moment';

type ClockProps = {
	format: string;
};

type ClockState = {
	datetime: string;
};

class ClockComponent extends React.Component<ClockProps, ClockState> {
	constructor(props: ClockProps) {
		super(props);
		this.state = {
			datetime: moment().utc().format(props.format),
		};
	}

	componentDidMount() {
		setInterval(() => {
			this.setState({
				datetime: moment().utc().format(this.props.format),
			});
		}, 1000);
	}

	render() {
		return (
			<Typography className="clock" variant="subtitle1" noWrap>
				{this.state.datetime} UTC
			</Typography>
		);
	}
}

export default ClockComponent;
