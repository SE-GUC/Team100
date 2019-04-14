import React, { Component } from "react";
import axios from "../../axiosInstance";
import "./tl.css";
import { Timeline, TimelineEvent } from "react-event-timeline";

import { Modal, Button } from "react-bootstrap";

class TL extends Component {
  constructor() {
    super();

    this.state = {
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

  // helper = async x => {
  //   await axios.get(`http://localhost:9000/api/events/eventbyid/${x}`)
  //   .then(res => {
  //     console.log(res)
  //     this.setState({ r: res})
  //   })
  // }

  componentDidMount() {
    fetch("api/events/timeline/current")
      .then(res => res.json())
      .then(e => {
        this.setState({ e: e.data });
      });
  }

  render() {
    return (
      <div>
        <h3>Events within the month</h3>
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
        </Timeline>
      </div>
    );
  }
}
export default TL;
