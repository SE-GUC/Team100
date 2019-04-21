
import React, { Component } from "react";
import { Modal, Button, ListGroup, Image } from "react-bootstrap";
import axios from "../../axiosInstance";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Fab
} from "@material-ui/core";

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      photo: "",
      name: "",
      email: "",
      club: "",
      major: "",
      telephone: "",
      committee_type: "",
      user_type: "",
      birthdate: ""
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  componentDidMount() {
    axios.get(`users/${localStorage.getItem("id")}`).then(res => {
      this.setState({
        photo: res.data.User.photo,
        name: res.data.User.name,
        email: res.data.User.email,
        telephone: res.data.User.telephone,
        club: res.data.User.club,
        committee_type: res.data.User.committee_type,
        major: res.data.User.major,
        birthdate: res.data.User.birthdate,
        user_type: res.data.User.user_type,
      })
      console.log(
        this.state.name,
        this.state.photo,
        this.state.major,
        this.state.club,
        this.state.email,
        this.state.telephone,
        this.state.committee_type,
        this.state.user_type,
        this.state.birthdate)
    });
  }
  delete(id) {
    axios.delete(`users/${localStorage.getItem("id")}`).then(user => {
      this.setState({ user: user.data.deletedUser })
    }
    )
    //   console.log(response.data)
    console.log("Deleted successfully")
    this.handleClose()
    localStorage.clear();
  }

  render() {

    return (
      <>
        {localStorage.length > 0 ? (
          <Button variant="primary" onClick={this.handleShow}>
            Show my profile
      </Button>
        ) : null
        }
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              <ListGroup.Item>
                <Image style={{ height: "10rem", width: "10rem" }}
                  src={this.state.photo} roundedCircle />
                <h1>{this.state.name}</h1>
                <h3>{this.state.email}</h3>
                <h3>{this.state.club}</h3>
                <h3>{this.state.major}</h3>
                <h3>{this.state.birthdate}</h3>
                <h3>{this.state.telephone}</h3>
                <h3>{this.state.user_type}</h3>
                <h3>{this.state.committee_type}</h3>
                <Fab
                  color="secondary"
                  aria-label="Delete"
                  size="small"
                  onClick={() => this.delete(localStorage.getItem("id"))}
                >
                  <DeleteIcon />
                </Fab>
                {/* <Button variant="danger" onClick={() => this.delete(localStorage.getItem("id"))}>Delete</Button> */}
              </ListGroup.Item>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
          </Button>
            {/* <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }

}


export default Profile;