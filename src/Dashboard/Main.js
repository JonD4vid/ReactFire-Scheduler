import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';
import {MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import  { FirebaseContext } from '../Firebase';
import { withRouter, Redirect} from 'react-router-dom';

import { Link } from 'react-router-dom';
// import SignOutButton from './SignOutButton';



const Main = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <Home firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);




class Home extends Component {
  calendarComponentRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      name: '',
      id: '',
      query: '',
      year: '',
      month:'',
      day:'',
      date: '',
      isFetching: true,

    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.handleChangeDay = this.handleChangeDay.bind(this);

    // this.handleSubmit = this.handleSubmit.bind(this);

  }
  


  handleChangeName(event) {
    this.setState({
      name: event.target.value,
    
    });
  }

  handleChangeId(event) {
    this.setState({
      id: event.target.value,
    
    });
  }

  handleChangeQuery(event) {
    this.setState({
      query: event.target.value,
    
    });
  }

  handleChangeYear(event) {
    this.setState({
      year: event.target.value,
    
    });
  }

  handleChangeMonth(event) {
    this.setState({
      month: event.target.value,
    
    });
  }

  handleChangeDay(event) {
    this.setState({
      day: event.target.value,
    
    });
  }


  componentDidMount(){
    var array = [];
    this.props.firebase.collection("schedule")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            array.push(doc.data())
        });

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

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

  handleSubmit = () => {
    const { name, id, query, day, month, year} = this.state;
    const date = year + '-' + month + '-' + day;


    this.setState({
      // add new event data
      events: this.state.events.concat({
        // creates a new array
        title: name,
        query: query,
        id: id,
        start: date,
        // allDay: arg.allDay
      })
    });
    

    const data = {
      title: name,
      query: query,
      id: id,
      start: date,
    }
  

    this.props.firebase.collection("schedule").add(data)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    
    console.log(date)
    console.log(this.state.events)
    // console.log(this.state.name)

    this.props.firebase.collection("schedule").add(data)
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });







  }



handleDateClick = arg => {
  if (window.confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
    var nameStr = prompt('Enter Your Full Name');
    var idStr = prompt('Enter Your Student ID#');
    var queryStr = prompt('Enter Reason for Appointment');
    // var date = new Date(dateStr + 'T00:00:00'); // will be in local time

    this.setState({
      // add new event data
      events: this.state.events.concat({
        // creates a new array
        title: nameStr,
        query: queryStr,
        id: idStr,
        start: arg.dateStr,
        allDay: arg.allDay
      })
    });


    const data = {
      title: nameStr,
      query: queryStr,
      id: idStr,
      start: arg.dateStr,
      allDay: arg.allDay
    }
     this.props.firebase.collection("schedule").add(data)
   .then(function(docRef) {
       console.log("Document written with ID: ", docRef.id);
   })
   .catch(function(error) {
       console.error("Error adding document: ", error);
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

  <h3 style= {{marginRight: 15}}>Welcome: User</h3>
  <Link to="./" onClick={this.doSignOut}>Sign out</Link>
 </MDBRow>

  </MDBCol>
            </MDBRow>
          <MDBRow>
          

                  <MDBCol size="8">
                  <MDBCard  style={{ backgroundColor: '#fafafa', height: '600px', width:'750px', marginLeft: '5%',marginTop: '2%',
                  boxShadow: '0 0px 5px 0px rgba(0, 0, 0, 0.2)',
                  padding: '5px 20px',
                 }}>
          
          {/* https://fullcalendar.io/docs/Calendar-addEvent-demo */}

          <div>
            <FullCalendar
              header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            eventLimit={true}
            views={{
              timeGridPlugin:{
                eventLimit: 1
              }
            }}
            titleFormat={{ year: 'numeric', month: 'short', day: 'numeric' } }
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
                    onChange={this.handleChangeName}

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
                    onChange={this.handleChangeId}

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
}

export default Main;
