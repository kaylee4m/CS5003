import { withStyles } from '@material-ui/core/styles';
import ApiWrapper from '../Wrapper';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';

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
		marginTop: '30px'
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

const typeOfRace = [
	{
		type_id: 0,
		value: 'Road bicycle',
	},
	{
		type_id: 1,
		value: 'Tracking cycling',
	},
	{
		type_id: 2,
		value: 'Cyclo-cross',
	},
	{
		type_id: 3,
		value: 'Mountain bike',
	},
	{
		type_id: 4,
		value: 'BMX',
	},
	{
		type_id: 5,
		value: 'Cycle speedway',
	},
	{
		type_id: 6,
		value: 'Motor-paced racing',
	},
	{
		type_id: 7,
		value: 'Average speeds',
	},
	{
		type_id: 8,
		value: 'Casual',
	},
];

class SessionForm extends React.Component {
	state = {
		typeOfRace: 'BMX',
		distance: '',
		startLocation: '',
		endLocation: '',
		startTime: '',
		endTime: '',
		geojson:'',
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleFileRead = (e) => {
		const content = e.target.result;
		this.setState({
			geojson: content
		})

		console.log(this.state.geojson)
	}

	handleFileSubmit = (file) => {
		const reader = new FileReader();
		reader.onloadend = this.handleFileRead;
		reader.readAsText(file)
	}

	handleSubmit = () => {
		const data = {
			user_id: this.props.id,
			distance: this.state.distance,
			start_time: this.state.startTime,
			end_time: this.state.endTime,
			start_loc: this.state.startLocation,
			end_loc: this.state.endLocation,
			type: this.state.typeOfRace,
			geojson: this.state.geojson
		}

		ApiWrapper.postUserSession('http://localhost:1337/api/v0/sessions', data)

	}

	render() {
		const { classes } = this.props;

		return (
			<form action="" className={classes.container} noValidate autoComplete="off">
				<h3>New session</h3>
				<TextField
					id="distance"
					label="Distance"
					className={classes.textField}
					value={this.state.distance}
					onChange={this.handleChange('distance')}
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>

				<TextField
					id=" startLocation"
					label="Start Location"
					className={classes.textField}
					value={this.state.startLocation}
					onChange={this.handleChange('startLocation')}
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>

				<TextField
					id="endLocation"
					label="End Location"
					className={classes.textField}
					value={this.state.endLocation}
					onChange={this.handleChange('endLocation')}
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>

				<TextField
					id="startTime"
					label="Start Time"
					type="datetime-local"
					className={classes.textField}
					value={this.state.startTime}
					onChange={this.handleChange('startTime')}
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>
				<TextField
					id="endTime"
					label="End Time"
					type="datetime-local"
					className={classes.textField}
					value={this.state.endTime}
					onChange={this.handleChange('endTime')}
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>

				<TextField
					id="typeOfRace"
					select
					label="Type of Race"
					className={classes.textField}
					value={this.state.typeOfRace}
					onChange={this.handleChange('typeOfRace')}
					SelectProps={{
						MenuProps: {
							className: classes.menu,
						},
					}}
					helperText="Please select your type of race"
					margin="normal"
				>
					{typeOfRace.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.value}
						</MenuItem>
					))}
				</TextField>
				<label htmlFor="contained-button-file">
					<Button variant="contained" component="span" className={classes.button} >
						Upload
					</Button>
					<input
						accept=".json"
						className={classes.input}
						id="contained-button-file"
						multiple
						type="file"
						onChange={e => this.handleFileSubmit(e.target.files[0])}
					/>
				</label>
				<div>
					<Button variant="contained" onClick={this.handleSubmit} color="primary" className={classes.button}>
						Submit
					</Button>
				</div>

			</form>

		);
	}
}

SessionForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SessionForm);