import React from 'react'
import { useEffect, useState,useRef } from 'react';
import { Typography } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import TeacherPerdaydetail from './teacher_per_day_details';
import { Spinner } from '@material-tailwind/react';
import { useReactToPrint } from 'react-to-print';
import { Link ,Navigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Studentdetailtable from './studenttable';
import "../styles/home.css";
import axios from 'axios';

export default function Teacherdetailpage() {
  const url = String(import.meta.env.VITE_REACT_API_URL);

    const cookies = new Cookies();
   const auth=cookies.get('_UID');
   if(!auth){
     return <Navigate to='/signin'/>
   }
    interface RouteParams {
        paramName: string;
      }  
      const { id } = useParams<RouteParams>();
       console.log(id);
      const [data, setdata] = useState([]);
      const [load, setload] = useState(false);
      const coverttopdf=useRef();
      
      const getstudent = async (id: any,admin_id:any) => {
        setload(true);
        try {
          const res = await axios.get(`${url}/apiteacher/${admin_id}/${id}`);
          setdata(res.data);
          setload(false);
        } catch (err) {
          setload(true);
          return err;
        }
      };
      useEffect(() => {
        getstudent(id,auth);
      }, []);
    
      const generatepdf1=useReactToPrint({
        content:()=>coverttopdf.current,
        documentTitle:"student",
    })
  return (
      <div>
         <div style={{padding:'20px'}} className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
    

    <div>
                <Link to='/human_resoures/teaching-staff'>
                <button>
                <svg className="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> 
                <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /></svg>
                </button>
                </Link>
                
                <button style={{position:'absolute',right:'8%'}}>  <svg class="h-6 w-6"  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> 
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
                    src={`https://oohrerpsystem.onrender.com/${el.teacher_img}`}
                    alt="nature image"
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Educator Name</h3>
                    {el.teacher_name}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Date of birth</h3>
                    {el.date_of_birth}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Facebook Account</h3>
                    {el.facebook}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Twitter Account</h3>
                    {el.twitter}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Linkedin Account</h3>
                    {el.linkedin}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Gender</h3>
                    {el.gender}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Full Address</h3>
                    {el.address}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Religion</h3>
                    {el.religion}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Phone</h3>
                    {el.phone}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Email</h3>
                    {el.email}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Martial Status</h3>
                    {el.martial_status}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">City</h3>
                    {el.city}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Qualification</h3>
                    {el.qualification}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">
                    Role
                    </h3>
                    {el.role}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">department</h3>
                    {el.department}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Status</h3>
                    {el.status}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Account Holder Name</h3>
                    {el.accountholdername}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Account Number</h3>
                    {el.accountnumber}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Bank Name</h3>
                    {el.bankname}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Bank Branch</h3>
                    {el.branch}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Date of Leaving</h3>
                    {el.dateofleaving}
                  </div>
                  <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Googleplus</h3>
                    {el.googleplus}
                  </div>
                   <div style={{ borderBottom: '1px solid silver' }}>
                    <h3 className="text-1xl font-bold">Educator document</h3>
                    <a href={`https://oohrerpsystem.onrender.com/${el.teacherdocs}`}>Click here</a>
                  </div>
                 
                </div>
              </div>
            ))
          )}
        </div>
        <TeacherPerdaydetail/>

      </div>
   
  )
}
