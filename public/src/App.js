import React, { Component } from 'react';
import './App.css';
import LoginPage from './AuthScreen/LoginPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginPage />
      </div>
    );
  }
}

export default App;
