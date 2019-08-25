import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
	text: {
		textAlign : 'center'
	},
	card: {
		minWidth: 275,
	  },
	  bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	  },
	  title: {
		fontSize: 14,
	  },
	  pos: {
		marginBottom: 12,
	  },
})
//  OpenWeatehr API key
class WeatherBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			icon: null,
			weather: '',
			message: '',
		}
	}

	// This does not seem to work due to cross-origin problems
	async fetchWeatherIcon(icon) {
		const response = await fetch(`https://openweathermap.org/img/w/${icon}.png`, {
			mode: 'no-cors',
			headers: {
				'Allow-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			}
		});
		this.setState({
			icon: response
		})

	}

	async componentDidMount() {
		fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d90580aa61ac5d6dc7420718b1bd919a')
			.then(k => (k.json()))
			.then(resp => {

				this.setState({weather: resp.weather[0]})
				if (this.state.weather.main) {
					this.setState({message: 'Perfect day to go for a ride!'})
				}
				this.fetchWeatherIcon(resp.weather[0].icon);	
		})
	}
	
	render() {
		const {classes} = this.props;
		return(
			<div>
				<Card className={classes.card}>
					<CardContent>
						<img src={this.state.icon} alt="weather icon"></img>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
							Today's weather
						</Typography>
						<Typography variant="h5" component="h2">
							{this.state.weather.description}
						</Typography>
						<Typography component="p">
							{this.state.message}
						</Typography>
					</CardContent>
				</Card>
			</div>

		)
	}
}

WeatherBar.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(withTheme()(WeatherBar));