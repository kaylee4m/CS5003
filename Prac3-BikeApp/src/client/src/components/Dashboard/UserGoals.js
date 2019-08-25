import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import GoalForm from "./GoalForm";
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
	fab: {
		margin: theme.spacing.unit * 2,
	},
	absolute: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 3,
	},
	completed: {
		backgroundColor: 'lightgreen',
	},
	incomplete: {
		backgroundColor: 'pink',
	}
});

class UserGoals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}
	// Handle session form open
	handleOpen = () => {
		this.setState({ open: true });
	};

	// Handle session form close
	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		return (
			<main>
				<Typography variant="h4" gutterBottom component="h2">
					My Goals
					</Typography>
				<Paper className={classes.root}>

					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell key="avgSpeed" align="right">Goal ID</TableCell>
								<TableCell key="distance" align="right">Distance</TableCell>
								<TableCell key="date" align="right">Date</TableCell>
								<TableCell key="location" align="right">Location</TableCell>
								<TableCell key="completed" align="right">Completed</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.props.data.map(n => (
								<TableRow className={n.completed === 1 ? classes.completed : classes.incomplete} key={n.goals_id}>
									<TableCell align="right">{n.goal_id}</TableCell>
									<TableCell align="right">{n.distance}</TableCell>
									<TableCell align="right">{n.date}</TableCell>
									<TableCell align="right">{n.location}</TableCell>
									<TableCell align="right">{n.completed === 1 ? 'Yes' : 'No'}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					<Tooltip title="Add" aria-label="Add">

						<Fab color="secondary" className={classes.absolute}>
							<Button onClick={this.handleOpen}><AddIcon /></Button>
						</Fab>
					</Tooltip>
					<Modal
						open={this.state.open}
						onClose={this.handleClose}
						handleFormSubmission={this.handleClose}
					>
						<GoalForm user_id={this.props.id}/>
					</Modal>
				</Paper>
			</main>

		)
	}
}

UserGoals.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserGoals);