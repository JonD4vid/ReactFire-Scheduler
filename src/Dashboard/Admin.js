import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';
import {MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
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

export default class Admin extends Component {
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
      isFetching: true,


    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleChangeDate = this.handleChangeDate.bind(this);

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

    setTimeout(() => {
      this.setState({
        events:  this.state.events.concat(array)
      })

      console.log(this.state.events)

      this.setState({
        isFetching: false,
      })
  
    }, 2000);
    
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



handleDateClick = arg => {
  if (window.confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
    this.setState({
      // add new event data
      events: this.state.events.concat({
        // creates a new array
        title: "New Event",
        start: arg.date,
        allDay: arg.allDay
      })
    });
  }
};

    render() {

      if(this.state.isFetching){
        return (
          
<div>
  <h2>Loading...</h2>
</div>
        )
      }

      if(this.state.isFetching == false ){


    return (
<div>
<MDBRow style={{marginTop: '1%'}}> 
<MDBCol size="10">
</MDBCol>

<MDBCol size="2">
<MDBRow>

  <h3 style= {{marginRight: 15}}>Welcome: Admin</h3>
  <button type="button" class="btn btn-danger">Sign Out</button>

  </MDBRow>

  </MDBCol>
  </MDBRow>
<MDBRow>
<MDBCol size="2">
  </MDBCol>
        <MDBCol size="8">
        <MDBCard  style={{ backgroundColor: '#fafafa', height: '600px', width:'750px', marginLeft: '5%',marginTop: '2%',
        boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.1)',
        padding: '5px 20px',
       }}>

<div>
  <FullCalendar

    header={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  }}
  ref={this.calendarComponentRef}
   plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
    weekends={false}
    events={this.state.events}
    // dateClick={this.handleDateClick}
    />
    </div>
    </MDBCard>
</MDBCol>
<MDBCol size="2">
  </MDBCol>
        </MDBRow>
      </div>
    );
}
  }
}