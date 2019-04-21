
import React, { Component } from "react";
import { Modal, Button, ListGroup, Image} from "react-bootstrap";
import axios from "../../axiosInstance";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  Fab
} from "@material-ui/core";

class User extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      users: []
    };
  }

  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }

  createShow() {
    this.setState({ show: true });
  }
  closeShow() {
    this.setState({ show: true });
  }


  componentDidMount() {
    this.refreshUsers();
    console.log(this.state.users)
  }
  refreshUsers() {
    axios.get(`/users`).then(res => {
      console.log(res.data);
      this.setState({
        users: res.data.data
      });
    });
  }
  changeName = event => {
    this.setState({ name: event.target.value });
  };
  changeEmail = event => {
    this.setState({ email: event.target.value });
  };
  changePassword = event => {
    this.setState({ password: event.target.value });
  };
  changeMajor = event => {
    this.setState({ major: event.target.value });
  };
  changeGucian = event => {
    this.setState({ gucian: event.target.value });
  };
  changeClub = event => {
    this.setState({ club: event.target.value });
  };
  changeUsertype = event => {
    this.setState({ user_type: event.target.value });
  };
  changeCommittee = event => {
    this.setState({ committee_type: event.target.value });
  };
  changeControl = event => {
    this.setState({ control: event.target.value });
  };
  // addUser = async event => {
  //   event.preventDefault()
  //   const user = {

  //   }
  // }
  render() {
    return (
      <>
        {localStorage.type === "mun_admin" ? (
          <Button variant="primary" onClick={this.handleShow}>
            View, update or delete users
        </Button>
        ) : null
        }
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {this.state.users.map(user =>
                (<ListGroup.Item>
                  <Image style={{ height: "10rem", width: "10rem" }} src={user.photo} roundedCircle />
                  <h1>{user.name}</h1> <h3>{user.email}</h3><h5>{user.club}</h5><h4>{user.major}</h4>
                  {/* <Button variant="danger" onClick={() => this.deleteUser(user._id)}>Delete</Button> */}
                  <Fab
                    color="secondary"
                    aria-label="Delete"
                    size="small"
                    onClick={() => this.deleteUser(user._id)}
                  >
                    <DeleteIcon />
                  </Fab>

                  {user.user_type === "mun_member" ? (
                    <Button variant="success" onClick={() => this.updateUser(user._id)}>Authorize  as an admin</Button>
                  ) : null}
                  {user.user_type === "mun_member" ? (
                    <Button variant="dark" onClick={() => this.updateUser1(user._id)}>Unauthorize </Button>
                  ) : null}

                </ListGroup.Item>
                )
              )
              }
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
  deleteUser(id) {
    axios.delete(`/users/${id}`).then(res => {
      console.log(res.data);
      this.refreshUsers();
    });
  }
  updateUser(id) {
    axios.put(`/users/update/${id}`, { control: "true" }).then(res => {
      console.log(res.data);
      this.refreshUsers();
    });
  }
  updateUser1(id) {
    axios.put(`/users/update/${id}`, { control: "false" }).then(res => {
      console.log(res.data);
      this.refreshUsers();
    });
  }
}
export default User;