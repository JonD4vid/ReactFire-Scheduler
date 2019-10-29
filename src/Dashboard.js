import React, { Component } from 'react';
import Main from './Dashboard/Main';
import './Dashboard';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
          <Router>
              <Route exact path="/" component={Main} />
          </Router>
    );
  }
}

export default Dashboard;