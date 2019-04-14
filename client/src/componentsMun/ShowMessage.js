import React, { Component } from "react";
import axios from "../../axiosInstance";
import { Button } from "react-bootstrap";
class ShowMessages extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      sender: "",
      committee: "",
      text: "",
      time: new Date(),
      Comm: []
    };
  }

  componentDidMount() {
    this.refreshMessages();
  }

  refreshMessages() {
    axios
      .get("/messages")
      .then(res => this.setState({ messages: res.data.data }))
      .catch(err => console.log(err));
  }

  onDelete = e => {
    axios
      .delete(
        "http://localhost:5000/api/messages/" +
          e.target.getAttribute("data-index")
      )
      .then(res => {
        console.log();
        this.refreshMessages();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <ul>
        {this.state.messages.map(message => (
          <div key={message._id}>
            <li>
              {message.sender} {message.text} {message.committee} {message.time}
            </li>
            <button onClick={this.onDelete} data-index={message._id}>
              DELETE
            </button>
          </div>
        ))}
      </ul>
    );
  }
}

export default ShowMessages;
