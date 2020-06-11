import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Home from "./components/Home/Home";
import Dashboard from './components/Dashboard/Dashboard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="AppWrapper">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users/login" component={Login} />
            <Route exact path="/users/register" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
