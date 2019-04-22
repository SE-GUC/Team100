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
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid } from "@material-ui/core";

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

  onDelete = e => {
    axios
      .delete(
        "http://localhost:5000/api/achievements/" +
        e.target.getAttribute("data-index")
      )
      .then(res => {
        console.log();
        this.getAchievements();
      })
      .catch(err => console.log(err));
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
      description: this.state.description,

      // photo: this.state.photo
    };
    console.log(Achievement);
    try {
      await axios.post(`achievements/`, Achievement);
      this.getAchievements();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
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
             {ach.photo} */}
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
        </label> */}
              <button type="submit">Add</button>
            </form>
          </Collapsible>
        ) : null}

      </div>
    );
  }
}
Achievements.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Achievements);


