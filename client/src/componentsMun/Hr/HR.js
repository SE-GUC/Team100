import React, { Component } from "react";

import { Typography } from "@material-ui/core";
import axios from "../../axiosInstance";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/core/Link";

const styles = {
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

class HR extends Component {
  state = {
    committee: [],
    open: false
  };
  componentDidMount() {
    //    this.refreshCommittees();
    axios
      .get("http://localhost:5000/api/committee/5cb1e6c2c863c13bd8d08522")
      .then(res => {
        console.log(res.data);
        this.setState({
          committee: res.data.data
        });
      });
  }
  // refreshCommittees() {

  //     fetch("http://localhost:9000/api/committee/5cb06815b9e4a20a0ca96e83")
  //       .then(res => {
  //         return res.json();
  //       })
  //       .then(c => {
  //         this.setState({ c: c.data });
  //       });
  //   }

  handleChangeName = c => {
    this.setState({ name: c.target.value });
  };
  handleChangedescription = c => {
    this.setState({ description: c.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = async c => {
    c.preventDefault();
    const updatedCommittee = {
      name: c.target.name.value,
      description: c.target.description.value,
      team_members: c.target.team_members.value
    };
    console.log(updatedCommittee);
    try {
      await axios.put(
        `committee/${c.target.getAttribute("data-index")}`,
        updatedCommittee
      );
      this.refreshCommittees();
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
        <h1 color="#003255" className="center">
          HR Committee
        </h1>

        <Link component="button" variant="body1">
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

        <form onSubmit={this.handleSubmit} data-index={committee.id}>
          Name: <input type="text" name="name" defaultValue={committee.name} />
          Description:
          <input
            type="text"
            name="description"
            defaultValue={committee.description}
          />
          Page:
          <input type="text" name="page" defaultValue={committee.page} />
          Events:
          <input type="text" name="events" defaultValue={committee.events} />
          <br />
          Team Members:
          <input
            type="text"
            name="team_members"
            defaultValue={committee.team_members}
          />
          <br />
          <input type="submit" value="Update" />
        </form>
      </div>
    );
  }
}
export default HR;
