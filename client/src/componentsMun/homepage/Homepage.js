import React from "react";
import axios from "../../axiosInstance";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
// import Livefeed from ".componentsMun/livefeed/Livefeed";
import "./Homepage.css";
import Subscribers from "../subscribers/Subscribers";
import Slideshow from "../slideshow/Slideshow";
import TL from "../../components/timeline/tl";
import Descriptions from "../descriptions/Descriptions";
import ContactUs from "../contactus/ContactUs";
import { Button } from "@material-ui/core";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
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
            <Tab
              label="Gallery"
              onClick={() => history.push("/componentsMun/gallery")}
            />
            <Tab
              label="Livefeed"
              onClick={() => history.push("/componentsMun/livefeed")}
            />
            <Tab
              label="LiveStream"
              onClick={() => history.push("/componentsMun/livestream")}
            />
            <Tab
              label="About us"
              onClick={() => history.push("/componentsMun/aboutus")}
            />
            <Tab
              label="Events"
              onClick={() => history.push("/componentsMun/events")}
            />
            <Tab
              label="Committes"
              onClick={() => history.push("/componentsMun/committees")}
            />
            <Tab
              label="Library"
              onClick={() => history.push("/componentsMun/library")}
            />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <Descriptions />
            <Slideshow />
            <Subscribers />
            <TL />
            <ContactUs />
          </TabContainer>
        )}

        <Button onClick={() => history.push("/componentsMun/Forms")}>
          Recruitment Form
        </Button>

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
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SimpleTabs));
