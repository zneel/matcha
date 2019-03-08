import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand href="/">Matcha</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
