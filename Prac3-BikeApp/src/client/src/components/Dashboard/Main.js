import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withTheme } from "@material-ui/core/styles";
import SessionsTable from "./SessionsTable";
import SessionForm from "./SessionsForm";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Datecards from "./Datecards";
import StatsCard from "./StatsCard";
import getWeekDay from "../../helpers/getWeekDay";
import countTypes from "../../helpers/countTypes";
import StatsChart from "./StatsChart";

const styles = theme => ({
    datecards: {
        marginBottom: 10
    },

    performanceChartContainer: {
        marginTop: 20
    }
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
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
        const datecardItems = this.props.items.slice(0, 3);
        const totalDistance = this.props.items.reduce(
            (acc, cv) => acc + cv.distance,
            0
        );
        const avgSpeedofBike = 15.5;

        return (
            <main>
                <Typography variant="h4" gutterBottom component="h2">
                    Session Stats
                </Typography>
                <div className={classes.datecards}>
                    {datecardItems.map((i,j) => {
                        return (
                            <Datecards
                                key={`datecard-${j}`}
                                am="morning"
                                date={getWeekDay(i.start_time)}
                                day={i.start_time}
                                distance={i.distance}
                            />
                        );
                    })}
                </div>

                <div>
                    <StatsCard
                        item="Total Distance"
                        unit="km"
                        stat={totalDistance}
                    />
                    <StatsCard
                        item="Average Speed"
                        unit="km/h"
                        stat={Math.round(totalDistance / avgSpeedofBike)}
                    />
                    <StatsCard
                        item="Most common ride"
                        stat={countTypes(this.props.items)}
                    />
                </div>
                <div className={classes.performanceChartContainer}>
                    <Typography variant="h4" gutterBottom component="h2">
                        Performance Chart
                    </Typography>
                    <StatsChart data={this.props.items} />
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleOpen}
                >
                    New Session
                </Button>
                <Modal open={this.state.open} onClose={this.handleClose}>
                    <SessionForm id={this.props.id}/>
                </Modal>

                <SessionsTable items={this.props.items} />
            </main>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withTheme()(Main));
