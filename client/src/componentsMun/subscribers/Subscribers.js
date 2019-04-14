import React, { Component } from "react";
//import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "../../axiosInstance";
import Collapsible from "react-collapsible";

class Subscribers extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      subscribers: [],
      name: "",
      email: ""
    };
  }

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };
  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();

    const Subscriber = {
      name: this.state.name,
      email: this.state.email
    };
    console.log(Subscriber);
    try {
      await axios.post(`/subscribers/`, Subscriber);
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    if (this.state.error) {
      return (
        <label>
          Sorry, you have already Subscribed with this email before.{" "}
        </label>
      );
    }
    return (
      <div>
        <h1>Subscribers</h1>
        <Collapsible trigger="Click here to Register to mailing service">
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="Name"
                onChange={this.handleChangeName}
                required={true}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                onChange={this.handleChangeEmail}
                required={true}
              />
            </label>
            <button
              onClick={() => {
                alert(
                  "Your have successfully subscribed to our mailing services!"
                );
              }}
            >
              Subscribe
            </button>
          </form>
        </Collapsible>
      </div>
    );
  }
}
export default Subscribers;