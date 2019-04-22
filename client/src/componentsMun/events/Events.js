import React, { Component } from "react";
import axios from "../../axiosInstance";
import "./Events.css";
import { Timeline, TimelineEvent } from "react-event-timeline";
import {
  Typography,
  Paper,
  CardContent,
  CardActions,
  Button,
  Card,
  Fab
} from "@material-ui/core";
import Rating from "material-ui-rating";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { InputGroup, Modal, FormControl } from "react-bootstrap";
import Collapsible from "react-collapsible";

class Events extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      e: [],
      show: false,
      x: ""
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
    axios.get("/events").then(res => {
      console.log(res.data);
      this.setState({
        events: res.data.data
      });
    });
  }

  refreshCurrentMonthEvents() {
    axios.get("events/timeline/current").then(res => {
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

  updateFeedback = event => {
    this.setState({ feedback: event.target.value });
  };

  updateRate = async (value, eventId) => {
    console.log(value, eventId);
    const Rate = {
      rate: value
    };
    try {
      await axios.put(`events/rate/${eventId}`, Rate).then(res => {
        console.log(res.data);
        alert(res.data.message);
      });
      this.refreshEvents();
    } catch (error) {
      if (error.message === "Request failed with status code 404")
        alert("Please enter valid inputs");
      else if (error.message === "Request failed with status code 401")
        alert("You are unauthorized");
      else alert(error.message);
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
      await axios.post(`events/`, event).then(res => {
      this.refreshEvents();
      alert(res.data.msg)
    })
    } catch (error) {
      if (error.message === "Request failed with status code 404")
        alert("Please enter valid inputs");
      else if (error.message === "Request failed with status code 401")
        alert("You are unauthorized");
      else alert(error.message);
    }
  };

  onDelete = async id => {
    try {
      await axios
        .delete(`events/${id}`)
        .then(res => {
          console.log();
          this.refreshEvents();
          alert(res.data.msg)
        })
    } catch (error) {
      if (error.message === "Request failed with status code 404")
        alert("Please enter valid inputs");
      else if (error.message === "Request failed with status code 401")
        alert("You are unauthorized");
      else alert(error.message);
    }
  };

  onUpdate = async id => {
    // console.log(id);
    this.handleClose();

    const updatedEvent = {
      name_event: this.state.name_event,
      club: this.state.club,
      year: this.state.year,
      month: this.state.month,
      day: this.state.day,
      location: this.state.location,
      description: this.state.description,
      committee: this.state.committee
    };
    try{
      await axios.put(`events/${id}`, updatedEvent).then( res => {
      this.refreshEvents();
      alert(res.data.message);
      })
    }
    catch(error){
      if (error.message === "Request failed with status code 404")
        alert("Please enter valid inputs");
      else if (error.message === "Request failed with status code 401")
        alert("You are unauthorized");
      else alert(error.message);
    }
  };

  onCreateFeed = async event => {
    event.preventDefault();

    const feed = {
      feedback: this.state.feedback
    };
    console.log(feed);
    try {
      await axios.put(
        "events/feedback/" + event.target.getAttribute("data-index"),
        feed
      ).then(res => {
        this.refreshEvents();
        alert(res.data.message);
      })
      
    } catch (error) {
      if (error.message === "Request failed with status code 404")
        alert("Please enter valid inputs");
      else if (error.message === "Request failed with status code 401")
        alert("You are unauthorized");
      else alert(error.message);
    }
  };

  changeValue = async id => {
    this.handleShow();
    await this.setState({ x: id });
    // console.log(this.state.x)
  };

  render() {
    return (
      <div>
        <h2>Events</h2>
        {localStorage.type === "mun_admin" ? (
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
                  // defaultValue="Coming soon"
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
        ) : null}
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
                        {/* {"Photo: " + event.photo} <br/> */}
                        <Collapsible trigger="Give a feedback">
                          <form
                            onSubmit={this.onCreateFeed}
                            data-index={event._id}
                          >
                            <label>
                              Feedback:
                              <input
                                type="text"
                                name="feedback"
                                onChange={this.updateFeedback}
                              />
                            </label>
                            <input type="submit" value="Submit" />
                          </form>
                        </Collapsible>
                        <Rating
                          value={0}
                          max={5}
                          onChange={v => this.updateRate(v, event._id)}
                        />
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {" "}
                      {localStorage.type === "mun_admin" ? (
                        <Fab
                          color="primary"
                          aria-label="Delete"
                          onClick={() => this.onDelete(event._id)}
                        >
                          <DeleteIcon />
                        </Fab>
                      ) : null}
                      {localStorage.type === "mun_admin" ? (
                        <Fab
                          color="secondary"
                          aria-label="Edit"
                          onClick={() => this.changeValue(event._id)}
                        >
                          <EditIcon />
                        </Fab>
                      ) : null}
                    </CardActions>
                  </Card>
                </Paper>

                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    Fill in the following boxes
                  </Modal.Header>
                  <Modal.Body>
                    <InputGroup size="sm" className="Events">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Event Name
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        onChange={this.changeName}
                        // defaultValue={event.name_event}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                    </InputGroup>
                    <InputGroup size="sm" className="Events">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Club
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        onChange={this.changeClub}
                        // defaultValue={event.club}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                    </InputGroup>
                    <InputGroup size="sm" className="Events">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Year
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        onChange={this.changeYear}
                        // defaultValue={event.year}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                    </InputGroup>
                    <InputGroup size="sm" className="Events">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Month
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        onChange={this.changeMonth}
                        // defaultValue={event.month}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                    </InputGroup>
                    <InputGroup size="sm" className="Events">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Day
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        onChange={this.changeDay}
                        // defaultValue={event.day}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                    </InputGroup>
                    <InputGroup size="sm" className="Events">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Location
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        onChange={this.changeLocation}
                        // defaultValue={event.location}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                    </InputGroup>
                    <InputGroup size="sm" className="Events">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Description
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        onChange={this.changeDescription}
                        // defaultValue={event.description}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                    </InputGroup>
                    <InputGroup size="sm" className="Events">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Committee
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        onChange={this.changeCommittee}
                        // defaultValue={event.committee}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                    </InputGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="contained"
                      onClick={() => this.onUpdate(this.state.x)}
                    >
                      Update
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ))}
          </ul>
        }

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
