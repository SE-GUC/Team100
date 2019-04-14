import React, { Component } from "react"

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// import Livefeed from ".componentsMun/livefeed/Livefeed";
import LiveFeed from "../livefeed/Livefeed";
import Subscribers from "../subscribers/Subscribers"
import Slideshow from "../slideshow/Slideshow"
import Galleries from "../galleries/Galleries"


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Home" />
            <Tab label="Gallery" />
            <Tab label="Livefeed" />
            <Tab label="Contact us" />
            <Tab label="About us" />
            <Tab label="Events" />

          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Slideshow /><Subscribers /></TabContainer>}
        {value === 1 && <TabContainer><Galleries /></TabContainer>}
        {value === 2 && <TabContainer><LiveFeed /></TabContainer>}
        {value === 3 && <TabContainer>Contact us</TabContainer>}
        {value === 4 && <TabContainer>About us</TabContainer>}
        {value === 5 && <TabContainer>Events</TabContainer>}


      </div>
    );
  }        
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);