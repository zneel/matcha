import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {};
  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Register
          </Header>
          <Segment>
            <Form>
              <Form.Field>
                <label>Email address</label>
                <input
                  required
                  autoComplete="email"
                  placeholder="Email address"
                />
              </Form.Field>
              <Form.Field>
                <label>Username</label>
                <input
                  required
                  autoComplete="username"
                  placeholder="Username"
                />
              </Form.Field>
              <Form.Field>
                <label>Firstname</label>
                <input
                  required
                  autoComplete="firstname"
                  placeholder="Firstname"
                />
              </Form.Field>
              <Form.Field>
                <label>Lastname</label>
                <input
                  required
                  autoComplete="lastname"
                  placeholder="Lastname"
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  required
                  autoComplete="password"
                  placeholder="Password"
                />
              </Form.Field>
              <Form.Field>
                <label>Confirm password</label>
                <input
                  required
                  autoComplete="password"
                  placeholder="Confirm password"
                />
              </Form.Field>
              <Button color="blue" fluid size="large">
                Register
              </Button>
            </Form>
          </Segment>
          <Message>
            Not registered yet? <Link to="/register/">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
