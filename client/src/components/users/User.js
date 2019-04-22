import React, { Component } from "react";
import { Modal, Button, ListGroup, Image } from "react-bootstrap";
import axios from "../../axiosInstance";
import DeleteIcon from "@material-ui/icons/Delete";
import Collapsible from "react-collapsible";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
// import UserAdd from "./UserAdd"

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
  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };
  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };
  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };
  handleChangeTelephone = event => {
    this.setState({ telephone: event.target.value });
  };
  handleChangeClub = event => {
    this.setState({ club: event.target.value });
  };
  handleChangeCommitte = event => {
    this.setState({ committee_type: event.target.value });
  };
  handleChangeMajor = event => {
    this.setState({ major: event.target.value });
  };
  handleChangeGucian = event => {
    this.setState({ gucian: event.target.value });
  };
  handleChangeControl = event => {
    this.setState({ control: event.target.value });
  };
  handleChangeUserType = event => {
    this.setState({ user_type: event.target.value });
  };

  handleSubmit = async event => {
    const User = {
      name: this.state.name,
      email: this.state.email,
      major: this.state.major,
      user_type: this.state.user_type,
      password: this.state.password,
      club: this.state.club,
      committee_type: this.state.committee_type,
      control: this.state.control,
      gucian: this.state.gucian
    };
    console.log(User);
    try {
      await axios.post(`users/add`, User).then(res => {
        console.log("Added successfully")
        this.refreshUsers();
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        {localStorage.type === "mun_admin" || localStorage.type === "hub_admin" ? (
          <Button variant="info" size="sm" onClick={this.handleShow}>
            View, update or delete users
        </Button>
        ) : null
        }
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Users</Modal.Title>
            <Collapsible trigger="Click here to add new user">
              <form>
                <TextField
                  id="outlined-name"
                  label="Name"
                  defaultValue={this.state.name}
                  onChange={this.handleChangeName}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-name"
                  label="Email"
                  defaultValue={this.state.email}
                  onChange={this.handleChangeEmail}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-name"
                  label="Password"
                  defaultValue={this.state.password}
                  onChange={this.handleChangePassword}
                  margin="normal"
                  variant="outlined"
                  type="password"
                />
                <TextField
                  id="outlined-name"
                  label="Major"
                  defaultValue={this.state.major}
                  onChange={this.handleChangeMajor}
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  id="outlined-name"
                  label="Club"
                  defaultValue={this.state.club}
                  onChange={this.handleChangeClub}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-name"
                  label="Committee"
                  defaultValue={this.state.committee_type}
                  onChange={this.handleChangeCommitte}
                  margin="normal"
                  variant="outlined"
                />


                <FormLabel component="legend">Gucian</FormLabel>
                <RadioGroup
                  aria-label="Gucian"
                  name="Gucian"
                  value={this.state.gucian}
                  onChange={this.handleChangeGucian}
                >
                  <FormControlLabel value="true" control={<Radio />} label="True" />
                  <FormControlLabel value="false" control={<Radio />} label=" False" />

                </RadioGroup>
                <FormLabel component="legend">User Type</FormLabel>
                <RadioGroup
                  aria-label="User Type"
                  name="User Type"
                  value={this.state.user_type}
                  onChange={this.handleChangeUserType}
                >
                  <FormControlLabel value="user" control={<Radio />} label="User" />
                  <FormControlLabel value="mun_admin" control={<Radio />} label="MUN member" />
                  <FormControlLabel value="mun_member" control={<Radio />} label="MUN admin" />

                </RadioGroup>
                <FormLabel component="legend">Control</FormLabel>
                <RadioGroup
                  aria-label="Control"
                  name="Control"
                  value={this.state.control}
                  onChange={this.handleChangeControl}
                >
                  <FormControlLabel value="true" control={<Radio />} label="True" />
                  <FormControlLabel value="false" control={<Radio />} label=" False" />

                </RadioGroup>



                <Button
                  variant="dark"
                  onClick={() => this.handleSubmit()}
                >
                  Add user
                    </Button>
              </form>
            </Collapsible>

            {/* <UserAdd> </UserAdd> */}
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {this.state.users.map(user =>
                (<ListGroup.Item>
                  <Image style={{ height: "10rem", width: "10rem" }} src={user.photo} roundedCircle />
                  <h1>{user.name}</h1> <h3>Email: {user.email}</h3><h3>Club: {user.club}</h3><h3>Major: {user.major}</h3><h3>Telephone: {user.telephone}</h3><h3>User type: {user.user_type}</h3><h3>Committe: {user.committe_type}</h3><h3>Control: {user.control}</h3>
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