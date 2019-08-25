import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
	root: {
		width: '100%',
		overflowX: 'auto',
		marginBottom: 20
	},
	table: {
		minWidth: 700,
	},
};

class MapTable extends Component {

	handleClick = (session_id) => {
		fetch(`http://localhost:1337/api/v0/locations/${session_id}`, {
            accept: "application/json",
            mode: "cors"
		}).then(i => {
			if(!i) {
				throw Error('Not found')
			}
			return i.json();
		})
		.then(json => {
			return (json.data[0].path)
		})
		.then(geoJson => {
			// Update the Map
			this.props.onSessionSelectionChange(geoJson)
			console.log(geoJson)
		}).catch(error => {
			console.log(error)
		})
	}

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell key="session" align="right">Session</TableCell>
							<TableCell key="start" align="right">Start</TableCell>
							<TableCell key="end" align="right">End</TableCell>
                            <TableCell key="date" align="right">Date</TableCell>
							<TableCell key="path" align="right">Path Available</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.data.map(n => (
							<TableRow key={n.session_id} onClick={(session_id) => this.handleClick(n.session_id)}>
								<TableCell align="right">{n.session_id}</TableCell>
								<TableCell align="right">{n.start_loc}</TableCell>
								<TableCell align="right">{n.end_loc}</TableCell>
                                <TableCell align="right">{n.start_time}</TableCell>
								<TableCell align="right">{
									n.locations !== null ? n.locations.path !== null || n.locations.path !== '' ? 'Available' : 'Not available' : 'Not available'
								}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		)
	}
}

MapTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapTable);