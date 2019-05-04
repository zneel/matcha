import React, { Component } from "react";
import { Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.formHandler = this.formHandler.bind(this);
  }
  state = {
    username: "",
    password: "",
    error: false,
    usernameError: false,
    passwordError: false,
    errMsg: ""
  };
  formHandler(e) {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ error: true });
      return;
    }
    axios
      .post(`http://localhost:3000/user/login`, {
        username,
        password
      })
      .then(res => console.log(res))
      .catch(err =>
        this.setState({ error: true, errMsg: err.response.data.msg })
      );
  }

  render() {
    const { error, username, password, errMsg } = this.state;
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Login
          </Header>
          <Segment>
            <Form size="large" onSubmit={this.formHandler}>
              <Form.Input
                fluid
                error={error}
                icon="user"
                iconPosition="left"
                placeholder="Username"
                autoComplete="username"
                required
                value={username}
                onChange={e => this.setState({ username: e.target.value })}
              />
              <Form.Input
                fluid
                error={error}
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                autoComplete="password"
                required
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
              />
              <Form.Button
                disabled={!username || !password}
                color="blue"
                fluid
                size="large"
              >
                Login
              </Form.Button>
            </Form>
          </Segment>
          {error ? <Message error>{errMsg}</Message> : null}
          <Message>
            Not registered yet? <Link to="/register/">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
