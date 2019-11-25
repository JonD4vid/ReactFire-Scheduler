import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';
import {MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { withRouter, Redirect} from 'react-router-dom';

import { compose } from 'recompose';
import { withFirebase } from '../Firebase/index';
import  { FirebaseContext } from '../Firebase';
import {Table} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';

import '../Dashboard/Admin.css'

const Admin = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <Administrator firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);


 class Administrator extends Component {
  calendarComponentRef = React.createRef();

  constructor(props) {
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

    this.props.firebase.firestore().collection("schedule").add(data)
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });







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


renderTableHeader() {

     return(
       <thead>
         <tr>
           <th>ID#</th>
           <th>Name</th>
           <th>Query</th>
           <th>Appointment Date</th>
         </tr>
       </thead>
     );
}

renderTableData() {
  return this.state.events.map((student) => {
     return (
       
        <tr>
           <td>{student.id}</td>
           <td>{student.title}</td>
           <td>{student.query}</td>
           <td>{student.start}</td>
        </tr>
     )
  })
}



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
<SignOutButton />
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
  {/* <FullCalendar

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
    /> */}

{this.state.events.length <= 0?  

null
  :
<Table  striped bordered hover variant="dark">
{this.renderTableHeader()}
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </Table>

}

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

export default Admin;