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
            major: "",
            committee_type: "",
            gucian: "",
            control: ""
        };
    }

    handleChangeEmail = event => {
        this.setState({ emailr: event.target.value });
    };

    handleChangePassword = event => {
        this.setState({ passwordr: event.target.value });
    };

    handleEnterEmail = event => {
        this.setState({ email: event.target.value })
    }
    handleEnterPassword = event => {
        this.setState({ password: event.target.value })
    }
    handleChangeName = event => {
        this.setState({ name: event.target.value })
    }
    handleChangeMajor = event => {
        this.setState({ major: event.target.value })
    }
    // handleChangePhone = event => {
    //     this.setState({ telephone: event.target.value })
    // }
    // handleChangeBirthdate = event => {
    //     this.setState({ birthdate: event.target.value })
    // }
    handleChangeGucian = event => {
        this.setState({ gucian: event.target.value })
    }
    register = async event => {
        event.preventDefault()
        const user = {
            password: this.state.passwordr,
            email: this.state.emailr,
            name: this.state.name,
            // birthdate: this.state.birthdate,
            major: this.state.major,
            gucian: this.state.gucian,
            // telephone: this.state.telephone
        }
        //  console.log(user)
        try {
            console.log(process.env.REACT_APP_BASE_URL);
            const response = await axios.post(`/users/register`, user);
            const token = response.data.token
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("type", response.data.user_type)
            setAuthToken(token);
            this.setState({
                id: response.data.id,
                user_type: response.data.user_type
            });
            console.log(response.data)
            console.log(this.state)
        } catch (error) {
            console.log(error);
        }
    }
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
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("type", response.data.user_type)
            setAuthToken(token);
            this.setState({
                id: response.data.id,
                user_type: response.data.user_type
            });
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
    logout() {
        localStorage.clear();
    }
    show = event => {
        event.preventDefault();
        axios.get(`users/${localStorage.getItem("id")}`).then(user => {
            this.setState({ user: user.data.User });
            var x = user.data.User;
            console.log(x);
        });
    };

    delete = event => {
        event.preventDefault()
        axios.delete(`users/${localStorage.getItem("id")}`).then(user => {
            this.setState({ user: user.data.deletedUser })
        }
        )
        //   console.log(response.data)
        console.log("Deleted successfully")
        localStorage.clear();
    }

    // onDelete = e => {
    //     axios
    //       .delete(`users/${localStorage.getItem("user")}` +
    //         e.target.getAttribute("data-index")
    //       )
    //       .then(
    //         res => {
    //           localStorage.clear()
    //           console.log("Deleted successfully");
    //         }
    //       )
    //       .catch(err => console.log(err))
    //   };


    render() {
        const { user } = this.state;
        let userProfile = '';
        if (user) {
            userProfile = <p>
                {user.name}<br />
                {user.email}<br />
                {/* {user.major}<br />
                {user.gucian}<br />
                {user.committee_type}<br />
                {user.club}<br />
        {user.telephone}<br />*/}
                {user.user_type}<br />
            </p>

            // <h2> {user.name} <br /> {user.email}  <br />
            //      {user.major}  <br />
            //     {user.committee_type}  <br />
            //     {user.user_type}
            // </h2>
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
                                    onChange={this.handleEnterEmail}
                                />
                            </label>
                            <label>
                                Password:
                        <input
                                    type="password"
                                    name="password"
                                    onChange={this.handleEnterPassword}
                                />
                            </label>
                            <button type="submit">Login</button>
                        </form>
                    </Collapsible>
                ) : null}
                {localStorage.length === 0 ? (
                    <Collapsible trigger="Register">
                        <form onSubmit={this.register}>
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
                            <label>
                                Name:
                        <input
                                    type="text"
                                    name="name"
                                    onChange={this.handleChangeName}
                                />
                            </label>
                            {/* <label>
                                Telephone:
                        <input
                                    type="number"
                                    name="number"
                                    onChange={this.handleChangePhone}
                                />
                            </label> */}
                            <label>
                                Major:
                        <input
                                    type="text"
                                    name="major"
                                    onChange={this.handleChangeMajor}
                                />
                            </label>
                            {/* <label>
                                Birthdate:
                        <input
                                    type="date"
                                    name="date"
                                    onChange={this.handleChangeBirthdate}
                                />
                            </label> */}
                            <label>
                                GUCIAN:
                        <input
                                    type="boolean"
                                    name="gucian"
                                    onChange={this.handleChangeGucian}
                                />
                            </label>
                            <button type="submit">Sign up</button>
                        </form>
                    </Collapsible>
                ) : null}

                {localStorage.length > 0 ? (
                    <form onSubmit={this.logout}>
                        <label>
                            <button type="submit">Logout</button>
                        </label>
                    </form>
                ) : null
                }
                {localStorage.length > 0 ? (
                    <form onSubmit={this.delete}>
                        <label>
                            <button type="submit">Delete your account</button>
                        </label>
                    </form>
                ) : null
                }
                {localStorage.length > 0 ? (
                    <form onSubmit={this.show}>
                        <label>
                            <button type="submit">Show profile</button>
                        </label>
                        {this.state.users}
                    </form>
                ) : null
                }
                {userProfile}
            </div>
        )
    }
}
export default UserLogin;
