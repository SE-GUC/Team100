import AppBar from '@material-ui/core/AppBar';
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from "react";
import axios from "../../axiosInstance";
import TL from "../../components/timeline/tl";
import Achievements from "../aboutus/Achievements";
import Hierarchy from "../aboutus/Hierarchy";
import MV from "../aboutus/MV";
import Committees from "../committees/Committees";
import ContactUs from "../contactus/ContactUs";
import Descriptions from "../descriptions/Descriptions";
import Events from "../events/Events";
import Galleries from "../galleries/Galleries";
import LiveFeed from "../livefeed/Livefeed";
import Slideshow from "../slideshow/Slideshow";
import Subscribers from "../subscribers/Subscribers";
import LiveStream from "../livestream/livestream";
// import Livefeed from ".componentsMun/livefeed/Livefeed";
import "./Homepage.css";
import Recruitment from '../forms/recruitment';
import { Link } from '@material-ui/core';
import {Nav} from 'react-bootstrap';
import Library from '../library/Library'


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
    e: [],
    show: false
  };

  handleClose = () => {
    console.log("closing");
    this.setState({ show: false });
  };

  handleShow = () => {
    console.log("showing");
    this.setState({ show: true });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  refreshCurrentMonthEvents() {
    axios.get("http://localhost:5000/api/events/timeline/current").then(res => {
      console.log(res.data);
      this.setState({
        e: res.data.data
      });
    });
  }

  render() {
    const { classes, history } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Home" />
            <Tab label="About us" />
            <Tab label="Committes" />
            <Tab label="Library" />
            <Tab label="Events" />
            <Tab label="Gallery" />
            <Tab label="Livefeed" />
            <Tab label="livestream" />


          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Descriptions/><Slideshow /><Subscribers /><TL/> <ContactUs/>
         { /*<Nav.Link href='../forms/recruitment' >
            Recruitment Form
        </Nav.Link>*/}
        <button onClick={ () => history.push('/componentsMun/Forms') }>Recruitment Form</button>
        </TabContainer>}
        {value === 1 && <TabContainer>
          <MV/>
          <Hierarchy/>
          <Achievements/>
        </TabContainer>}
        {value === 2 && <TabContainer><Committees /></TabContainer>}
        {value === 3 && <TabContainer><Library/></TabContainer>}
        {value === 4 && <TabContainer><Events/></TabContainer>}
        {value === 5 && <TabContainer><Galleries /></TabContainer>}
        {value === 6 && <TabContainer><LiveFeed /></TabContainer>}
        {value === 7 && <TabContainer><LiveStream /></TabContainer>}
        

        {/* <h3>Events within the month</h3>
        <Timeline>
          {this.state.e.map(e1 => (
            <div key={e1._id}>
              <li>
                <TimelineEvent title={e1.name_event} createdAt={e1.day}>
                  {"Club: " + e1.club}
                  <br />
                  {"Description: " + e1.description}
                  <br />
                  {"Location: " + e1.location}
                  <br />
                  {"Date: " + e1.day + "/" + e1.month + "/" + e1.year}
                  <br />
                  {"Committee: " + e1.committee}
                  <br />
                  {"Feedback: " + e1.feedback}
                </TimelineEvent>
              </li>
            </div>
          ))}
        </Timeline> */}
      </div>

    );
  }        
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SimpleTabs));