import React, { Component } from "react";
import axios from "../../axiosInstance";
import Collapsible from "react-collapsible";
import setAuthToken from "../../helpers/setAuthToken";
//import { isNull } from "util";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

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
    // show = event => {
    //     event.preventDefault();
    //     axios.get(`users/${localStorage.getItem("id")}`).then(user => {
    //         this.setState({ user: user.data.User });
    //         var x = user.data.User;
    //         console.log(x);
    //     });
    // };

    // delete = event => {
    //     event.preventDefault()
    //     axios.delete(`users/${localStorage.getItem("id")}`).then(user => {
    //         this.setState({ user: user.data.deletedUser })
    //     }
    //     )
    //     //   console.log(response.data)
    //     console.log("Deleted successfully")
    //     localStorage.clear();
    // }
    render() {
        // const { user } = this.state;
        // let userProfile = '';
        // if (user) {
        //     userProfile = <p>
        //         {user.name}<br />
        //         {user.email}<br />
        //         {user.user_type}<br />
        //     </p>
        // }
        return (

            <div>
                {localStorage.length === 1 ? (
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
                {localStorage.length === 1 ? (
                    <Collapsible trigger="Register">

                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>Sign up!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <InputGroup size="sm" className="Register">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-sm">
                                            Email
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        onChange={this.handleChangeEmail}
                                        required={true}
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </InputGroup>
                                <br />
                                <InputGroup size="sm" className="Users">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-sm">
                                            Password
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        onChange={this.handleChangePassword}
                                        required={true}
                                        type="password"
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </InputGroup>
                                <br />
                                <InputGroup size="sm" className="Users">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-sm">
                                            Name
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        onChange={this.handleChangeName}
                                        required={true}
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </InputGroup>
                                <br />
                                <InputGroup size="sm" className="Users">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-sm">
                                            Major
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        onChange={this.handleChangeMajor}
                                        required={true}
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </InputGroup>
                                <br />
                                <InputGroup size="sm" className="Users">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-sm">
                                            GUCIAN
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        onChange={this.handleChangeGucian}
                                        required={true}
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </InputGroup>
                                <br />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="warning" onClick={this.register}>
                                    Register
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Collapsible>
                ) : null}

                {localStorage.length > 1 ? (
                    <form onSubmit={this.logout}>
                        <label>
                            <button type="submit">Logout</button>
                        </label>
                    </form>
                ) : null
                }
                {/* {localStorage.length > 0 ? (
                    <form onSubmit={this.delete}>
                        <label>
                            <button type="submit">Delete your account</button>
                        </label>
                    </form>
                ) : null
                } */}
                {/* {localStorage.length > 0 ? (
                    <form onSubmit={this.show}>
                        <label>
                            <button type="submit">Show profile</button>
                        </label>
                        {this.state.users}
                    </form>
                ) : null
                }
                {userProfile} */}
            </div>
        )
    }
}
export default UserLogin;
