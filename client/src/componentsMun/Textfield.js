import React, { Component } from "react";
import axios from "../axiosInstance";

class Textfield extends Component {
  state = {
    committee: [],
    events: [],
    team_members: [],
    open: false
  };

  handleChangeName = c => {
    this.setState({ name: c.target.value });
  };
  handleChangedescription = c => {
    this.setState({ description: c.target.value });
  };
  handleChangeEvents = c => {
    this.setState({ events: c.target.value });
  };
  handleChangePage = c => {
    this.setState({ page: c.target.value });
  };
  handleChangeMem = c => {
    this.setState({ team_members: c.target.value });
  };
  handleS = async c => {
    c.preventDefault();

    const com = {
      name: this.state.name,
      page: this.state.page,
      description: this.state.description,
      events: this.state.events,
      team_members: this.state.team_members
    };
    console.log(com);
    try {
      await axios.post(`committee/`, com);
      // this.refreshCommittees();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleS}>
        <label>
          Name:
          <input type="text" name="name" onChange={this.handleChangeName} />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            onChange={this.handleChangedescription}
          />
        </label>
        <label>
          Page:
          <input
            type="text"
            name="description"
            onChange={this.handleChangePage}
          />
        </label>
        <label>
          Events:
          <input type="text" name="events" onChange={this.handleChangeEvents} />
        </label>
        <label>
          Team Members:
          <input
            type="array"
            name="team_members"
            onChange={this.handleChangeMem}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    );
  }
}
export default Textfield;
