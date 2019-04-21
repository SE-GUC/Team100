import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "../../axiosInstance";
import TextField from "material-ui/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Collapsible from "react-collapsible";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class recruitment extends Component {
  constructor() {
    super();

    this.state = {
      forms: [],
      name: "",
      birthdate: "",
      email: "",
      major: "",
      telephone_number: "",
      Year_of_Study: "",
      Means_of_Transportation: "",
      Council_Office1: "",
      Council_Office2: "",
      Previous_Experience: ""
    };
  }
  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };
  handleChangeBirthdate = event => {
    this.setState({ birthdate: event.target.value });
  };
  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };
  handleChangeMajor = event => {
    this.setState({ major: event.target.value });
  };
  handleChangeTelephone_number = event => {
    this.setState({ telephone_number: event.target.value });
  };
  handleChangeYear_of_Study = event => {
    this.setState({ Year_of_Study: event.target.value });
  };
  handleChangeMeans_of_Transportation = event => {
    this.setState({ Means_of_Transportation: event.target.value });
  };
  handleChangeCouncil_Office1 = event => {
    this.setState({ Council_Office1: event.target.value });
  };
  handleChangeCouncil_Office2 = event => {
    this.setState({ Council_Office2: event.target.value });
  };
  handleChangePrevious_Experience = event => {
    this.setState({ Previous_Experience: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();

    const RForm = {
      name: this.state.name,
      birthdate: this.state.birthdate,
      email: this.state.email,
      major: this.state.major,
      telephone_number: this.state.telephone_number,
      Year_of_Study: this.state.Year_of_Study,
      Means_of_Transportation: this.state.Means_of_Transportation,
      Council_Office1: this.state.Council_Office1,
      Council_Office2: this.state.Council_Office2,
      Previous_Experience: this.state.Previous_Experience
    };
    console.log(RForm);
    try {
      await axios.post(`/recruitmentforms/`, RForm);
    } catch (error) {
      this.setState({ error });
    }
  };

  getForms() {
    axios
      .get("/recruitmentforms/")
      .then(res => this.setState({ forms: res.data.data }))
      .then(console.log(this.state))
      .catch(err => console.log(err));
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const RForm = {
      name: this.state.name,
      birthdate: this.state.birthdate,
      email: this.state.email,
      major: this.state.major,
      telephone_number: this.state.telephone_number,
      Year_of_Study: this.state.Year_of_Study,
      Means_of_Transportation: this.state.Means_of_Transportation,
      Council_Office1: this.state.Council_Office1,
      Council_Office2: this.state.Council_Office2,
      Previous_Experience: this.state.Previous_Experience
    };
    console.log(RForm);
    try {
      axios.post(`/recruitmentforms/`, RForm);
    } catch (error) {
      this.setState({ error });
    }
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
                <h2>Recruitment Form</h2>

        <form className={classes.container}>
        <br/>
          <TextField
            name="name"
            hintText="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={e => this.change(e)}
            floatingLabelFixed
          />
          <br />
          <TextField
            name="birthdate"
            hintText="Birthdate"
            value={this.state.birthdate}
            onChange={e => this.change(e)}
            floatingLabelFixed
          />
          <br />
          <TextField
            name="email"
            hintText="Email"
            value={this.state.email}
            onChange={e => this.change(e)}
            floatingLabelFixed
          />
          <br />
          <TextField
            name="major"
            hintText="Major"
            value={this.state.major}
            onChange={e => this.change(e)}
            floatingLabelFixed
          />
          <br />
          <TextField
            name="telephone_number"
            hintText="Telephone Number"
            value={this.state.telephone_number}
            onChange={e => this.change(e)}
            floatingLabelFixed
          />
          <br />
          <TextField
            name="Year_of_Study"
            hintText="Year of Study"
            value={this.state.Year_of_Study}
            onChange={e => this.change(e)}
            floatingLabelFixed
          />
          <br />
          <TextField
            name="Means_of_Transportation"
            hintText="Means of Transportation"
            value={this.state.Means_of_Transportation}
            onChange={e => this.change(e)}
            floatingLabelFixed
          />
          <br />
          <TextField
            name="Council_Office1"
            hintText="Council/Office First Preference"
            value={this.state.Council_Office1}
            onChange={e => this.change(e)}
            floatingLabelFixed
          />
          <br />
          <TextField
            name="Council_Office2"
            hintText="Council/Office Second Preference"
            value={this.state.Council_Office2}
            onChange={e => this.change(e)}
            floatingLabelFixed
          />
          <br />
          <TextField
            name="Previous_Experience"
            hintText="Previous Experience"
            value={this.state.Previous_Experience}
            onChange={e => this.change(e)}
            floatingLabelFixed
          />
          <br />
          <Button label="Submit" onClick={e => this.onSubmit(e)}>
            Submit{" "}
          </Button>
        </form>

       

        <Collapsible trigger="All Responses" onClick={this.getForms()}  >
        {this.state.forms.map(ach => (
          <div key={ach._id}>
            <li>
              {ach.name},{ach.birthdate},{ach.email},{ach.major},
              {ach.telephone_number},{ach.Year_of_Study},
              {ach.Means_of_Transportation},{ach.Council_Office1},
              {ach.Council_Office2},{ach.Previous_Experience}
            </li>
          </div>
        ))}
        </Collapsible>
      </div>
    );
  }
}
recruitment.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(recruitment);
