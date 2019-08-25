import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import {withStyles} from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
		minWidth: 250,
		marginRight: 10,
		display: "inline-block"
	},
	title: {
		fontSize: 20,
	},
	pos: {
		marginBottom: 12,
	},
	unit: {
		fontSize: 40,
	}
  };


class StatsCard extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Card className={classes.card}>
				<CardContent>
					<Typography className = {classes.title} color="textSecondary" gutterBottom>
						{this.props.item}
					</Typography>
					<Typography variant="h2" component="h2">
						{this.props.stat} <span className={classes.unit}>{this.props.unit}</span>
					</Typography>
				</CardContent>
			</Card>
		)
	}
}

StatsCard.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StatsCard);