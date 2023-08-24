import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "universal-cookie";
import schoolimg from "./images/schoolwelcome.jpg";
export default function Welcomebox() {
    const cookies = new Cookies();
    const url = String(import.meta.env.VITE_REACT_API_URL);

  const auth = cookies.get('_UID');
    const successnotify = (text: string) =>
    toast.success(text, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
     const comingsoon=()=>{
        successnotify("Coming Soon");
     }
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000); // Update every second
    
        return () => clearInterval(intervalId);
      }, []);
      useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentDate(new Date());
        }, 1000); // Update every second
    
        return () => clearInterval(intervalId);
      }, []);
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
      const currentDay = daysOfWeek[currentDate.getDay()];
      const currentMonth = monthsOfYear[currentDate.getMonth()];
    
      const currentFormattedDate = `${currentDate.getDate()}, ${currentMonth}  ${currentDate.getFullYear()}`;
      const [school_id,setschool_id]=useState('');
      const [school_name,setschool_name]=useState('');
      const getschooldata=async(auth:any)=>{
         try{
   const res=await axios.get(`${url}/admindata/${auth}`);
   const schoolname=await axios.get(`${url}/apisignup/${auth}`);
     const schoonamedata=schoolname.data[0];
    setschool_name(schoonamedata.schoolname);
   const data=res.data[0];
   setschool_id(data.school_id);
         }catch(err){
      return err;
         }
      }
      
      useEffect(()=>{
  getschooldata(auth);
      },[])
      // const containerStyle = {
      //   display: 'inline-block',
      //   height:'200px',
      //   backgroundImage: `url(${schoolimg})`, // Replace with your image URL
      //   backgroundSize: '100% 100%',
        
      //   width:'100%',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundClip: 'text',
      //   backgroundAttachment: 'fixed',

      // };
  return (
    <div>
                  <ToastContainer></ToastContainer>

         <div style={{alignItems:'center',gap:'5px',width:'100%'}} className='grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1'>
          <p className="font-bold text-3xl">Welcome to {school_name}</p>
           <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
           <p className="text-1xl font-bold">Your school code:</p>
            <p style={{overflow:'hidden'}}>{school_id}</p>
           </div>
          
            <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
            <p className="text-1xl font-bold">School website:</p>
            <p onClick={comingsoon} style={{color:"blue",cursor:'pointer'}}>Here</p>
            </div>
           
           
         </div>
         <div style={{display:'flex',alignItems:'center',gap:'5px',width:'100%',marginTop:'5px'}} >
       
           <p style={{display:'flex',alignItems:'center'}} className="font-semibold">
           <svg className="h-5 w-5"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>
           <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <rect x="10" y="12" width="4" height="4" /></svg> 
           / Dashboard 
           </p>
           <p>/  {currentDay} / {currentFormattedDate} / {currentTime.toLocaleTimeString()}</p>

         </div>
         
    </div>
  )
}
