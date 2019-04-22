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
    axios.get("http://localhost:5000/api/committee").then(res => {
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

  // refreshCommittees() {

  //   fetch("http://localhost:5000/api/committee")
  //     .then(res => res.json())
  //     .then(c => {
  //       this.setState({ c: c.data });
  //     });
  // }
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
      .delete(
        "http://localhost:5000/api/committee/" +
          e.target.getAttribute("data-index")
      )
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
                  <Fab
                    color="primary"
                    aria-label="Delete"
                    onClick={this.onDelete}
                    data-index={c._id}
                  >
                    <DeleteIcon />
                  </Fab>

                  {/* <Button color="primary" onClick={this.handleSubmit} data-index={c.name}  >
                Update 
                </Button> */}
                  <div>
                    {/* <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Updatee
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          onSubmit={this.handleSubmit}
          aria-labelledby="form-dialog-title"
          data-index={c.name}
        >
          <DialogTitle id="form-dialog-title">Update Committee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To update  committee please fill in the required data
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Committee Name"
              type="text"
              onChange={this.handleChangeName}
              fullWidth
            />
             <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Committee Description"
              type="text"
            onChange={this.handleChangedescription}
              fullWidth
            />
            
          </DialogContent>
          <DialogActions>
            <button onClick={this.handleClose} color="primary">
              Cancel
            </button>
            <button onClick={this.handleSubmit} color="primary" type="submit" data-index={c.name} >
              update
            </button>
          </DialogActions>
        </Dialog> */}
                  </div>
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
            <Tab label="HR" />
            <Tab label="PR" />
            <Tab label="Executive Office" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            {" "}
            <HR />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            {" "}
            <PR />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            {" "}
            <EXECUTIVE />{" "}
          </TabContainer>
        )}
        {/* <h1  className="center" >Committees </h1> */}
        <h4 className="center">{committeeList}</h4>

        <Fab color="primary" aria-label="Add" href="/textfield">
          <AddIcon />
        </Fab>

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
      </div>
    );
  }
}

export default Committees;
