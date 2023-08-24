import Breadcrumb from '../components/Breadcrumb';
import Cookies from "universal-cookie";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Button } from '@material-tailwind/react';
import 'react-big-calendar/lib/sass/styles.scss';

const localizer = momentLocalizer(moment);

import 'react-calendar/dist/Calendar.css';
import {useEffect, useState} from "react";
import { Navigate } from 'react-router-dom';
const url = String(import.meta.env.VITE_REACT_API_URL);

import axios from 'axios';
export default function TableOne(){
  const cookies = new Cookies();
  const auth=cookies.get('_UID');
 if(!auth){
   return <Navigate to='/0'/>
 }
 const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    // You can customize this to open an event creation modal
    const title = window.prompt('Enter event title:');
    if (title) {
      const newEvent = { start, end, title, school_id:auth, };
      setEvents([newEvent]);
    }
  };
  // const handleEventUpdate = (updatedEvent:any) => {
  //   setEvents(prevEvents =>
  //     prevEvents.map(event =>
  //       event.id === updatedEvent.id ? updatedEvent :event
  //     )
  //   );


  // };

  const postdata=async()=>{
    if(events.length==0){
      alert('Please Add School Events');
    }else{
    
    try{
      const res=await axios.post(`${url}/schoolcalenders`,events[0])
       console.log(res.data);
       getdata(auth);
   }catch(err){
    return err;
   }
  
}
  }
  const getdata=async(auth:any)=>{
    try{
   const res=await axios.get(`${url}/schoolcalenders/${auth}`);
      const eventsdata=[];
        for(let data of res.data){
           eventsdata.push(
            {
              id: data.id,
              title: data.title,
              start: new Date(String(data.start)),
              end: new Date(String(data.end)),
            },
           )
      //  console.log(eventsdata);
     
       }
       setEvents(eventsdata);
    }catch(err){
      return err;
    }
  }
useEffect(()=>{
getdata(auth);
},[])
console.log(events);

  const handleSelectEvent = (event:any) => {
    setSelectedEvent(event);
    // You can customize this to open an event editing modal
  };

  const handleEventResize = (event:any, start:any, end:any) => {
    // Handle event resizing here
    // Update the event's start and end times
  };

  const handleEventDrop = ({ event, start, end }) => {
    // Handle event dragging here
    // Update the event's start and end times
  };

  console.log(events)
  return (
    <>
    
      {/* <Breadcrumb pageName="School Calendar" /> */}

      <div style={{padding:'20px'}} className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <p className='text-2xl font-bold'>School Calendar</p>
              <Button variant='outlined' color='blue' onClick={postdata} style={{display:'flex',alignItems:'center',justifyContent:'right',marginLeft:'auto'}}>Save</Button>

        <Calendar
         
        localizer={localizer}
        events={events}
         selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventResize={handleEventResize}
        onEventDrop={handleEventDrop}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        style={{ height: '600px',padding:'5px'}}
      />
      </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </>
  );
};

