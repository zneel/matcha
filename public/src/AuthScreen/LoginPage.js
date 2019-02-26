import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import './LoginPage.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div id="container">
        <div className="Login">
          <h1 className="TitleForm">Connexion</h1>
          <form onSubmit={this.handleSubmit}>
            <p className="LabelForm">Email</p>
            <FormGroup controlId="email">
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <p className="LabelForm">Password</p>
            <FormGroup controlId="password">
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              className="ButtonLogin"
              block
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
            <Button className="ButtonRegister" block type="submit">
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
