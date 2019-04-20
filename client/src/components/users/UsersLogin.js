import React, { Component } from "react"
import axios from "../../axiosInstance"
import Collapsible from "react-collapsible";
import setAuthToken from '../../helpers/setAuthToken'
//import { isNull } from "util";

class UserLogin extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            id: "",
            name: "",
            user_type: ""
        };
    }

    handleChangeEmail = event => {
        this.setState({ email: event.target.value })
    }

    handleChangePassword = event => {
        this.setState({ password: event.target.value })
    }

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
    handleChangePhone = event => {
        this.setState({ telephone: event.target.value })
    }
    handleChangeBirthdate = event => {
        this.setState({ birthdate: event.target.value })
    }
    handleChangeGucian = event => {
        this.setState({ gucian: event.target.value })
    }

    register = async event => {
        event.preventDefault()
        const user = {
            password: this.state.password,
            email: this.state.email,
            name: this.state.name,
            // birthdate: this.state.birthdate,
            major: this.state.major,
            gucian: this.state.gucian,
            telephone: this.state.telephone
        }
        //  console.log(user)
        try {
            //   console.log(process.env.REACT_APP_BASE_URL);
            await axios.post(`/users/register`, user);
            // const token = response.data.token
            // localStorage.setItem("token", response.data.token);
            // localStorage.setItem("user", response.data.id);
            // setAuthToken(token);
            // this.setState({
            //     id: response.data.id,
            //     user_type: response.data.user_type
            // });
            // console.log(this.state)
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
            const token = response.data.token
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.id);
            setAuthToken(token);
            this.setState({
                id: response.data.id,
                user_type: response.data.user_type
            });
            console.log(this.state)
        } catch (error) {
            console.log(error);
        }
    };
    logout() {
        localStorage.clear();
    }
    show = event => {
        event.preventDefault()
        axios.get(`users/${localStorage.getItem("user")}`).then(res => {
            const body = res.data
            console.log(body)

        })
    }

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
                            <label>
                                Telephone:
                        <input
                                    type="number"
                                    name="number"
                                    onChange={this.handleChangePhone}
                                />
                            </label>
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
                    <form onSubmit={this.show}>
                        <label>
                            <button type="submit">Show profile</button>
                        </label>
                        {this.state.users}
                    </form>
                ) : null
                }
            </div>
        )
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
export default UserLogin
