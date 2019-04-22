import React, { Component } from "react";
import axios from "axios";
import Collapsible from "react-collapsible";
import { Typography, Paper, CardContent, Card, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

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

  sortCaseNum = async e => {
    var temp;
    var formTemp = this.state.libraries;
    for (var i = 1; i < formTemp.length; i++) {
      for (var j = i; j > 0; j--) {
        if (formTemp[j].caseNumber < formTemp[j - 1].caseNumber) {
          temp = formTemp[j];
          formTemp[j] = formTemp[j - 1];
          formTemp[j - 1] = temp;
        }
      }
    }
    this.setState({
      libraries: formTemp
    });
  };

  refreshLibraries() {
    axios("/api/libraries")
      .then(res => {
        console.log(res.data.data);
        this.setState({ libraries: res.data.data });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }

  sortAscending() {
    axios("/api/libraries/sortA")
      .then(res => {
        this.setState({ libraries: res.data.data });
      })
      .catch(err => console.log(err));
  }

  sortDescending() {
    axios("/api/libraries/sortD")
      .then(res => {
        this.setState({ libraries: res.data.data });
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
        {localStorage.type === "mun_admin" ? (
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
                <input
                  type="text"
                  name="year"
                  onChange={this.handleChangeYear}
                />
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
                <input
                  type="text"
                  name="year"
                  onChange={this.handleChangeYear}
                />
              </label>
              <input type="submit" value="Add" />
            </form>
          </Collapsible>
        ) : null}
        {
          <ul>
            {this.state.libraries.map(c => (
              <div className="center" key={c._id}>
                <Paper>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="h2" color="primary">
                        Press link to read :
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.location.href = `//${c.Academic_paper}`;
                          }}
                        >
                          {c.Academic_paper}
                        </a>
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.location.href = `//${c.Resolution}`;
                          }}
                        >
                          {c.Resolution}
                        </a>{" "}
                        <br />
                        Year : {c.Year} <br />
                      </Typography>
                      {localStorage.type === "mun_admin" ? (
                        <button onClick={this.onDelete} data-index={c._id}>
                          Delete
                        </button>
                      ) : null}
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
