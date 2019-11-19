import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBGq-3MeR6v02D6y6rxE4drXzJl7uzNrjs",
  authDomain: "usc-scheduler.firebaseapp.com",
  databaseURL: "https://usc-scheduler.firebaseio.com",
  projectId: "usc-scheduler",
  storageBucket: "usc-scheduler.appspot.com",
  messagingSenderId: "273478421299",
  appId: "1:273478421299:web:a44d26987c27f5930b4c46",
  measurementId: "G-YETGSPR9DH"
};

export default class Login extends Component {


  constructor(props) {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();   
    super(props);

    this.state = {
        username: '',
        password: '',
    }
    // this.handleUsername = this.handleUsername.bind(this);
    // this.handleChangeDate = this.handleChangeDate.bind(this);

    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    const {username, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

    render() {
    return (
      <MDBContainer>
      <MDBRow>
      <MDBCol md="4">
</MDBCol>


        <MDBCol md="4">
          <MDBCard style={{ 
            backgroundColor: '#fafafa',
            height: '450px', width:'400px',
            marginTop: '5%',
            boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.1)',
            padding: '5px 20px',
       }}>
          <form onSubmit={this.handleSubmit}>
            <p className="h4 text-center mb-4">Sign in</p>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Your email
            </label>
            <input
              type="email"
              id="defaultFormLoginEmailEx"
              className="form-control"
            />
            <br />
            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
              Your password
            </label>
            <input
              type="password"
              id="defaultFormLoginPasswordEx"
              className="form-control"
            />
            <div className="text-center mt-4">
              <MDBBtn color="indigo" type="submit">Login</MDBBtn>
            </div>
          </form>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4">
</MDBCol>
      </MDBRow>

    </MDBContainer>
      // https://codepen.io/Lakston/pen/XjAQdP?editors=1010
    );
  }
}