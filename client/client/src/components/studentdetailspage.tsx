import React, { useEffect, useState,useRef } from 'react';
import { Typography } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';

import { Spinner } from '@material-tailwind/react';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';
import Studentdetailtable from './studenttable';
import "../styles/home.css";
import axios from 'axios';
const url = String(import.meta.env.VITE_REACT_API_URL);


export default function Studentdetailspage() {
  interface RouteParams {
    id: string;
  }  
  const { id } = useParams<RouteParams>();

  const [data, setdata] = useState([]);
  const [load, setload] = useState(false);
  const coverttopdf=useRef();
  
  const getstudent = async (id: any) => {
    setload(true);
    try {
      const res = await axios.get(`${url}/studentdetails/${id}`);
      setdata(res.data);
      setload(false);
    } catch (err) {
      setload(true);
      return err;
    }
  };
  useEffect(() => {
    getstudent(id);
  }, []);

  const generatepdf1=useReactToPrint({
    content:()=>coverttopdf.current,
    documentTitle:"student",
})
  return (
    <div   style={{padding:'20px'}} className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
           <div>
            <Link to='/students/detailtable'>
            <button>
            <svg className="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> 
            <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /></svg>
            </button>
            </Link>
            
            <button style={{position:'absolute',right:'8%'}}>  <svg className="h-6 w-6"  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> 
             <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg></button>
           
        <button onClick={generatepdf1} style={{position:'absolute',right:'5%'}}>
           <svg className="h-6 w-6"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
</svg>
           </button>
           </div>
       
      {load ? (
        <Spinner style={{display:'flex',alignItems:'center',justifyContent:'center',margin:'auto'}} className='h-12 w-12' />
      ) : (
        data?.map((el) => (
          <div ref={coverttopdf} style={{width:'100%',margin:'auto',padding:'20px'}}>
            <div style={{padding:'20px'}} className="mr-auto flex justify-center align-middle">
              <img
                className="h-50 w-50 rounded-full object-cover object-center"
                src={`${url}/${el.student_image}`}
                alt="nature image"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Student Name</h3>
                {el.student_name}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Date of birth</h3>
                {el.date_of_birth}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Father name</h3>
                {el.father_name}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Mother name</h3>
                {el.mother_name}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Mother tougue</h3>
                {el.mother_tougue}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Admission no</h3>
                {el.admission_no}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Full address</h3>
                {el.address}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Age</h3>
                {el.age}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Phone</h3>
                {el.phone}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Other Contact</h3>
                {el.parents_phone}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Religion</h3>
                {el.religion}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">City</h3>
                {el.city}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Previous school name</h3>
                {el.previous_school_name}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">
                Last class
                </h3>
                {el.class_in_which_was_studing}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Email</h3>
                {el.email}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Transfer Certificate</h3>
                {el.transfer_certificate}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Physical handicap</h3>
                {el.physical_handicap}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">House</h3>
                {el.house}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Category</h3>
                {el.student_category}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Class</h3>
                {el.select_class}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Section</h3>
                {el.section}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Place birth</h3>
                {el.place_birth}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">State</h3>
                {el.state}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Blood group</h3>
                {el.blood_group}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Date of leaving</h3>
                {el.dateofleaving}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">Identity Document</h3>
                {el.birth_certificate}
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">student document</h3>
                <a href={`${url}/${el.student_document}`}>Click here</a>
              </div>
              <div style={{ borderBottom: '1px solid silver' }}>
                <h3 className="text-1xl font-bold">other document</h3>
                <a href={`${url}${el.other_document}`}>Click here</a>
              </div>
            </div>
          </div>
        ))
      )}
   
      
    </div>
  );
}
