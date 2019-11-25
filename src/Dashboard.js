import React, { Component } from 'react';
import './Dashboard';
import './Dashboard.css';
import Main from './Dashboard/Main';
import Login from './Dashboard/Login';
import Admin from './Dashboard/Admin';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import * as firebase from 'firebase';

const Dashboard = () => (


      <Router>
              <Route exact path="/" component={Login} />
              <Route  path="/Admin" component={Admin} />
              <Route  path="/Home" component={Main} />
          </Router>

)

export default Dashboard;