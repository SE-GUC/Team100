import React, { Component } from "react";
//import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "../../axiosInstance";
import Collapsible from "react-collapsible";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

const styles = {
  card: {
    display: "inline-block",
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 25
  },
  pos: {
    marginBottom: 12
  }
};

class Announcements extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      announcements: [],
      description: "",
      date: new Date(),
      title: "",
      created_by: "",
      // videos: "",
      // photos: ""
    };
  }
  componentDidMount() {
    this.refreshAnnouncements();
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

  refreshAnnouncements() {
    fetch("api/announcements")
      .then(res => res.json())
      .then(announcements => {
        this.setState({ announcements: announcements.data });
      });
  }

  onDelete = e => {
    axios
      .delete(
        "http://localhost:5000/api/announcements/" +
        e.target.getAttribute("data-index")
      )
      .then(res => {
        console.log();
        this.refreshAnnouncements();
      })
      .catch(err => console.log(err));
  };
  handleChangeDescription = event => {
    this.setState({ description: event.target.value });
  };
  handleChangeTitle = event => {
    this.setState({ title: event.target.value });
  };
  handleChangeCreated = event => {
    this.setState({ created_by: event.target.value });
  };
  /*
  handleSubmit1 = async ann => {
    ann.preventDefault();
    const updatedann = {
      description: ann.target.description.value,
      title: ann.target.title.value,
      created_by: ann.target.created_by.value

    };
    console.log(updatedann);
    try {
      await axios.put(`announcements/${ann.target.getAttribute("data-index")}`, updatedann);
      this.getAchievements();
    }
    catch (error) {
      console.log(error);
    }
  };
  */
  handleSubmit = async event => {
    event.preventDefault();

    const Announcement = {
      description: this.state.description,
      date: this.state.date,
      title: this.state.title,
      created_by: this.state.created_by,
      // videos: this.state.videos,
      // photos: this.state.photos
    };
    console.log(Announcement);
    try {
      await axios.post(`announcements/`, Announcement);
      this.refreshAnnouncements();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h1>Announcements</h1>
        <br />
        <br />
        <Grid container className={classes.root} spacing={40}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={16}
          >
            {this.state.announcements.map(ann => (
              <Card className={Card} display="inline-block">
                <CardContent>
                  <div key={ann._id}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      gutterBottom
                    >
                      Description:
                      {ann.description}
                      <br />
                      Date:
                      {ann.date}
                      <br />
                      Title:
                      {ann.title}
                      <br />
                      Created by:
                      {ann.created_by} <br />
                      {/* Photos:
                      {ann.photos}
                      <br />
                      Videos:
                      {ann.videos} */}
                    </Typography>
                  </div>
                </CardContent>
                {localStorage.type === "hub_admin" ? (
                  <CardActions>
                    <Fab color="primary" aria-label="Delete">
                      <Button onClick={this.onDelete} data-index={ann._id}>
                        <DeleteIcon />
                      </Button>
                    </Fab>

                   { /*<form onSubmit={this.handleSubmit1} data-index={ann._id}>
Description:<input type="text" name="description" defaultValue={ann.description} />
Title:<input type="text" name="title" defaultValue={ann.title} />
Created By:<input type="text" name="created_by" defaultValue={ann.created_by} />

<input type="submit" value="Edit" />
                </form>*/}
                  </CardActions>
                ) : null}

              </Card>
            ))}
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        {localStorage.type === "hub_admin" ? (
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
              {/* <label>
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
            </label> */}
              <button type="submit">Add</button>
            </form>
          </Collapsible>
        ) : null}

      </div>
    );
  }
}
Announcements.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Announcements);
