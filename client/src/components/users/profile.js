import React, { Component } from "react";
import { Modal, Button, ListGroup, Image } from "react-bootstrap";
import axios from "../../axiosInstance";
import DeleteIcon from "@material-ui/icons/Delete";
import { Fab } from "@material-ui/core";
import Collapsible from "react-collapsible";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import editicon from "../../images/editicon.png";

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
    this.refreshUser();
  }
  refreshUser() {
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
        user_type: res.data.User.user_type
      });
      console.log(
        this.state.name,
        this.state.photo,
        this.state.major,
        this.state.club,
        this.state.email,
        this.state.telephone,
        this.state.committee_type,
        this.state.user_type,
        this.state.birthdate
      );
    });
  }
  delete(id) {
    axios.delete(`users/${localStorage.getItem("id")}`).then(user => {
      this.setState({ user: user.data.deletedUser });
    });
    //   console.log(response.data)
    console.log("Deleted successfully");
    this.handleClose();
    localStorage.clear();
  }
  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };
  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
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
  handleSubmit = async event => {
    const User = {
      name: this.state.name,
      email: this.state.email,
      major: this.state.major,
      telephone: this.state.telephone
    };
    console.log(User);
    try {
      await axios.put(`users/${localStorage.getItem("id")}`, User).then(res => {
        this.handleClose();
        this.refreshUser();
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        {localStorage.length > 1 ? (
          <Button variant="info" size="sm" onClick={this.handleShow}>
            Show my profile
          </Button>
        ) : null}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              <ListGroup.Item>
                <Image
                  style={{ height: "10rem", width: "10rem" }}
                  src={this.state.photo}
                  roundedCircle
                />
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
                <Collapsible
                  trigger={
                    <img
                      style={{ width: 45, height: 45 }}
                      src={editicon}
                      alt="img"
                    />
                  }
                >
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
                      label="Telephone"
                      defaultValue={this.state.telephone}
                      onChange={this.handleChangeTelephone}
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
                      label="Major"
                      defaultValue={this.state.major}
                      onChange={this.handleChangeMajor}
                      margin="normal"
                      variant="outlined"
                    />
                    <Button
                      variant="success"
                      onClick={() => this.handleSubmit()}
                    >
                      Save changes
                    </Button>
                  </form>
                </Collapsible>

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
