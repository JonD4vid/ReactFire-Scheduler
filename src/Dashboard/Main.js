import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';
import {Jumbotron, Carousel, Card, Container, Row, Col, Image, Button} from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import firebase from 'firebase';


export default class Main extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: '',
      query: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     var displayName = user.displayName;
    //     var email = user.email;
    //     var emailVerified = user.emailVerified;
    //     var photoURL = user.photoURL;
    //     var isAnonymous = user.isAnonymous;
    //     var uid = user.uid;
    //     var providerData = user.providerData;
    //     // ...
    //   } else {
    //     // User is signed out.
    //     // ...
    //   }
    // });
    this.state = { 
        events: [
          { title: 'event 1', date: '2019-10-28' },
          { title: 'event 2', date: '2019-10-29' }
        ],
        modal: false

    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name + "requests the following: "+ this.state.query);
    event.preventDefault();
  }

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}



handleDateClick = (info) => { // bind with an arrow function
  console.log(info.dateStr);
  console.log('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    console.log('Current view: ' + info.view.type);
}


    render() {
    return (
<div>
<MDBRow style={{marginTop: '1%'}}> 
<MDBCol size="10">
</MDBCol>

<MDBCol size="2">
  <h3>Welcome: </h3>
  </MDBCol>
  </MDBRow>
<MDBRow>

        <MDBCol size="8">
        <MDBCard  style={{ backgroundColor: '#fafafa', height: '600px', width:'750px', marginLeft: '5%',marginTop: '2%',
        boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.1)',
        padding: '5px 20px',
       }}>
  <FullCalendar
    // dateClick={() => this.handleDateClick()}
    selectable={true}
    header={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  }}
  defaultView="dayGridMonth"
   plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
    weekends={false}
    events={this.state.events}
    />
    </MDBCard>
</MDBCol>
        <MDBCol size="4">
          <MDBCard style={{ marginRight: '5%',  height: '600px', width: '400px', marginTop: '5%', boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.1)',
        padding: '5px 20px',}}>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Schedule Appointment</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.name}
                    onChange={this.handleChange}

                  />
                  <MDBInput
                    label="Your School ID#"
                    icon="edit"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.id}
                    onChange={this.handleChange}

                  />
                  <MDBInput
                    label="State Query Summary"
                    icon="exclamation-triangle"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.query}
                    onChange={this.handleChange}

                  />
      
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Register
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        </MDBRow>
      </div>
    );
  }
}