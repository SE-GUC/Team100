import React, { Component } from "react";
import axios from "../../axiosInstance";
import Collapsible from "react-collapsible";
import DropdownButton from 'react-bootstrap/DropdownButton'
//import { isNull } from "util";
import { Modal, Button, InputGroup, FormControl, Dropdown, DropdownItem } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
class UserAdd extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: {},
            id: "",
            name: "",
            user_type: "",
            major: "",
            committee_type: "",
            gucian: "",
            control: "",
            password: "",
            club: "",
            email: "",
            Comm: []
        };
    }
    getComm() {
        axios
            .get("/committee")
            .then(res => this.setState({ Comm: res.data.data }))
            .catch(err => console.log(err));
    }
    componentDidMount() {
        this.getComm();
    }
    changeName = event => {
        this.setState({ name: event.target.value });
    };
    changeEmail = event => {
        this.setState({ email: event.target.value });
    };
    changePassword = event => {
        this.setState({ password: event.target.value });
    };
    changeMajor = event => {
        this.setState({ major: event.target.value });
    };
    changeGucian = event => {
        this.setState({ gucian: event });
    };
    // changeClub = event => {
    //     this.setState({ gucian: event });
    // };
    changeUsertype = event => {
        if (event === "Mun admin")
            this.setState({ user_type: "mun_admin" });
        if (event === "Mun member")
            this.setState({ user_type: "mun_member" });
    };
    // changeCommittee = event => {
    //     this.setState({ committee_type: event.target.value });
    // };
    changeControl = event => {
        this.setState({ control: event });
    };
    handleChangeComm = value => {
        this.setState({ committee: value });
    };

    add = async event => {
        event.preventDefault()
        const user = {
            password: this.state.password,
            email: this.state.email,
            name: this.state.name,
            //club: this.state.club,
            major: this.state.major,
            gucian: this.state.gucian,
            user_type: this.state.type,
            control: this.state.control,
            committee: this.state.committee
        }
        try {
            console.log(process.env.REACT_APP_BASE_URL);
            await axios.post(`/users/add`, user);
            console.log("Successfully added")
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                {localStorage.type === "mun_admin" ? (
                    <Collapsible trigger="Add user">
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>Add a user</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <InputGroup size="sm" className="user">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-sm">
                                            Email
                                </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        onChange={this.changeEmail}
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
                                        onChange={this.changePassword}
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
                                        onChange={this.changeName}
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
                                        onChange={this.changeMajor}
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </InputGroup>
                                <br />
                                <Dropdown>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic" size="sm" >
                                        Choose The Type Of User
                                     </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onSelect={this.changeUsertype}>Mun admin</Dropdown.Item>
                                        <Dropdown.Item onSelect={this.changeUsertype}>Mun member</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <br />
                                {/* <InputGroup size="sm" className="Users">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-sm">
                                            GUCIAN
                                </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        onChange={this.changeGucian}
                                        required={true}
                                        type="boolean"
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </InputGroup> */}

                                <Dropdown>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic" size="sm" >
                                        GUCIAN
                                     </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onSelect={this.changeGucian}>true</Dropdown.Item>
                                        <Dropdown.Item onSelect={this.changeGucian}>false</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <br />
                                <Dropdown>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic" size="sm" >
                                        Control
                                     </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onSelect={this.changeControl}>true</Dropdown.Item>
                                        <Dropdown.Item onSelect={this.changeControl}>false</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <br />
                                <Dropdown onSelect={this.handleChangeComm}>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        {this.state.committee ? this.state.committee : "Committees"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {this.state.Comm.map(e1 => (
                                            <div key={e1._id}>
                                                <li>
                                                    <DropdownItem eventKey={e1.name}>{e1.name}</DropdownItem>
                                                </li>
                                            </div>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <br />
                                {/* <Dropdown>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic" size="sm" >
                                        Choose the user's type
                                     </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onSelect={this.changeUsertype}>User</Dropdown.Item>
                                        <Dropdown.Item onSelect={this.changeUsertype}>Mun admin</Dropdown.Item>
                                        <Dropdown.Item onSelect={this.changeUsertype}>Mun member</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <br /> */}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="warning" onClick={this.add}>
                                    Add user
                            </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Collapsible>
                ) : null
                }
            </div>

        )
    }

}
export default UserAdd;