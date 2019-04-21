import React, { Component } from "react";
import { Modal, Button, ListGroup, Image } from "react-bootstrap";
import axios from "../../axiosInstance";
import DeleteIcon from "@material-ui/icons/Delete";
import { Fab } from "@material-ui/core";
import Collapsible from "react-collapsible";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import editicon from "../../images/editicon.png";

class UserAdd extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
            photo: "",
            name: "",
            email: "",
            club: "",
            major: "",
            telephone: "",
            committee_type: "",
            user_type: "",
            // birthdate: "",
            control: "",
            gucian: ""
        };
    }
    refreshUser() {
        axios.get(`users/${localStorage.getItem("id")}`).then(res => {
            this.setState({
                photo: res.data.User.photo,
                name: res.data.User.name,
                email: res.data.User.email,
                telephone: res.data.User.telephone,
                club: res.data.User.club,
                committee_type: res.data.User.committee_type,
                major: res.data.User.major,
                birthdate: res.data.User.birthdate,
                user_type: res.data.User.user_type,
                control: res.data.User.control,
                gucian: res.data.User.control
            });
            console.log(
                this.state.name,
                this.state.photo,
                this.state.major,
                this.state.club,
                this.state.email,
                this.state.telephone,
                this.state.committee_type,
                this.state.user_type,
                this.state.birthdate,
                this.state.control,
                this.state.gucian
            );
        });
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    };
    handleChangeEmail = event => {
        this.setState({ email: event.target.value });
    };
    handleChangePassword = event => {
        this.setState({ password: event.target.value });
    };
    handleChangeTelephone = event => {
        this.setState({ telephone: event.target.value });
    };
    handleChangeClub = event => {
        this.setState({ club: event.target.value });
    };
    handleChangeCommitte = event => {
        this.setState({ committee_type: event.target.value });
    };
    handleChangeMajor = event => {
        this.setState({ major: event.target.value });
    };
    handleChangeGucian = event => {
        this.setState({ gucian: event.target.value });
    };
    handleChangeControl = event => {
        this.setState({ control: event.target.value });
    };
    handleChangeUserType = event => {
        this.setState({ user_type: event.target.value });
    };

    handleSubmit = async event => {
        const User = {
            name: this.state.name,
            email: this.state.email,
            major: this.state.major,
            telephone: this.state.telephone,
            user_type: this.state.user_type,
            password: this.state.password,
            club: this.state.club,
            committee_type: this.state.club,
            control: this.state.control,
            gucian: this.state.control
        };
        console.log(User);
        try {
            const response = await axios.post(`users/add`, User).then(res => {
                // this.handleClose();
                this.refreshUser();
                this.setState({
                    id: response.data.id,
                    user_type: response.data.user_type
                });
            });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <Collapsible trigger="Click here to add new user">
                {/* // trigger={
                //     <img
                //         style={{ width: 45, height: 45 }}
                //         src={editicon}
                //         alt="img"
                //     />
                // } */}

                <form>
                    <TextField
                        id="outlined-name"
                        label="Name"
                        defaultValue={this.state.name}
                        onChange={this.handleChangeName}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Email"
                        defaultValue={this.state.email}
                        onChange={this.handleChangeEmail}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Password"
                        defaultValue={this.state.password}
                        onChange={this.handleChangePassword}
                        margin="normal"
                        variant="outlined"
                        type="password"
                    />
                    <TextField
                        id="outlined-name"
                        label="Telephone"
                        defaultValue={this.state.telephone}
                        onChange={this.handleChangeTelephone}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Club"
                        defaultValue={this.state.club}
                        onChange={this.handleChangeClub}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="User Type"
                        defaultValue={this.state.user_type}
                        onChange={this.handleChangeUserType}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Committee"
                        defaultValue={this.state.committee_type}
                        onChange={this.handleChangeCommitte}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Control"
                        defaultValue={this.state.control}
                        onChange={this.handleChangeControl}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Major"
                        defaultValue={this.state.major}
                        onChange={this.handleChangeMajor}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Gucian"
                        defaultValue={this.state.gucian}
                        onChange={this.handleChangeGucian}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button
                        variant="dark"
                        onClick={() => this.handleSubmit()}
                    >
                        Add user
                    </Button>
                </form>
            </Collapsible>
        )
    }

}
export default UserAdd;
