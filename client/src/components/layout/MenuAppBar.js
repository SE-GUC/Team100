import React from 'react';
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import SearchTool from '../search/SearchTool';


/*const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
};
*/
class Tabs extends React.Component {
  render() {
    return (
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">AWGs Hub</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link  href="/componentsMun">
            GUCMUN
          </Nav.Link>
      <Nav.Link href="/Nebny">Nebny</Nav.Link>
      <Nav.Link href="/VGS">VGS</Nav.Link>
      <Nav.Link href="/Tiq">TIQ</Nav.Link>

      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
    <SearchTool/>
     
    </Form>
  </Navbar.Collapse>
</Navbar>
)
}}

export default Tabs;