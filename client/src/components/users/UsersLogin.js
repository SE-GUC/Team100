import React, { Component } from "react";
import axios from "../../axiosInstance";
import Collapsible from "react-collapsible";
import setAuthToken from "../../helpers/setAuthToken";
//import { isNull } from "util";

class UserLogin extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      x: "",
      user: {},
      id: "",
      name: "",
      user_type: "",
      major:"",
      committee_type: "",
      gucian: "",
      control: ""
    };
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const user = {
      password: this.state.password,
      email: this.state.email
    };
    console.log(user);
    try {
      console.log(process.env.REACT_APP_BASE_URL);
      const response = await axios.post(`/users/login`, user);
      const token = response.data.token;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.id);
      setAuthToken(token);
      this.setState({
        id: response.data.id,
        user_type: response.data.user_type
      });
    } catch (error) {
      console.log(error);
    }
  };
  logout() {
    localStorage.clear();
  }
  show = event => {
    event.preventDefault();
    axios.get(`users/${localStorage.getItem("user")}`).then(user => {
      this.setState({ user: user.data.User });
      var x = user.data.User;
      console.log(x);
    });
  };

  // information = req => {
  //     this.setState({ id: req.user.id })
  // }

  // show = async event => {
  //     event.preventDefault();
  //     const { query } = this.state;
  //     if (query === '') {
  //         return
  //     }
  //     const cachedHits = localStorage.getItem(query)
  //     if (cachedHits) {
  //         this.setState({ hits: JSON.parse(cachedHits) })
  //     }
  //     // console.log(process.env.REACT_APP_BASE_URL);
  //     axios.get(`/users/${this.cachedHits.id}`).then(res => {

  //     })
  //     // this.setState({
  //     //     user: localStorage.getItem("token")
  //     // })
  //     // console.log(this.localStorage)
  //     // let token = localStorage.getItem("token");
  //     // console.log(token.name)
  // };

  render() {
    const { user } = this.state;
    let userProfile = '';
    if (user) {
      userProfile = <h2>{user.name} <br/> {user.email}  <br/>
      {user.major}  <br/>
      {user.committee_type}  <br/>
     {user.user_type}
      </h2>
    }
    return (
      <div>
        {localStorage.length === 0 ? (
          <Collapsible trigger="Login">
            <form onSubmit={this.handleSubmit}>
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  onChange={this.handleChangeEmail}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChangePassword}
                />
              </label>
              <button type="submit">Login</button>
            </form>
          </Collapsible>
        ) : null}

        {localStorage.length > 0 ? (
          <form onSubmit={this.logout}>
            <label>
              <button type="submit">Logout</button>
            </label>
          </form>
        ) : null}
        {localStorage.length > 0 ? (
          <form onSubmit={this.show}>
            <label>
              <button type="submit">Show profile</button>
            </label>
          </form>
        ) : null}
        {userProfile}
      </div>
    );
  }
  // render() {
  //     if (this.props.handleSubmit) {
  //         return (
  //             <div>
  //                 <form onSubmit={this.logout}>
  //                     <label>
  //                         <button type="submit">Logout</button>
  //                     </label>
  //                 </form>
  //             </div>
  //         )
  //     }
  // }
}
export default UserLogin;
