import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Account from './containers/Account';
import UserProfil from './containers/UserProfil';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/userProfil" exact component={UserProfil} />
    <Route path="/account" exact component={Account} />
    <Route component={NotFound} />
  </Switch>
);
