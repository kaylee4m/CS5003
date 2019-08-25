import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./Sidebar";
import WeatherBar from "./WeatherBar";
import { Route } from "react-router-dom";
import SimpleMap from "./Map";
import Main from "./Main";
import UserGoals from "./UserGoals";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const TEST_USER = "Kieran.Krajcik";

const styles = theme => ({
    datecards: {
        marginBottom: 10
    },
    mainArea: {
        marginLeft: 90
    },
    title: {
        marginLeft: 100,
        marginTop: 70
    },
    weatherbar: {
        marginTop: 20,
        marginBottom: 20
    },

    descriptionText: {
        width: '200%',
        marginLeft: 100,
        marginTop: 200,
    },

    performanceChartContainer: {
        marginTop: 20
    }
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            user: "",
            items: [],
            goals: [],
            user_id: ""
        };
    }

    // This is responsible for hydrating the entire dashboard
    async componentDidMount() {
        await fetch(`http://localhost:1337/api/v0/users/${TEST_USER}`, {
            accept: "application/json",
            mode: "cors"
        })
            .then(i => i.json())
            .then(resp => {
                this.setState({
                    user: resp.data[0]["username"],
                    items: resp.data[0]["sessions"],
                    goals: resp.data[0]["goals"],
                    user_id: resp.data[0]["user_id"]
                });
            });
    }

    /**
     * Render the main dashboard
     * Sturcutre includes: Title, Add new session, Session Chart, Session Table.
     * The dashboard is also responsible in hydrating each of the components with data
     * @returns
     * @memberof Dashboard
     */
    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh" }}
            >
                <Grid item xs={9}>
                    {/* Does not justify the use of components. We want this to show in all dashboards */}
                    <div className={classes.descriptionText}>
                        <SnackbarContent
                            className={classes.snackbar}
                            message="Hello, this is a concept demo of a bike app designed
        using Material UI Components and React.js. We want
        to demo the use of React.js and how it could be used
        in combination with APIs to make developers more
        productive."
                        />
                    </div>

                    <Typography
                        component="h1"
                        variant="h3"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        {this.state.user}'s Dashboard
                    </Typography>
                    <main className={classes.mainArea}>
                        <div className={classes.weatherbar}>
                            <WeatherBar />
                        </div>
                        {/* Main Content */}
                        <div className="content">
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <Main
                                        items={this.state.items}
                                        id={this.state.user_id}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/map"
                                render={props => (
                                    <SimpleMap data={this.state.items} />
                                )}
                            />
                            <Route
                                exact
                                path="/goals"
                                render={props => (
                                    <UserGoals
                                        data={this.state.goals}
                                        id={this.state.user_id}
                                    />
                                )}
                            />
                        </div>
                    </main>
                    <Sidebar username={this.state.user} />
                </Grid>
            </Grid>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withTheme()(Dashboard));
