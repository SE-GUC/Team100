import React, { Component } from "react";
import axios from "../../axiosInstance";
import "./Events.css";
import { Timeline, TimelineEvent } from "react-event-timeline";
// import Popup from "reactjs-popup";
import {
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Paper,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardContent,
  CardActions,
  Button,
  AppBar,
  Tabs,
  Tab,
  Card,
  Fab
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import {
  InputGroup,
  Dropdown,
  Modal,
  ModalTitle,
  ModalBody,
  FormControl,
  ModalFooter
} from "react-bootstrap";
import Collapsible from "react-collapsible";
import DropdownItem from "react-bootstrap/DropdownItem";
import ModalHeader from "react-bootstrap/ModalHeader";

class Events extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      e: [],
      show: false
    };
  }

  handleClose = () => {
    console.log("closing");
    this.setState({ show: false });
  };

  handleShow = () => {
    console.log("showing");
    this.setState({ show: true });
  };

  componentDidMount() {
    this.refreshEvents();
    this.refreshCurrentMonthEvents();
  }

  refreshEvents() {
    axios.get("http://localhost:5000/api/events").then(res => {
      console.log(res.data);
      this.setState({
        events: res.data.data
      });
    });
  }

  refreshCurrentMonthEvents() {
    axios.get("http://localhost:5000/api/events/timeline/current").then(res => {
      console.log(res.data);
      this.setState({
        e: res.data.data
      });
    });
  }

  changeName = event => {
    this.setState({ name_event: event.target.value });
  };

  changeClub = event => {
    this.setState({ club: event.target.value });
  };

  changeYear = event => {
    this.setState({ year: event.target.value });
  };

  changeMonth = event => {
    this.setState({ month: event.target.value });
  };

  changeDay = event => {
    this.setState({ day: event.target.value });
  };

  changeLocation = event => {
    this.setState({ location: event.target.value });
  };

  changeDescription = event => {
    this.setState({ description: event.target.value });
  };

  changeCommittee = event => {
    this.setState({ committee: event.target.value });
  };

  refreshRates() {
    axios.get("http://localhost:9000/api/events").then(res => {
      this.setState({ Events: res.data.data });
      console.log(res.data.data);
    });
  }

  onCreateRate = async Events => {
    Events.preventDefault();

    const event = {
      rate: this.state.rate
    };
    console.log(event);
    try {
      await axios.put(
        `events/${event.target.getAttribute("data-index")}`
        //updatedEvent
      );
      this.refreshEvents();
    } catch (error) {
      console.log(error);
    }
  };
  onCreateFeed = async Events => {
    Events.preventDefault();

    const event = {
      feedback: this.state.feed
    };
    console.log(event);
    try {
      await axios.put(
        `events/${event.target.getAttribute("data-index")}`
        //updatedEvent
      );
      this.refreshEvents();
    } catch (error) {
      console.log(error);
    }
  };

  onCreate = async Events => {
    Events.preventDefault();

    const event = {
      name_event: this.state.name_event,
      club: this.state.club,
      year: this.state.year,
      month: this.state.month,
      day: this.state.day,
      location: this.state.location,
      description: this.state.description,
      committee: this.state.committee
    };
    console.log(event);
    try {
      await axios.post(`events/`, event);
      this.refreshEvents();
    } catch (error) {
      console.log(error);
    }
  };

  onDelete = async e => {
    try {
      axios
        .delete(
          "http://localhost:5000/api/events/" +
            e.target.getAttribute("data-index")
        )
        .then(res => {
          console.log();
          this.refreshEvents();
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  onUpdate = async event => {
    event.preventDefault();
    const updatedEvent = {
      name_event: event.target.name.value,
      club: event.target.club.value,
      year: event.target.year.value,
      month: event.target.month.value,
      day: event.target.day.value,
      location: event.target.location.value,
      description: event.target.description.value,
      committee: event.target.committee.value
    };
    console.log(updatedEvent);
    try {
      await axios.put(
        `events/${event.target.getAttribute("data-index")}`,
        updatedEvent
      );
      this.refreshEvents();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h2>Events</h2>
        <Collapsible
          trigger={
            <Fab color="primary" aria-label="Add">
              <AddIcon />
            </Fab>
          }
        >
          <form onSubmit={this.onCreate}>
            <label>
              Name:
              <input type="text" name="name" onChange={this.changeName} />
            </label>
            <label>
              Club:
              <input type="text" name="club" onChange={this.changeClub} />
            </label>
            <label>
              Year:
              <input type="text" name="year" onChange={this.changeYear} />
            </label>
            <label>
              Month:
              <input type="text" name="month" onChange={this.changeMonth} />
            </label>
            <label>
              Day:
              <input type="text" name="day" onChange={this.changeDay} />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                onChange={this.changeLocation}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                onChange={this.changeDescription}
                defaultValue="Coming soon"
              />
            </label>
            <label>
              Committee:
              <input
                type="text"
                name="committee"
                onChange={this.changeCommittee}
              />
            </label>
            <input type="submit" value="Add" />
          </form>
        </Collapsible>
        {
          <ul>
            {this.state.events.map(event => (
              <div className="center" key={event._id}>
                <Paper>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="h2" color="primary">
                        {"Event Name: " + event.name_event} <br />
                        {/* {"Club: " + event.club} <br /> */}
                        {"Date: " +
                          event.day +
                          "/" +
                          event.month +
                          "/" +
                          event.year}{" "}
                        <br />
                        {"Location: " + event.location} <br />
                        {"Description: " + event.description} <br />
                        {"Committee: " + event.committee} <br />
                        {"Rate: " + event.rate} <br />
                        {"Feedback: " + event.feedback} <br />
                        {"Photo: " + event.photo}
                      </Typography>
                    </CardContent>
                    {/* <CardActions> */}
                    {/* <Button color="primary" aria-label="Delete" onClick={this.onDelete} data-index={event._id}>
                        <DeleteIcon/>
                        </Button> */}
                    {/* <Fab color="secondary" aria-label="Edit" onClick={this.handleShow}>
                        <EditIcon/>
                        </Fab> */}
                    {/* </CardActions> */}
                  </Card>
                </Paper>

                <button onClick={this.onDelete} data-index={event._id}>
                  DELETE
                </button>
                <form onSubmit={this.onUpdate} data-index={event._id}>
                  Event Name:
                  <input
                    type="text"
                    name="name"
                    defaultValue={event.name_event}
                  />
                  Club:
                  <input type="text" name="club" defaultValue={event.club} />
                  Year:
                  <input type="text" name="year" defaultValue={event.year} />
                  Month:
                  <input type="text" name="month" defaultValue={event.month} />
                  Day:
                  <input type="text" name="day" defaultValue={event.day} />
                  Location:
                  <input
                    type="text"
                    name="location"
                    defaultValue={event.location}
                  />
                  Description:
                  <input
                    type="text"
                    name="description"
                    defaultValue={event.description}
                  />
                  Committee:
                  <input
                    type="text"
                    name="committee"
                    defaultValue={event.committee}
                  />
                  <input type="submit" value="Submit" />
                </form>
              </div>
            ))}
          </ul>
        }

        <Collapsible trigger="Give a feedback">
          <form onSubmit={this.onCreateFeed}>
            <label>
              Event name:
              <input type="text" name="name" defaultValue={"Chairty"} />
            </label>
            <label>
              feedback:
              <input
                type="text"
                name="feedback"
                defaultValue={"No feedbacks yet"}
              />
            </label>
            <button type="submit">Add</button>
          </form>
        </Collapsible>
        <Collapsible trigger="Rate">
          <form onSubmit={this.onCreateRate}>
            <label>
              Event name:
              <input type="text" name="name" defaultValue={"Occasions"} />
            </label>
            <label>
              rate:
              <input type="text" name="rate" defaultValue={"1"} />
            </label>
            <button type="submit">Add</button>
          </form>
        </Collapsible>

        <h3>Ratings and feedbacks</h3>

        {this.state.events.map(eve => (
          <div key={eve._id}>
            <li>
              <label>Event: </label>
              {eve.name_event},<label>By: </label>
              {eve.club},<label>On: </label>
              {eve.day},{eve.month},{eve.year},<label>Feedback: </label>
              {eve.feedback} ,<label>Rating: </label>
              {eve.rate}
            </li>
          </div>
        ))}

        <h3>Events timeline</h3>
        <Timeline>
          {this.state.events.map(e1 => (
            <div key={e1._id}>
              <li>
                {/* <a onClick={this.handleShow}>SHOW</a> */}
                <TimelineEvent
                  title={e1.name_event}
                  createdAt={e1.day + "/" + e1.month + "/" + e1.year}
                  //   buttons={"See more details"}
                  //   onIconClick={() => alert(e1.description)}
                >
                  {"Location: " + e1.location} <br />
                  {"Description: " + e1.description}
                  {/* () => alert("Club: "+e1.club +"\n"+ "Description: "+e1.description +"\n"+ "Location: "+e1.location +"\n"+ "Date: "+e1.day+"/"+e1.month+"/"+e1.year +"\n"+ "Committee: "+e1.committee+"\n"+"Feedback: "+e1.feedback) */}
                  {/* <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>{e1.name_event}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {"Club: " + e1.club + "\n" +"Description: " + e1.description +"\n" + "Location: " + e1.location +  "\n" + "Date: " +
                        e1.day + "/" + e1.month + "/" + e1.year +"\n" + "Committee: " + e1.committee +"\n" +"Feedback: " + e1.feedback}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal> */}
                </TimelineEvent>
              </li>
            </div>
          ))}
        </Timeline>
      </div>
    );
  }
}

export default Events;
