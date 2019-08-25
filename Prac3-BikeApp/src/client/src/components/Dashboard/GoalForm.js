import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ApiWrapper from '../Wrapper';

const GOAL_ENDPOINT = `http://localhost:1337/api/v0/goals`;

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		background: '#fff',
		width: '40%',
		margin: '100px auto 0 auto',
		padding: 20,
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 400,
	},
	menu: {
		width: 200,
	},
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

class GoalForm extends Component {

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleSubmit = () => {
		const data = {
			user_id: this.props.user_id,
			date: this.state.date,
			distance: this.state.distance,
			location: this.state.location,
			completed: false
		}

		ApiWrapper.postUserGoal(GOAL_ENDPOINT, data)
	}

	render() {
		const { classes } = this.props;

		return (
			<form action="" className={classes.container} autoComplete="off">
				<h3>New goal</h3>
				<TextField
					id="goaldate"
					label="Date"
					type="date"
					className={classes.textField}
					onChange={this.handleChange('date')}
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>

				<TextField
					id="goalLocation"
					label="Location"
					className={classes.textField}
					onChange={this.handleChange('location')}
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>

				<TextField
					id="goaldistance"
					label="Distance"
					className={classes.textField}
					onChange={this.handleChange('distance')}
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>

				<div>
					<Button variant="contained" onClick={this.handleSubmit} color="primary" className={classes.button}>
						Submit
					</Button>
				</div>

			</form>

		);
	}
}

GoalForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GoalForm);