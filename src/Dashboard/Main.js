import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import {Link} from 'react-router-dom';

export default class  Main extends Component {
    render() {
    return (
      <div className="App">
  <FullCalendar
  header={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  }}
  defaultView="dayGridMonth"
   plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
    weekends={false}
    events={[
      { title: 'event 1', date: '2019-10-28' },
      { title: 'event 2', date: '2019-10-29' }
    ]}
    />
      </div> 
    );
  }
}