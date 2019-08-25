import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withTheme} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

// Adapted template from Material UI
const styles = theme => ({
	main: {
		width: 400,
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	submit: {
		marginTop: theme.spacing.unit * 7
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center', 
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *3}px ${theme.spacing.unit * 3}px`
	},
	form: {
		width: '100%'
	},
})
class LoginForm extends Component {
	render() {
		const {classes} = this.props;
		return(
			<div className={classes.main}>
				<Paper className={classes.paper}>
					<Typography>
						Sign in
					</Typography>
					<form>
						<FormControl normal required fullWidth>
							<InputLabel htmlFor="username">Username</InputLabel>
							<Input id="username" name="username" autoComplete="username" autoFocus />
						</FormControl>
						<FormControl normal required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="current-password" />
						</FormControl>
					</form>
					<Button
						className={classes.submit}
						type="submit"
						color="primary"
						variant="contained"
						fullWidth>
						Sign in
					</Button>
				</Paper>
			</div>
		)
	}
}

LoginForm.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(withTheme()(LoginForm));