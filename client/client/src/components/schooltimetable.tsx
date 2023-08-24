import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react'
import Cookies from 'universal-cookie'
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 import notfound from "./images/notfound.png"
import emptyfolder from "./images/emptyfolder.png";
import { useReactToPrint } from 'react-to-print';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
export default function Schooltimetable() {
  const {register,handleSubmit,watch,formState:{errors}}=useForm();
  const [open, setOpen] = React.useState(false);
  const url = String(import.meta.env.VITE_REACT_API_URL);

  const handleOpen = () => setOpen(!open);
  const [getclass,setclass]=useState([]);
  const [section,setsection]=useState([]);
    const cookies = new Cookies();
    const auth=cookies.get('_UID');
    const [timetable,settimetable]=useState([]);
    const coverttopdf=useRef();
    const generatepdf=useReactToPrint({
      content:()=>coverttopdf.current,
      documentTitle:"Teachers Table",
    })
    const getsectionbyclass=async(value:any,verified_token:any)=>{
      try{
        const res=await axios.get(`${url}/studentsection/${value}/${verified_token}`);
          setsection(res.data)
        
      }catch(err){
       
         console.log("error",err);
      }
    }
    const gettimetable=async(classes:any,section:any,school_id:any)=>{
        try{
            const res=await axios.get(`${url}/schooltimetablebyclasses/${classes}/${section}/${school_id}`);
              if(res.data.length===0){
                handleOpen();
              }else{
                settimetable(res.data);
              }
        }catch(err){
          settimetable([]);
          handleOpen();
            return err;
        }
      
    }
   
    const onSubmit=(data:any)=>{
      console.log(data);
        gettimetable(data.class,data.section,auth);
       
    }
  return (
      <div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"  style={{width:'100%',margin:'auto',display:'flex',alignItems:'center',justifySelf:'center',gap:'10px',padding:'20px'}} >
        <select  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"  {...register('class',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                   getsectionbyclass(e.target.value,auth);}}) } >
            <option value="">Select Class</option>

              <option value="nursery">Nursery</option>
                      <option value="pre_kg">Pre-Kindergarten</option>
                      <option value="kg">Kindergarten</option>
                      <option value="1st">1st Grade</option>
                      <option value="2nd">2nd Grade</option>
                      <option value="3rd">3rd Grade</option>
                      <option value="4th">4th Grade</option>
                      <option value="5th">5th Grade</option>
                      <option value="6th">6th Grade</option>
                      <option value="7th">7th Grade</option>
                      <option value="8th">8th Grade</option>
                      <option value="9th">9th Grade</option>
                      <option value="10th">10th Grade</option>
                      <option value="11th">11th Grade</option>
                      <option value="12th">12th Grade</option>
       
       
      </select>
      <select   className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" color="teal" label="select Class" {...register('section') } >
      <option value="">Select Section</option>
      <option value="A">A</option>
         <option value="B">B</option>
        <option value="C">C</option>
      {section?.map((el)=>(

         <option value={el.section}>{el.section}</option>

        ))}
       
      </select>
      <Button onClick={handleSubmit(onSubmit)} color="green" style={{display:'flex',alignItems:'center',gap:'3px'}}>
        
        <p>Get</p>
       <svg className="h-4 w-4"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/> 
         <circle cx="10" cy="10" r="7" /> 
          <line x1="7" y1="10" x2="13" y2="10" />  
          <line x1="10" y1="7" x2="10" y2="13" />  <line x1="21" y1="21" x2="15" y2="15" /></svg>
      </Button>
        </div>
       
         <div style={{marginTop:'10px',padding:'10px'}} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        
        <Button variant='outlined'  color='blue' onClick={generatepdf} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:"5px",marginLeft:'auto'}}>
         <svg className="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> 
          <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  
         <line x1="12" y1="11" x2="12" y2="17" />  <polyline points="9 14 12 17 15 14" /></svg>Download as Pdf</Button>
                <div  style={{width:"100%"}} ref={coverttopdf}  className="max-w-full overflow-x-auto">
          <table style={{marginTop:'10px'}}  className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Class
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                   Section
                  </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Start Day
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                 End Day
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Starting time
                </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Ending time
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Teacher
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                   Subject
                </th>
               
              </tr>
            </thead>
            <tbody>
              {timetable.length==0?
                <div style={{textAlign:'center',margin:'auto',width:"100%",display:'grid',alignItems:'center',justifyContent:'center',position:'absolute',padding:'20px'}}>
                   <img style={{width:'140px',margin:'auto'}} src={emptyfolder} alt="" />
                 <p className='text-2xl font-bold' style={{textAlign:'center',margin:'auto'}}>No Timetable Found</p>
                 <p style={{textAlign:'center',margin:'auto'}}>Select Class And Section to view Timetable.</p>
                 </div>
             :timetable.map((el,i) => (
                <tr className="text-black dark:text-black"  key={el.id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                      {el.class}
                    </h5>                 
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {el.section}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {el.startday}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {el.endday}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {el.startingtime}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {el.endingtime}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                     <Link to={`/academics/schooltimetable/${el.teacher_id}`}>
                       {el.assign_teacher}</Link>
                     
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {el.subject}
                    </h5>
                  </td>
                 
                 
                </tr>

              ))}

            </tbody>
          </table>
        </div>
        </div>
        <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        style={{textAlign:'center',margin:'auto',display:'grid',alignItems:'center',width:'200px',padding:'20px'}}
      >
        {/* <DialogHeader style={{textAlign:'center',margin:'auto'}}>Error Message</DialogHeader>
        <DialogBody style={{textAlign:'center',margin:'auto'}} >
        Ensure you fill all required fields
 
        </DialogBody> */}
          <div>
            <img src={notfound} style={{width:'100px',margin:'auto'}} alt="" />
            <h1 className='text-3xl font-bold'>Timetable not found</h1> 
            <p>
              
            </p>
            <Button style={{width:'100px',margin:'10px'}} variant="gradient" color="green" onClick={handleOpen}>
            <span>Ok</span>
          </Button>
          </div>
       
        
      </Dialog>
      </div>

   
  )
}
