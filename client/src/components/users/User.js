
import React, { Component } from "react";
import { Modal, Button, ListGroup, Image} from "react-bootstrap";
import axios from "../../axiosInstance";
class User extends React.Component  {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      users:[]
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
    axios.get("http://localhost:5000/api/users").then(res => {
      console.log(res.data);
      this.setState({
        users: res.data.data
      });
    });
  }
  render() {

    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          View, update or delete users
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ListGroup>
          {this.state.users.map(user => ( <ListGroup.Item><Image style = {{height:"10rem", width:"10rem"}} src={user.photo} roundedCircle />
<h1>{user.name}</h1> <h3>{user.email}</h3><h5>{user.club}</h5><h4>{user.major}</h4><Button variant="danger" onClick={()=> this.deleteUser(user._id)}>Delete</Button><Button variant="success" onClick={()=> this.updateUser(user._id)}>Authorize  as an admin</Button><Button variant="dark" onClick={()=> this.updateUser1(user._id)}>Unauthorize </Button></ListGroup.Item>))}
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
 

  deleteUser(id){
    axios.delete(`http://localhost:5000/api/users/${id}`).then(res => {
      console.log(res.data);
     this.refreshUsers();
    });
  }
  updateUser(id){
    axios.put(`http://localhost:5000/api/users/update/${id}`,{control: "true"}).then(res => {
      console.log(res.data);
     this.refreshUsers();
    });
  }
  updateUser1(id){
    axios.put(`http://localhost:5000/api/users/update/${id}`,{control: "false"}).then(res => {
      console.log(res.data);
     this.refreshUsers();
    });
  }

}


export default User;