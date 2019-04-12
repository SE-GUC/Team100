import React, { Component } from "react"
import axios from "../../axiosInstance"
import Collapsible from "react-collapsible";
//import { isNull } from "util";

class Login extends Component {

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
        console.log(user.token)
        try {
            await axios.post(`/users/login`, user);
            // this.refreshUsers();
        } catch (error) {
            console.log(error);
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
                                type="text"
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
export default Login
