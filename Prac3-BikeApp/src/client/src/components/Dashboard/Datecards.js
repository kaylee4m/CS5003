import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {withTheme} from '@material-ui/core/styles';

const styles = theme => ({
    card: {
		display: "inline-block",
		flexDirection: 'column',
		fontSize: 14,
		height: '100%',
		marginRight: 10,
		minWidth: 150,
        width: 400,
    },
    title: {
        fontSize: 14,
        display: 'inline-block',
        margin: '0 2 px',
      },
      pos: {
        marginBottom: 12,
      },
    day: {
        display: 'inline-block',
    },
    date: {
        float: 'right'
    },
    distance: {
        marginTop: 15,
        textAlign: 'center'
    },
    morning : {
        // backgroundColor: '#FF9966',
    },
    evening: {
        // backgroundColor: "#1E90FF",
    }
  });

 class Datecards extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Card className= {classes.card}>
                <CardContent className={`${classes[this.props.am]}`}>
                    <Typography className= {`${classes.title} ${classes.date}`} color="textSecondary" gutterBottom>{this.props.date}</Typography>
                    <Typography className={`${classes.title} ${classes.day}`} color="textSecondary" gutterBottom>{this.props.day}</Typography>
                    <Typography className={classes.distance} variant= "h2" component= "h2" color="textSecondary" >{this.props.distance} km</Typography>
                </CardContent>
            </Card>
        );
    }
}

Datecards.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withTheme()(Datecards));