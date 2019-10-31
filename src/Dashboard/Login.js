import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

export default class Login extends Component {
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
          <form>
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