import React, { useState ,useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
export default function Announcementbox() {
  const url = String(import.meta.env.VITE_REACT_API_URL);
  const [heading,setheading]=useState('');
  const [notices,setnotices]=useState('');
  const [load,setload]=useState(false);
  const cookies = new Cookies();

  const auth = cookies.get('_UID');
  const getdata=async(auth:any)=>{
    setload(true);
      try{
     const res=await axios.get(`${url}/schoolannouncement/${auth}`);
     const reversedArray = res.data.slice().reverse();

    //  setdata(reversedArray[0]);
    setheading(reversedArray[0].heading);
    setnotices(reversedArray[0].notice);
       setload(false);
      }catch(err){
        return err;
      }
  }
  useEffect(()=>{
  getdata(auth);
  },[])
  return (
    <>
    
    <div className='col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8'>
         <p className='text-1xl font-bold' style={{display:'flex',alignItems:'center',gap:'5px',fontSize:'18px'}}>
         Latest Announcement 
         <svg className="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>
           <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />  <path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>

         </p>
         
           <br />
           <hr />
           <br />
            <div>
                <p style={{fontSize:'20px'}} className='font-semibold'>{heading}</p>
                <br />
                   <div style={{borderLeft:'5px solid silver',padding:'10px'}}>
                      {notices}
                      <Link to="/operations/announcement">
                    <p  className='text-blue-500 font-semibold' style={{display:'flex',alignItems:'center',gap:'3px',cursor:'pointer'}}>
                    <svg className="h-5 w-5 text-blue-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>
                      <polyline points="7 7 12 12 7 17" />  <polyline points="13 7 18 12 13 17" /></svg>
                        Read all announcement</p></Link>

                   </div>
            </div>

    </div>
    </>
  )
}
