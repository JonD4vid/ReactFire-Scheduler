import React, { Component } from 'react';
import './Dashboard';
import './Dashboard.css';
import Main from './Dashboard/Main';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';

class Dashboard extends Component {
  render() {
    return (
      <div>
          <Router>
                        <Container>

              <Route exact path="/" component={Main} />
            </Container>

          </Router>
          </div>
    );
  }
}

export default Dashboard;