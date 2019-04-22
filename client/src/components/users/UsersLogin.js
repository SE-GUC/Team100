import React, { Component } from "react"
import axios from "../../axiosInstance"
import Collapsible from "react-collapsible";
import setAuthToken from '../../helpers/setAuthToken'
import { ifError } from "assert";
//import { isNull } from "util";

class UserLogin extends Component {
    // constructor(props, context) {
    //     super(props, context);

    //     this.state = {
    //         x: ""
    //     };
    // }

    handleChangeEmail = event => {
        this.setState({ email: event.target.value })
    }

    handleChangePassword = event => {
        this.setState({ password: event.target.value })
    }

    handleSubmit = async event => {
        event.preventDefault();

        const user = {
            password: this.state.password,
            email: this.state.email
        };
        console.log(user);
        // console.log(user.token)
        try {
            console.log(process.env.REACT_APP_BASE_URL);
            const response = await axios.post(`/users/login`, user);
            const token = response.data.token
            localStorage.setItem("token", response.data.token);
            setAuthToken(token)
            // axios.defaults.headers['Authorization'] = response.data.token;
            // this.refreshUsers();
            alert("You are now logged in");
        } catch (error) {
            if(error.message === 'Request failed with status code 404')
                alert("Please enter a valid email")
            else if(error.message === 'Request failed with status code 400')
                alert("Password is incorrect")
            else
                alert(error.message);
        }
    };

    render() {
        return (
            <div>
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
            </div>
        )
    }
}
export default UserLogin
