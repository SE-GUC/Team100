// import React, { Component } from "react";
// import { Modal, Button, ListGroup, Image } from "react-bootstrap";
// import axios from "../../axiosInstance";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { Fab } from "@material-ui/core";
// import Collapsible from "react-collapsible";
// import TextField from "@material-ui/core/TextField";
// import MenuItem from '@material-ui/core/MenuItem';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';

// class UserAdd extends React.Component {
//     constructor(props, context) {
//         super(props, context);

//         this.state = {
//             show: false,
//             name: "",
//             email: "",
//             club: "mun",
//             major: "",
//             committee_type: "",
//             user_type: "",
//             control: false,
//             gucian: ""
//         };
//     }
//     refreshUser() {
//         axios.get(`users/${localStorage.getItem("id")}`).then(res => {
//             this.setState({
//                 photo: res.data.User.photo,
//                 name: res.data.User.name,
//                 email: res.data.User.email,
//                 telephone: res.data.User.telephone,
//                 club: res.data.User.club,
//                 committee_type: res.data.User.committee_type,
//                 major: res.data.User.major,
//                 birthdate: res.data.User.birthdate,
//                 user_type: res.data.User.user_type,
//                 control: res.data.User.control,
//                 gucian: res.data.User.gucian
//             });
//             console.log(
//                 this.state.name,
//                 this.state.photo,
//                 this.state.major,
//                 this.state.club,
//                 this.state.email,
//                 this.state.telephone,
//                 this.state.committee_type,
//                 this.state.user_type,
//                 this.state.birthdate,
//                 this.state.control,
//                 this.state.gucian
//             );
//         });
//     }

//     handleChangeName = event => {
//         this.setState({ name: event.target.value });
//     };
//     handleChangeEmail = event => {
//         this.setState({ email: event.target.value });
//     };
//     handleChangePassword = event => {
//         this.setState({ password: event.target.value });
//     };
//     handleChangeTelephone = event => {
//         this.setState({ telephone: event.target.value });
//     };
//     handleChangeClub = event => {
//         this.setState({ club: event.target.value });
//     };
//     handleChangeCommitte = event => {
//         this.setState({ committee_type: event.target.value });
//     };
//     handleChangeMajor = event => {
//         this.setState({ major: event.target.value });
//     };
//     handleChangeGucian = event => {
//         this.setState({ gucian: event.target.value });
//     };
//     handleChangeControl = event => {
//         this.setState({ control: event.target.value });
//     };
//     handleChangeUserType = event => {
//         this.setState({ user_type: event.target.value });
//     };

//     handleSubmit = async event => {
//         const User = {
//             name: this.state.name,
//             email: this.state.email,
//             major: this.state.major,
//             user_type: this.state.user_type,
//             password: this.state.password,
//             club: this.state.club,
//             committee_type: this.state.committee_type,
//             control: this.state.control,
//             gucian: this.state.gucian
//         };
//         console.log(User);
//         try {
//             await axios.post(`users/add`, User).then(res => {
//                 this.refreshUser();
//                 console.log("Added successfully")
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     render() {
//         return (
//             <Collapsible trigger="Click here to add new user">
//                 <form>
//                     <TextField
//                         id="outlined-name"
//                         label="Name"
//                         defaultValue={this.state.name}
//                         onChange={this.handleChangeName}
//                         margin="normal"
//                         variant="outlined"
//                     />
//                     <TextField
//                         id="outlined-name"
//                         label="Email"
//                         defaultValue={this.state.email}
//                         onChange={this.handleChangeEmail}
//                         margin="normal"
//                         variant="outlined"
//                     />
//                     <TextField
//                         id="outlined-name"
//                         label="Password"
//                         defaultValue={this.state.password}
//                         onChange={this.handleChangePassword}
//                         margin="normal"
//                         variant="outlined"
//                         type="password"
//                     />
//                     <TextField
//                         id="outlined-name"
//                         label="Major"
//                         defaultValue={this.state.major}
//                         onChange={this.handleChangeMajor}
//                         margin="normal"
//                         variant="outlined"
//                     />

//                     <TextField
//                         id="outlined-name"
//                         label="Club"
//                         defaultValue={this.state.club}
//                         onChange={this.handleChangeClub}
//                         margin="normal"
//                         variant="outlined"
//                     />
//                     <TextField
//                         id="outlined-name"
//                         label="Committee"
//                         defaultValue={this.state.committee_type}
//                         onChange={this.handleChangeCommitte}
//                         margin="normal"
//                         variant="outlined"
//                     />


//                     <FormLabel component="legend">Gucian</FormLabel>
//                     <RadioGroup
//                         aria-label="Gucian"
//                         name="Gucian"
//                         value={this.state.gucian}
//                         onChange={this.handleChangeGucian}
//                     >
//                         <FormControlLabel value="true" control={<Radio />} label="True" />
//                         <FormControlLabel value="false" control={<Radio />} label=" False" />

//                     </RadioGroup>
//                     <FormLabel component="legend">User Type</FormLabel>
//                     <RadioGroup
//                         aria-label="User Type"
//                         name="User Type"
//                         value={this.state.user_type}
//                         onChange={this.handleChangeUserType}
//                     >
//                         <FormControlLabel value="user" control={<Radio />} label="User" />
//                         <FormControlLabel value="mun_admin" control={<Radio />} label="MUN member" />
//                         <FormControlLabel value="mun_member" control={<Radio />} label="MUN admin" />

//                     </RadioGroup>
//                     <FormLabel component="legend">Control</FormLabel>
//                     <RadioGroup
//                         aria-label="Control"
//                         name="Control"
//                         value={this.state.control}
//                         onChange={this.handleChangeControl}
//                     >
//                         <FormControlLabel value="true" control={<Radio />} label="True" />
//                         <FormControlLabel value="false" control={<Radio />} label=" False" />

//                     </RadioGroup>



//                     <Button
//                         variant="dark"
//                         onClick={() => this.handleSubmit()}
//                     >
//                         Add user
//                     </Button>
//                 </form>
//             </Collapsible>
//         )
//     }

// }
// export default UserAdd;
