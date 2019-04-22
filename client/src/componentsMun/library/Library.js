import React, { Component } from "react";
import axios from "axios";
import Collapsible from "react-collapsible";
import { NavLink, Switch, Route } from "react-router-dom";

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
  Tab,
  Card,
  Fab
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

const mainBg = {
  backgroundImage: 'url("./images/1.jpg")',
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "right"
};
class Library extends Component {
  constructor() {
    super();
    this.state = {
      libraries: [],
      Academic_paper: "",
      Resolution: "",
      Year: ""
    };
  }
  componentDidMount() {
    this.refreshLibraries();
    document.body.style = { mainBg };
  }

  refreshLibraries() {
    axios("/api/libraries")
      .then(res => {
        console.log(res.data.data);
        this.setState({ libraries: res.data.data });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }
  onDelete = e => {
    axios
      .delete("api/libraries/" + e.target.getAttribute("data-index"))
      .then(res => {
        console.log();
        this.refreshLibraries();
      })
      .catch(err => console.log(err));
  };
  handleChangeAcademicPaper = x => {
    this.setState({ Academic_paper: x.target.value });
  };
  handleChangeResolution = x => {
    this.setState({ Resolution: x.target.value });
  };
  handleChangeYear = x => {
    this.setState({ Year: x.target.value });
  };
  onCreateA = async Academicpaper => {
    Academicpaper.preventDefault();

    const x = {
      Academic_paper: this.state.Academic_paper,
      Year: this.state.Year
    };
    console.log(x);
    try {
      await axios.post("api/libraries/AcademicPaper", x);
      this.refreshLibraries();
    } catch (error) {
      console.log(error);
    }
  };
  onCreateR = async Resolution => {
    Resolution.preventDefault();

    const x = {
      Resolution: this.state.Resolution,
      Year: this.state.Year
    };
    console.log(x);
    try {
      await axios.post("api/libraries/Resolution", x);
      this.refreshLibraries();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h2>MUN's Academic Library</h2> <br />
        {localStorage.type==="mun_admin"?(
        <Collapsible
          trigger={
            <Fab color="primary" aria-label="Add">
              <AddIcon />
            </Fab>
          }
        >
          <form onSubmit={this.onCreateA}>
            <label>
              AcademicPaper:
              <input
                type="text"
                name="Academic Paper"
                onChange={this.handleChangeAcademicPaper}
              />
            </label>
            <label>
              Year:
              <input type="text" name="year" onChange={this.handleChangeYear} />
            </label>
            <input type="submit" value="Add" />
          </form>
          <form onSubmit={this.onCreateR}>
            <label>
              Resolution:
              <input
                type="text"
                name="Resolution"
                onChange={this.handleChangeResolution}
              />
            </label>
            <label>
              Year:
              <input type="text" name="year" onChange={this.handleChangeYear} />
            </label>
            <input type="submit" value="Add" />
          </form>
        </Collapsible>
        ):null
        }
        {
          <ul>
            {this.state.libraries.map(c => (
              <div className="center" key={c._id}>
                <Paper>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="h2" color="primary">
                        Press link to read  :
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.location.href = `//${c.Academic_paper}`;
                          }}
                        />
                        {c.Academic_paper}
                       
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.location.href = `//${c.Resolution}`;
                          }}
                        >
                          {c.Resolution}
                        </a>{" "}
                        <br />

                       year :  {c.Year} <br />
                      </Typography>
                      {localStorage.type==="mun_admin"?(

                      <button onClick={this.onDelete} data-index={c._id}>
                        Delete
                      </button>
                      ):null}
                    </CardContent>
                  </Card>
                </Paper>
              </div>
            ))}
          </ul>
        }
      </div>
    );
  }
}

export default Library;
