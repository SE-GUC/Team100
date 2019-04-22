import React, { Component } from "react";
import axios from "../../axiosInstance";
import {
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Paper,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardContent,
  CardActions,
  Button,
  AppBar,
  Tabs,
  Tab
} from "@material-ui/core";
import Card from "react-bootstrap/Card";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-dom";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Collapsible from "react-collapsible";

import { NavLink, Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import HR from "../Hr/HR";
import EXECUTIVE from "../Executive/EXECUTIVE";
import PR from "../Pr/PR";

import Input from "@material-ui/core/Input";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class Committees extends Component {
  state = {
    committee: [],
    events: [],
    team_members: [],
    open: false
  };
  componentDidMount() {
    axios.get("/committee").then(res => {
      console.log(res.data);
      this.setState({
        committee: res.data.data
      });
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangename = c => {
    this.setState({ name: c.target.value });
  };
  handleChangedesc = c => {
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

  handleChangeName = c => {
    this.setState({ name: c.target.value });
  };
  handleChangedescription = c => {
    this.setState({ description: c.target.value });
  };
  handleSubmit = async c => {
    c.preventDefault();
    const updatedCommittee = {
      name: c.target.name.value,
      description: c.target.description.value,
      page: c.target.page.value,
      team_members: c.target.team_members.value,
      events: c.target.events.value
    };
    console.log(updatedCommittee);
    try {
      await axios.put(
        `committee/${c.target.getAttribute("data-index")}`,
        updatedCommittee
      );
    } catch (error) {
      console.log(error);
    }
  };

  onDelete = e => {
    axios
      .delete("/committee/" + e.target.getAttribute("data-index"))
      .then(res => {
        console.log();
      })
      .catch(err => console.log(err));
  };

  handleChange = (event, value) => {
    this.setState({ value });
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
    const { classes } = this.props;
    const { value } = this.state;
    const { committee } = this.state;
    const committeeList = committee.length ? (
      committee.map(c => {
        return (
          <div className="center" key={c._id}>
            <Paper>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" color="primary">
                    {c.name} Committee
                  </Typography>
                  <Typography color="textSecondary">{c.page}</Typography>
                  <Typography component="p">{c.description}</Typography>
                </CardContent>

                <CardActions>
                  {localStorage.type === "mun_admin" ? (
                    <button
                      color="primary"
                      aria-label="Delete"
                      onClick={this.onDelete}
                      data-index={c._id}
                      style={{
                        backgroundColor: "#003255",
                        fontWeight: "bolitald",
                        color: "#ffffff",
                        size: "small",
                        blockSize: "small"
                      }}
                    >
                      Delete
                    </button>
                  ) : null}
                </CardActions>
              </Card>
            </Paper>
          </div>
        );
      })
    ) : (
      <div className="center"> No committees yet </div>
    );

    return (
      <div className="container">
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Executive Office" />
            <Tab label="Security Council" />
            <Tab label="General Assembly" />
            <Tab label="Secretary Office" />
          </Tabs>
        </AppBar>

        {value === 0 && (
          <TabContainer>
            <NavLink exact to="./executive" activeClassName="active">
              See more
            </NavLink>
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <NavLink exact to="./securitycouncil" activeClassName="active">
              See more
            </NavLink>
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <NavLink exact to="./generalassembly" activeClassName="active">
              See more
            </NavLink>
          </TabContainer>
        )}
        {value === 3 && (
          <TabContainer>
            <NavLink exact to="./secretaryoffice" activeClassName="active">
              See more
            </NavLink>
          </TabContainer>
        )}

        {/* <h1  className="center" >Committees </h1> */}
        <h4 className="center">{committeeList}</h4>
        {localStorage.type === "mun_admin" ? (
          <Fab color="primary" aria-label="Add" href="/textfield">
            <AddIcon />
          </Fab>
        ) : null}

        {localStorage.type === "mun_admin" ? (
          <Button
            href="/show"
            className="float-left"
            style={{
              backgroundColor: "#3F51B5",
              color: "#f4f4f4"
            }}
          >
            {" "}
            Show Messages{" "}
          </Button>
        ) : null}
      </div>
    );
  }
}

export default Committees;
