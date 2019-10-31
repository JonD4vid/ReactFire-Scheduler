import React, { Component } from 'react';
import './Dashboard';
import './Dashboard.css';
import Main from './Dashboard/Main';
import Login from './Dashboard/Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';

class Dashboard extends Component {


  render() {
    return (
          <Router>
              <Route exact path="/" component={Main} />
              <Route exact path="/auth" component={Login} />
          </Router>
    );
  }
}

export default Dashboard;