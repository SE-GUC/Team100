import axios from "axios";
import React, { Component } from "react";
import Collapsible from "react-collapsible";
import Link from '@material-ui/core/Link';
import { Nav} from 'react-bootstrap';

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
      .delete(
        "http://localhost:5000/api/libraries/" +
        e.target.getAttribute("data-index")
      )
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
  handleSubmitA = async x => {
    x.preventDefault();
    const library = {
      Academic_paper: this.state.Academic_paper,
      Year: this.state.Year
    };
    console.log(library);
    try {
      await axios.post("api/libraries/AcademicPaper", library);
      this.refreshLibraries();
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmitR = async x => {
    x.preventDefault();
    const library = {
      Resolution: this.state.Resolution,
      Year: this.state.Year
    };
    console.log(library);
    try {
      await axios.post("api/libraries/Resolution", library);
      this.refreshLibraries();
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div>
        <h2>MUN's Academic Library</h2>
        {
          <ul>
            {this.state.libraries.map(l => (
              <div key={l._id}>
               
               <a style={{ cursor: 'pointer' }} onClick={() => window.location.href= l.Academic_paper } />
          
    {l.Academic_paper}

<a  style={{ cursor: 'pointer' }} onClick={() => { window.location.href = `//${l.Resolution}`; } }>
    {l.Resolution}
</a>
                  {l.Year}
         
                <button onClick={this.onDelete} data-index={l._id}>
                  DELETE
                </button>
              </div>
            ))}
          </ul>
        }
        <Collapsible trigger="click here to upload a  new Academic Paper">
          <form onSubmit={this.handleSubmitA}>
            <label>
              AcademicPaper:
              {"       "}
              <input
                type="text"
                name="Academic Paper"
                onChange={this.handleChangeAcademicPaper}
              />
            </label>
            {"      "}
            <label>
              Year:
              {"     "}
              <input
                type={Number}
                name="Year"
                onChange={this.handleChangeYear}
              />
            </label>
            {"      "}
            <button type="submit"> Upload </button>
          </form>
        </Collapsible>
        <Collapsible trigger="click here to upload a  new Resolution">
          <form onSubmit={this.handleSubmitR}>
            {"      "}
            <label>
              Resolution:
              {"       "}
              <input
                type="text"
                name="Resolution"
                onChange={this.handleChangeResolution}
              />
            </label>
            <label>
              Year:
              {"     "}
              <input
                type={Number}
                name="Year"
                onChange={this.handleChangeYear}
              />
            </label>
            {"      "}
            <button type="submit"> Upload </button>
          </form>
        </Collapsible>
      </div>
    );
  }
}

export default Library;
