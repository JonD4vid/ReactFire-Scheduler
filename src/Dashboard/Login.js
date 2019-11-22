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
    super(props);

    this.state = {
        email: '',
        password: '',
    }

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({
      email: event.target.value,
    
    });
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
    
    });
  }
 

  handleSubmit(){
    const {email, password} = this.state;
    let path = `/admin`;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...

      this.props.history.push(path);
    });
  }

    render() {
    return (
      <MDBContainer>
      <MDBRow>
      <MDBCol md="4">
</MDBCol>


        <MDBCol md="4">
        <MDBCard style={{ marginRight: '5%',  height: '600px', width: '400px', marginTop: '5%', boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.1)',
        padding: '5px 20px',}}>
            <MDBCardBody>
              <form onSubmit={this.handleSubmit}>
                <p className="h4 text-center py-4">Login</p>
                <div className="grey-text">
                  <MDBInput
                    label="Username"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.email}
                    onChange={this.handleChangeEmail}

                  />
                  <MDBInput
                    label="Password"
                    icon="edit"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.password}
                    onChange={this.handleChangePassword}

                  />
                  </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Login
                  </MDBBtn>
                </div>


              </form>
            </MDBCardBody>
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