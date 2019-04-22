import React, { Component } from "react";

import { Typography } from "@material-ui/core";
import axios from "../../axiosInstance";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/core/Link";

/*const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};
*/
class GeneralAssembly extends Component {
  state = {
    committee: [],
    open: false
  };
  componentDidMount() {
    //   this.refreshCommittees();
    axios.get("/committee/5cbda8561c9d4400008b55c0").then(res => {
      console.log(res.data);
      this.setState({
        committee: res.data.data
      });
    });
  }

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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = id => {
    console.log(id);
    // c.preventDefault();
    const updatedCommittee = {
      name: this.state.name,
      description: this.state.description,
      team_members: this.state.team_members,
      events: this.state.events,
      page: this.state.page
    };
    console.log(updatedCommittee);
    try {
      axios.put(`committee/${id}`, updatedCommittee);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { committee } = this.state;
    const committeeName = committee.name;
    const committeeDesc = committee.description;
    const committeePage = committee.page;
    const committeeEvents = committee.events;
    const committeeMemb = committee.team_members;

    return (
      <div className="container">
        <h1
          style={{
            color: "#343a40",
            className: "center",
            backgroundColor: "#004085",
            boxShadow: "inset 0 0 9px 5px black"
          }}
        >
          {committeeName}
        </h1>

        <Link component="button" variant="body1" href="./{committeePage}">
          {committeePage}
        </Link>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="headline" color="primary">
              Description
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{committeeDesc}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="headline" color="primary">
              Team Members
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{committeeMemb}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="headline" color="primary">
              Events
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{committeeEvents}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {localStorage.type === "mun_admin" ? (
          <form onSubmit={this.handleSubmit(committee._id)}>
            Name:{" "}
            <input
              type="text"
              name="name"
              defaultValue={committee.name}
              onChange={this.handleChangeName}
            />
            Description:
            <input
              type="text"
              name="description"
              defaultValue={committee.description}
              onChange={this.handleChangedescription}
            />
            Page:
            <input
              type="text"
              name="page"
              defaultValue={committee.page}
              onChange={this.handleChangePage}
            />
            Events:
            <input
              type="text"
              name="events"
              defaultValue={committee.events}
              onChange={this.handleChangeEvents}
            />
            <br />
            Team Members:
            <input
              type="text"
              name="team_members"
              defaultValue={committee.team_members}
              onChange={this.handleChangeMem}
            />
            <br />
            <input type="submit" value="Update" />
          </form>
        ) : null}
      </div>
    );
  }
}
export default GeneralAssembly;
