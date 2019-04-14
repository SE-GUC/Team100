import React, { Component } from "react";
import axios from "../../axiosInstance";
import {
  Dropdown,
  DropdownItem,
  Modal,
  Button,
  InputGroup,
  FormControl
} from "react-bootstrap";
class Messages extends Component {
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
    this.getComm();
  }

  refreshMessages() {
    axios
      .get("/messages")
      .then(res => this.setState({ messages: res.data.data }))
      .catch(err => console.log(err));
  }

  getComm() {
    axios
      .get("/committee")
      .then(res => this.setState({ Comm: res.data.data }))
      .catch(err => console.log(err));
  }

  handleChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleChangeComm = value => {
    this.setState({ committee: value });
  };
  handleChangeTime = e => {
    this.setState({ time: e.target.value });
  };
  handleChangeText = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = async Messages => {
    Messages.preventDefault();
    const message = {
      sender: this.state.email,
      text: this.state.text,
      committee: this.state.committee,
      time: this.state.time
    };
    console.log(message);
    try {
      await axios.post(`/messages/`, { ...message });
      this.refreshMessages();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ul>
        {/* <Button variant="primary" onClick={this.refreshMessages}> Messages  </Button>   
           {this.state.messages.map(message => (
              <div key={message._id}>
                <li>
                  {message.sender} {message.text} {message.committee} {message.time}
                </li>
                <button onClick={this.onDelete} data-index={message._id}>
                  DELETE
                </button>
              </div>
            ))} */}

        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Got any questions? Need help?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p> Please leave us a message.</p>
            <InputGroup size="sm" className="Messages">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Email
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={this.handleChangeEmail}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
            <br />
            <InputGroup size="sm" className="Messages">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Text
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={this.handleChangeText}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
            <br />
            <Dropdown onSelect={this.handleChangeComm}>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {this.state.committee ? this.state.committee : "Committees"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.state.Comm.map(e1 => (
                  <div key={e1._id}>
                    <li>
                      <DropdownItem eventKey={e1.name}>{e1.name}</DropdownItem>
                    </li>
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="warning" onClick={this.handleSubmit}>
              Send
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </ul>
    );
  }
}

export default Messages;
