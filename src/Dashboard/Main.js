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

export default class Main extends Component {
  calendarComponentRef = React.createRef();

  constructor(props) {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();   

    super(props);
    this.state = {
      events: [],
      name: '',
      id: '',
      query: '',
      date: '',

    }
    // this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);

    this.handleChangeQuery = this.handleChangeQuery.bind(this);

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
  }

  handleChangeQuery(event) {
    this.setState({
      query: event.target.value,
    
    });
  }

  handleChangeYear(event) {
    this.setState({
      date: event.target.value,
    
    });
  }


  componentDidMount(){
    var array = [];
    firebase.firestore().collection("schedule")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            array.push(doc.data())
        });

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    this.setState({
      events: array
    })
    console.log(array)
  }

  handleSubmit(event) {
    event.preventDefault();
    const date = this.state.date
    const data = { 
      title: this.state.query,
      date: date
    }
    this.state.events.push(data)

    // console.log(date)
    // console.log(this.state.events)
    // // console.log(this.state.name)

  //   firebase.firestore().collection("schedule").add(data)
  // .then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  // })
  // .catch(function(error) {
  //     console.error("Error adding document: ", error);
  // });







  }

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}



handleDateClick = (arg) => {


};

    render() {
      console.log(this.state.events)

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

https://fullcalendar.io/docs/Calendar-addEvent-demo
<div>
  <FullCalendar
     customButtons={{
      addEventButton: {
          text: 'custom!',
          click: function() {
            var dateStr = prompt('Enter a date in YYYY-MM-DD format');
            var date = new Date(dateStr + 'T00:00:00'); // will be in local time

            if (!isNaN(date.valueOf())) { // valid?
              this.calendarComponentRef.addEvent({
                title: 'dynamic event',
                start: date,
                allDay: true
              });
              alert('Great. Now, update your database...');
            } else {
              alert('Invalid date.');
            }
          }
          },
      }
  }
    header={{
    left: 'prev,next today',
    center: 'addEventButton',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  }}
  ref={this.calendarComponentRef}
   plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
    weekends={false}
    events={this.state.events}
    dateClick={this.handleDateClick}
    />
    </div>
    </MDBCard>
</MDBCol>
        <MDBCol size="4">
          <MDBCard style={{ marginRight: '5%',  height: '600px', width: '400px', marginTop: '5%', boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.1)',
        padding: '5px 20px',}}>
            <MDBCardBody>
              <form onSubmit={this.handleSubmit}>
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
                    onChange={this.handleChangeQuery}

                  />
        <MDBRow>
        <MDBCol size="3">

<MDBInput
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.year}
                    onChange={this.handleChangeYear}

                  />
                  </MDBCol>
                  <MDBCol size="1">
                    <h3>-</h3>
                  </MDBCol>
                  <MDBCol size="3">

<MDBInput
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.month}
                    onChange={this.handleChangeMonth}

                  />
                  </MDBCol>
                  <MDBCol size="1">
                    <h3>-</h3>
                  </MDBCol>
                  <MDBCol size="3">

<MDBInput
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.day}
                    onChange={this.handleChangeDay}

                  />
                  </MDBCol>
                  
                  </MDBRow>



      
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