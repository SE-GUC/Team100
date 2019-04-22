import React, { Component } from "react";
import axios from "../../axiosInstance";
import Collapsible from "react-collapsible";
import { Typography, Paper, CardContent, Card } from "@material-ui/core";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
class Subscribers extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      subscribers: [],
      name: "",
      email: ""
    };
  }
  componentDidMount() {
    this.refreshSubscribers();
  }
  refreshSubscribers() {
    axios.get("http://localhost:5000/api/subscribers").then(res => {
      console.log(res.data);
      this.setState({
        subscribers: res.data.data
      });
    });
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
    return (
      <div>
        <h1>Subscribers</h1>
        {
          <ul>
            {localStorage.type === "mun_admin" ? (
              <Collapsible trigger="Click here to view subscribers list">
                {this.state.subscribers.map(subscriber => (
                  <div className="center" key={subscriber._id}>
                    <Paper>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" component="h2" color="primary">
                            {"Subscriber Name: " + subscriber.name} <br />
                            {"Email: " + subscriber.email} <br />
                          </Typography>
                        </CardContent>
                      </Card>
                    </Paper>
                  </div>
                ))}
              </Collapsible>
            ) : null
            }

          </ul>
        }
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Subscribe To Our Mailing Services!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputGroup size="sm" className="Subscribers">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Name
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={this.handleChangeName}
                required={true}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
            <br />
            <InputGroup size="sm" className="Subscribers">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Email
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={this.handleChangeEmail}
                required={true}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={this.handleSubmit}>
              Subscribe
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}
export default Subscribers;
