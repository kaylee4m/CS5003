import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import getAverageSpeed from '../../helpers/avgSpeed'

const styles = {
	root: {
		width: '100%',
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
};

class SessionsTable extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Session</TableCell>
							<TableCell key="distance" align="right">Distance</TableCell>
							<TableCell key="sTime" align="right">Start Time</TableCell>
							<TableCell key="eTime" align="right">End Time</TableCell>
							<TableCell key="raceType" align="right">Type of Race</TableCell>
							<TableCell key="avgSpeedmain" align="right">Average Speed (km/h)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.items.map((n, k) => (
							<TableRow key={`item-${k}`}>
								<TableCell component="th" scope="row">
									{n.session_id}
								</TableCell>
								<TableCell align="right">{n.distance}</TableCell>
								<TableCell align="right">{n.start_time}</TableCell>
								<TableCell align="right">{n.end_time}</TableCell>
								<TableCell align="right">{n.type}</TableCell>
								<TableCell align="right">{getAverageSpeed(n.start_time, n.end_time, n.distance)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		)
	}
}

SessionsTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SessionsTable);