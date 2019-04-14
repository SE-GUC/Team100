import React, { Component } from "react"
import Facebook from "./Facebook"
import Instagram from "./Instagram"
import Twitter from "./Twitter"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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

class LiveFeed extends React.Component {
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
            <Tab label="Facebook" />
            <Tab label="Twitter" />
            <Tab label="Instagram" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Facebook /></TabContainer>}
        {value === 1 && <TabContainer><Twitter /></TabContainer>}
        {value === 2 && <TabContainer><Instagram /></TabContainer>}
      </div>
    );
  }        
}

LiveFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LiveFeed);