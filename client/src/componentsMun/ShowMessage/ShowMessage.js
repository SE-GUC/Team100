import React, { Component } from "react";
import axios from "../../axiosInstance";
import { ListGroup, Card, Button, Alert } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";

import { IconButton, Typography, Paper, CardContent } from "@material-ui/core";
class ShowMessage extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      sender: "",
      committee: "",
      text: "",
      replied: "",
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
      .delete("/messages/" + e.target.getAttribute("data-index"))
      .then(res => {
        console.log();
        this.refreshMessages();
      })
      .catch(err => console.log(err));
  };

  onUpdate = async message => {
    message.preventDefault();
    try {
      await axios.put(`messages/${message.target.getAttribute("data-index")}`);
      this.refreshMessages();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ul>
        <Paper>
          <Card style={{ width: "75rem", className: "center" }}>
            <Card.Header
              style={{
                backgroundColor: "#003255",
                color: "#ffffff",
                fontSize: "30px"
              }}
            >
              {" "}
              Messages
            </Card.Header>

            <ListGroup variant="flush">
              {this.state.messages.map(message => (
                <div key={message._id}>
                  <ListGroup.Item>
                    {" "}
                    <li>
                      <CardContent>
                        <Typography>
                          Sender: {message.sender} <br />
                          Text: {message.text} <br />
                          Committee: {message.committee} <br />
                          Time: {message.time}
                        </Typography>
                      </CardContent>
                    </li>{" "}
                    <button
                      onClick={this.onUpdate}
                      className="float-left"
                      data-index={message._id}
                      style={{ backgroundColor: "#ffd700", fontWeight: "bold" }}
                    >
                      {" "}
                      Replied{" "}
                    </button>
                    <Alert
                      variant={"dark"}
                      className="float-right"
                      style={{ width: "15%" }}
                    >
                      {message.replied ? "replied" : "not replied"}
                    </Alert>
                    <span>
                      <button
                        onClick={this.onDelete}
                        className="float-left"
                        data-index={message._id}
                        style={{
                          backgroundColor: "#003255",
                          fontWeight: "bold",
                          color: "#ffffff"
                        }}
                      >
                        Delete
                      </button>
                    </span>
                    <br />
                  </ListGroup.Item>
                </div>
              ))}
            </ListGroup>
          </Card>
        </Paper>
      </ul>
    );
  }
}

export default ShowMessage;
