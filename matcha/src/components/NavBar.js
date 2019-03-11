import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

export default class NavBar extends React.Component {
  render() {
    return (
      <Navbar variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">Matcha</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Container>

        <Nav expand="lg">
          <Link to="/login">Login</Link>
          <Link to="/signup" className="signup-title">
            SignUp
          </Link>
        </Nav>
      </Navbar>
    );
  }
}
