import React, { Component } from "react";
//import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "../../axiosInstance";
import Collapsible from "react-collapsible";

class Announcements extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      description: "",
      date: new Date(),
      title: "",
      created_by: "",
      videos: "",
      photos: ""
    };
  }

  handleChangeDescription = event => {
    this.setState({ description: event.target.value });
  };
  handleChangeTitle = event => {
    this.setState({ title: event.target.value });
  };
  handleChangeCreated = event => {
    this.setState({ created_by: event.target.value });
  };
  handleChangeVideo = event => {
    this.setState({ videos: event.target.value });
  };
  handleChangePhoto = event => {
    this.setState({ photos: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();

    const Announcement = {
      description: this.state.description,
      date: this.state.date,
      title: this.state.title,
      created_by: this.state.created_by,
      videos: this.state.videos,
      photos: this.state.photos
    };
    console.log(Announcement);
    try {
      await axios.post(`announcements/`, Announcement);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Announcements</h1>
        <Collapsible trigger="Create new announcement">
          <form onSubmit={this.handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                onChange={this.handleChangeTitle}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                onChange={this.handleChangeDescription}
              />
            </label>
            <label>
              Club:
              <input
                type="text"
                name="created_by"
                onChange={this.handleChangeCreated}
              />
            </label>
            <label>
              Video:
              <input
                type="text"
                name="videos"
                onChange={this.handleChangeVideo}
              />
            </label>
            <label>
              Photo:
              <input
                type="text"
                name="photos"
                onChange={this.handleChangePhoto}
              />
            </label>
            <button type="submit">Add</button>
          </form>
        </Collapsible>
      </div>
    );
  }
}
//render(<Announcements />);
export default Announcements;

// this.handleShow = this.handleShow.bind(this);
// this.handleClose = this.handleClose.bind(this);

{
  /* <>
          <Button variant="primary" onClick={this.handleShow}>
            Create new announcement
          </Button>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>Create new announcement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             
               <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" />
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Title"
                    aria-label="Title"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon2" />
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Description"
                    aria-label="Description"
                    aria-describedby="basic-addon2"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3" />
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Club"
                    aria-label="Club"
                    aria-describedby="basic-addon3"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon4" />
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Please add photo's path"
                    aria-label="Photo"
                    aria-describedby="basic-addon4"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon5" />
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Please add video's path"
                    aria-label="Video"
                    aria-describedby="basic-addon5"
                  />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.handleChange + this.handleSubmit + this.handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </> */
}

// handleClose() {
//   this.setState({ show: false });
// }

// handleShow() {
//   this.setState({ show: true });
// }
// state = {
//   description: '',
//   title: '',
//   created_by: '',
//   videos: '',
//   photos: ''
// }

// handleChange = event => {
//   this.setState({ description: event.target.value, title: event.target.value,created_by: event.target.value, videos: event.target.value, photos: event.target.value });
// }
