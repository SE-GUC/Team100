import React, { Component } from "react";
//import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "../../axiosInstance";
import Collapsible from "react-collapsible";

class Announcements extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      announcements: [],
      description: "",
      date: new Date(),
      title: "",
      created_by: "",
      videos: "",
      photos: ""
    };
  }
  componentDidMount() {
    this.getAnnouncements();
  }
  getAnnouncements() {
    fetch("/api/announcements")
      .then(res => res.json())
      .then(announcements => {
        this.setState({ announcements: announcements.data });
        console.log(this.state);
      });
  } 
//  onDelete = e => {
//      axios
//       .delete(
//          "http://localhost:9000/api/announcements/" +
//            e.target.getAttribute("data-index")
//        )
//        .then(res => {
//          console.log();
//          this.refreshAnnouncment();
//        })
//        .catch(err => console.log(err));
//    };
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
        {this.state.announcements.map(ann => (
            <div key={ann._id}>
              <li>
                <label>Description: </label>
                {ann.description},<label>Date: </label>
                {ann.date},<label>Title: </label>
                {ann.title},<label>Created by: </label>
                {ann.created_by},<label>Photos: </label>
                {ann.photos},<label>Videos: </label>
                {ann.videos}
                {/* <button onClick={this.onDelete} data-index={ann._id}>
                  Delete
                </button> */}
              </li>
            </div>
          ))}
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
export default Announcements;

