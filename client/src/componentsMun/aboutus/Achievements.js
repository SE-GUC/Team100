import React, { Component } from "react";
//import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "../../axiosInstance";
import Collapsible from "react-collapsible";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

class Achievements extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      achievements: [],
      description: "",
      photo: ""
    };
  }
  componentDidMount() {
    this.getAchievements();
  }
  getAchievements() {
    fetch("/api/achievements")
      .then(res => res.json())
      .then(achievements => {
        this.setState({ achievements: achievements.data });
        console.log(this.state);
      });
  }

  onDelete = e => {
    axios
      .delete(
        "http://localhost:5000/api/achievements/" +
        e.target.getAttribute("data-index")
      )
      .then(res => {
        console.log();
        this.getAchievements();
        alert(res.data.message);
      })
      .catch(err => alert("Unauthorized"));
  };
  handleChangeDescription = event => {
    this.setState({ description: event.target.value });
  };

  handleChangePhoto = event => {
    this.setState({ photo: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();

    const Achievement = {
      description: this.state.description,

      photo: this.state.photo
    };
    console.log(Achievement);
    try {
      await axios.post(`achievements/`, Achievement).then(res => {
      this.getAchievements();
      alert(res.data.message);
      })
    } catch (error) {
      if (error.message === "Request failed with status code 404")
        alert("Please enter valid inputs");
      else if (error.message === "Request failed with status code 401")
        alert("You are unauthorized");
      else alert(error.message);
    }
  };

  render() {
    return (
      <div>
        <h1>Achievements</h1>
        {this.state.achievements.map(ach => (
          <div key={ach._id}>
            <li>
              <label>Description: </label>
              {ach.description},<label>Photo: </label>
              {ach.photo}
              {
                <button onClick={this.onDelete} data-index={ach._id}>
                  Delete
               </button>
              }
            </li>
          </div>
        ))}
        <Collapsible trigger="Create new achievement">
          <form onSubmit={this.handleSubmit}>
            <label>
              Description:
             <input
                type="text"
                name="description"
                onChange={this.handleChangeDescription}
              />
            </label>

            <label>
              Photo:
             <input
                type="text"
                name="photo"
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

export default withStyles(styles)(Achievements);


