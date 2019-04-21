import React, { Component } from "react";
import ReactDOM from 'react-dom';
import VoxeetConference from '@voxeet/react-components';

class livestream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      users: [
        { id: "5c956ad3eb6c712a48fd7605", name: "yomna" },
        { id: "5cbb470e1c9d44000097f1ed", name: "alll" },
        { id: "5caccbf94c3b1a4fd45066d7", name: "yara" },
        { id: "5cbb32cb8e6ba84e20b3d0f6", name: "doha" },
        { id: "5cb0f40276033b3dfcdb5973", name: "ahmed" }
      ],

      form: {
        conferenceName: "conference_name",
        userName: "yomna",
        externalId: "5c956ad3eb6c712a48fd7605"
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  handleChange(e) {
    const { form } = this.state;
    form[e.target.name] = e.target.value;
    this.setState({ form });
  }

  handleChangeSelect(e) {
    const { form } = this.state;
    form[e.target.name] = e.target.value;
    this.state.users.map((x, i) => {
      if (x.name == e.target.value) {
        form.externalId = x.id;
      }
    });
    this.setState({ form });
  }

  handleOnLeave() {
    ReactDOM.unmountComponentAtNode(document.getElementById("voxeet-widget"));
    this.setState({
      isSubmit: false,
      form: {
        conferenceName: "conference_name",
        userName: "yomna",
        externalId: "5c956ad3eb6c712a48fd7605"
      }
    });
    window.location.reload();
  }

  handleClick() {
    this.setState({ isSubmit: true });
  }

  render() {
    if (this.state.isSubmit) {
      return (
        <div>
          <div className="content-sample">
           
            <div className="blockInput">
              <div className="block-conference-name">
                <label htmlFor="conferenceName">Conference name</label>
                <input
                  disabled
                  name="conferenceName"
                  value={this.state.form.conferenceName}
                  onChange={this.handleChange}
                  id="conferenceName"
                />
              </div>
              <div className="block-user-name">
                <label htmlFor="userName">Select a user</label>

                <select
                  disabled
                  name="userName"
                  onChange={this.handleChangeSelect}
                >
                  {this.state.users.map((x, i) => (
                    <option key={i}>{x.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="blockButton">
              <button
                className="button-disabled"
                type="button"
                disabled
                onClick={this.handleClick.bind(this)}
              >
                Start
              </button>
            </div>
          </div>
          <div className="copyright">Voxeet © 2018 All rights reserved</div>
          <VoxeetConference
            handleOnLeave={this.handleOnLeave.bind(this)}
            externalId={this.state.form.externalId}
            userName={this.state.form.userName}
            conferenceName={this.state.form.conferenceName}
          />
        </div>
      );
    }

    return (
      <div>
        <div className="content-sample">
          
          <div className="blockInput">
            <div className="block-conference-name">
              <label htmlFor="conferenceName">Conference name</label>
              <input
                name="conferenceName"
                value={this.state.form.conferenceName}
                onChange={this.handleChange}
                id="conferenceName"
              />
            </div>
            <div className="block-user-name">
              <label htmlFor="userName">Select a user</label>

              <select name="userName" onChange={this.handleChangeSelect}>
                {this.state.users.map((x, i) => (
                  <option key={i}>{x.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="blockButton">
            <button onClick={this.handleClick.bind(this)}>Start</button>
          </div>
        </div>
        <div className="copyright">Voxeet © 2018 All rights reserved</div>
      </div>
    );
  }
}

export default livestream;
