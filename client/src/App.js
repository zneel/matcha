import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

const leftItems = [{ as: Link, content: "Home", to: "/", key: "home" }];
const rightItems = [
  { as: Link, content: "Login", to: "/login", key: "login" },
  { as: Link, content: "Register", to: "/register", key: "register" }
];

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar leftItems={leftItems} rightItems={rightItems} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
