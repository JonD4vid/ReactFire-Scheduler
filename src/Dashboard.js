import React, { Component } from 'react';
import './Dashboard';
import './Dashboard.css';
import Main from './Dashboard/Main';
import Login from './Dashboard/Login';
import Admin from './Dashboard/Admin';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';

class Dashboard extends Component {


  render() {
    return (
          <Router>
              <Route exact path="/" component={Login} />
              <Route exact path="/Admin" component={Admin} />
              <Route exact path="/Home" component={Main} />

          </Router>
    );
  }
}

export default Dashboard;