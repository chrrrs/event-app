import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
