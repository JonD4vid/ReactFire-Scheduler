import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { withRouter, Redirect} from 'react-router-dom';

import { compose } from 'recompose';
import { withFirebase } from '../Firebase/index';

import { FirebaseContext } from '../Firebase';
import { Alert } from 'react-bootstrap';



const Login = () => (
  <div>
        <FirebaseContext.Consumer>
        {firebase => <LoginForm firebase={firebase}/>}
        </FirebaseContext.Consumer>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};


class LoginFormBase extends Component {


  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

  }



 

  handleSubmit = event =>{
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        if(email == 'test@test.com'){
          this.props.history.push('./home')
        }
        else if (email == 'test@admin.com'){
        this.props.history.push('./admin');
        }
      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
        Alert(error)
      });
      event.preventDefault();

  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

    render() {
      const { email, password, error } = this.state;
      const isInvalid = password === '' || email === '';

    return (
      <MDBContainer>
      <MDBRow>
      <MDBCol md="4">
</MDBCol>


        <MDBCol md="4">
        <MDBCard style={{ marginRight: '5%',  height: '500px', width: '400px', marginTop: '50%', boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.1)',
        padding: '5px 20px',}}>
            <MDBCardBody>
            <form onSubmit={this.handleSubmit}>
                <p className="h4 text-center py-4">Sign In</p>
                <div className="grey-text">
                  <MDBInput
                    label="Email"
                    name="email"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={email}
                    onChange={this.onChange}

                  />
                  <MDBInput
                    label="Password"
                    name="password"
                    icon="edit"
                    group
                    type="password"
                    validate
                    error="wrong"
                    success="right"
                    value={password}
                    onChange={this.onChange}

                  />
                  </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn disabled={isInvalid} class="btn btn-positive"type="submit" color="cyan">
                    Login
                  </MDBBtn>
                 

                </div>


              </form>

              <p>User email: test@test.com</p>
              <p>Admin email: test@admin.com</p>
              <p>Password: password</p>

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


const LoginForm = compose(
  withRouter,
  withFirebase,
)(LoginFormBase);
export default Login;
export { LoginForm };