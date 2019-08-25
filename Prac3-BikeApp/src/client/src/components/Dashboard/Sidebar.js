import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Avatarpic from "./userPhoto.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import DateRange from "@material-ui/icons/DateRange";
import DirectionsBike from "@material-ui/icons/DirectionsBike";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import History from "@material-ui/icons/History";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import SessionForm from "./SessionsForm";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;
const TEST_USER = 'Hiram.Bashirian48';
const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    toolbar: theme.mixins.toolbar,

    bigAvatar: {
        margin: 10,
        width: 70,
        height: 70
    }
});

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            user: this.props.username
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
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            {this.state.user}'s Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.toolbar} />
                    <Grid container justify="center" alignItems="center">
                        <Avatar
                            alt="userName"
                            src={Avatarpic}
                            className={classes.bigAvatar}
                        />
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <Typography variant="h5">
                            {this.props.username}
                        </Typography>
                    </Grid>

                    <Divider />

                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <History />
                            </ListItemIcon>
                            <NavLink style={{ textDecoration: 'none'}} exact to='/'>

                            <ListItemText style={{paddingLeft: 16}} inset primary="Your Dashboard" />
                            </NavLink>
                        </ListItem>

                        <ListItem
                            button
                            variant="contained"
                            onClick={this.handleOpen}
                        >
                            <ListItemIcon>
                                <DateRange />
                            </ListItemIcon>
                            <ListItemText inset primary="New Session" />
                        </ListItem>
                        <Modal
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            <SessionForm />
                        </Modal>

                        <ListItem button>
                            <ListItemIcon>
                                <DirectionsBike />
                            </ListItemIcon>
                            {/* We need to customise the text decoration or else we will get the ugly underline format */}
                            <NavLink exact to="/map" style={{ textDecoration: 'none', textAlign: 'left'}}>
                                <ListItemText style={{paddingLeft: 16}} inset primary="Map" />
                            </NavLink>
                        </ListItem>


                        <ListItem button>
                            <ListItemIcon>
                                <DirectionsBike />
                            </ListItemIcon>
                            {/* We need to customise the text decoration or else we will get the ugly underline format */}
                            <NavLink exact to="/goals" style={{ textDecoration: 'none', textAlign: 'left'}}>
                                <ListItemText style={{paddingLeft: 16}} inset primary="Goals" />
                            </NavLink>
                        </ListItem>

                    </List>
                </Drawer>
            </div>
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
