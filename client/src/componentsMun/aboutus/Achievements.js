import React, { Component } from "react";
//import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "../../axiosInstance";
import Collapsible from "react-collapsible";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper, CardContent, Card, CardActions } from "@material-ui/core";
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
      description: ""
      // photo: ""
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
  /*
  handleChangeDesc = ach => {
    this.setState({ question: ach.target.value });
  };
 
  handleSubmit1 = async ach => {
    ach.preventDefault();
    const updatedach = {
      description: ach.target.description.value
    };
    console.log(updatedach);
    try {
      await axios.put(`achievements/${ach.target.getAttribute("data-index")}`, updatedach);
      this.getAchievements();
    }
    catch (error) {
      console.log(error);
    }
  };*/
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

  // handleChangePhoto = event => {
  //   this.setState({ photo: event.target.value });
  // };
  handleSubmit = async event => {
    event.preventDefault();

    const Achievement = {
      description: this.state.description

      // photo: this.state.photo
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

  handleChangeDescription = event => {
    this.setState({ description: event.target.value });
  };
  handleSubmit1 = async ach => {
    ach.preventDefault();
    const updatedach = {
      description: ach.target.description.value
    };
    console.log(updatedach);
    try {
      await axios.put(`achievements/${ach.target.getAttribute("data-index")}`, updatedach);
      this.getAchievements();
    }
    catch (error) {
      console.log(error);
    }
  };

  /*render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <div>
        <h1>Achievements</h1>
        <br />
        <br />
        <Grid container className={classes.root} spacing={40}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={16}
          >

            {this.state.achievements.map(ach => (
              <Card className={Card} display="inline-block">
                <CardContent>
                  <div key={ach._id}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      gutterBottom
                    >

                      Description:
             {ach.description}
                      <br />
                      {/* Photo:
             {ach.photo} }
                    </Typography>
                  </div>

                </CardContent>
                {localStorage.type === "mun_admin" ? (
                  <CardActions>
                    <Fab color="primary" aria-label="Delete" size="sm" >

                      <Button onClick={this.onDelete} data-index={ach._id}>
                        <DeleteIcon />
                      </Button>
                    </Fab>
                  </CardActions>

                ) : null}

              </Card>

            ))}
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        {localStorage.type === "mun_admin" ? (
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

              {/* <label>
          Photo:
         <input
            type="text"
            name="photo"
            onChange={this.handleChangePhoto}
          />
        </label> }
              <button type="submit">Add</button>
            </form>
          </Collapsible>
        ) : null}

      </div>
    );
  }
}*/

  render() {
    return (
      <div>
        <h1>Achievements</h1>
        {this.state.achievements.map(ach => (
          <div key={ach._id}>
            <Paper>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2" color="primary">
                    <ul>
                      <label>Description: </label>
                      {ach.description},<label>Photo: </label>
                      {ach.photo}
                    </ul>
                  </Typography>
                  {localStorage.type === "mun_admin" ? (
                    <CardActions>
                      <button onClick={this.onDelete} data-index={ach._id}>
                        Delete
                    </button>
                      <form onSubmit={this.handleSubmit1} data-index={ach._id}>
                        Description:<input type="text" name="description" defaultValue={ach.description} />
                        <input type="submit" value="Edit" />
                      </form>
                    </CardActions>
                  ) : null}
                </CardContent>
              </Card>
            </Paper>
          </div>
        ))}
        {localStorage.type === "mun_admin" ? (
          <Collapsible

            trigger="Create new achievement"
          >
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
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(Achievements);
