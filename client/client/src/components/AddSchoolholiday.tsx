import React from 'react';
import { Input } from '@material-tailwind/react';
import Studentholidaylist from "./schoolholidaylist";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import {useState,useEffect} from "react";
import Cookies from 'universal-cookie';
import { Spinner } from "@material-tailwind/react";

export default function AddSchoolHoilday() {
  const cookies = new Cookies();
  const auth=cookies.get('_UID');
  if(!auth){
    return <Navigate to='/signin'/>
  }
  const verified_token = cookies.get('_UID');
  const [load,setload]=useState(false);
  
  const [classdata,setclasses]=useState([]);
  const [finaldata,setfinaldata]=useState([]);
  const notify = (text: string) =>
    toast.error(text, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    const url = String(import.meta.env.VITE_REACT_API_URL);

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
  interface FormSchema{
    user:{
      holiday_name:string,
      user_token:string,
      startdate:'',
      enddate:'',
      
    }
  }

  const [data,setdata]=useState<FormSchema>({
    user:{
     holiday_name:'',
     user_token:verified_token,
     startdate:'',
     enddate:''

    }
  })
  
  const handlechange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
    setdata({
     user:{
       ...data.user,
       [e.target.name]:e.target.value,
     }
    })
   }
  const handlesubmit=(e:React.FormEvent<HTMLFormElement>):void=>{
    e.preventDefault();
  
    const formdata=data.user;
     if(formdata.class_name===''){
      notify('Please enter class name');
     }else{
      postclasses(formdata);
     }
 }
  const postclasses=async(formdata:object )=>{
      setload(true)
      try{
          const res=await axios.post(`${url}/schoolholiday`,formdata);
                
            successnotify('New holiday successfully Added')
            setdata({user:{
              holiday_name:'',
              user_token:verified_token,
              startdate:'',
              enddate:''

         
             }})
             getclasses(verified_token);
            setload(false)
        }catch(err){
          setload(true);
          notify('Please try again');
           console.log("error",err);
        }
       
  }
  const getclasses=async(token:any)=>{
    setload(true)
    try{
      const res=await axios.get(`${url}/schoolholiday/${token}`);
        setclasses(res.data);
        setfinaldata(res.data);
      setload(false);
    }catch(err){
      setload(true);
       console.log("error",err);
    }
}
const [filterval,setfilterval]=useState();
const searchbarchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
     console.log(e.target.value);
       if(e.target.value===''){
            setclasses(finaldata);
       }else{
         const filtered= classdata.filter(el=>el.holiday_name.toLowerCase().includes(e.target.value.toLowerCase()));
         setclasses(filtered);
       }
       setfilterval(e.target.value);
}
 
useEffect(()=>{
   getclasses(verified_token);
},[])

   if(load){
    return <Spinner style={{display:'flex',alignItems:'center',justifyContent:'center',margin:'auto'}} className="h-8 w-8"/>
   }
   

  return (
    <div>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3
                style={{ display: 'flex', alignItems: 'center', gap: '1px' }}
                className="font-medium text-black dark:text-white"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '25px' }}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  ></path>
                </svg>{' '}
                Add School Holiday
              </h3>
            </div>
            <form onSubmit={handlesubmit} >
              <div className="p-6.5"> 
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-10/12">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Holiday Name
                    </label>
                    <input
                      type="text"
                      onChange={handlechange}
                      name='holiday_name'
                      placeholder="Enter Holiday Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                   
                  </div>
                </div>
                  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <div className="w-full xl:w-10/12">
                  <label className="mb-2.5 block text-black dark:text-white">
                   Start Date
                  </label>
                  <input
                    type="date"
                    onChange={handlechange}
                    name='startdate'
                    placeholder="Description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-10/12">
                  <label className="mb-2.5 block text-black dark:text-white">
                  Last Date
                  </label>
                  <input
                    type="date"
                    onChange={handlechange}
                    name='enddate'
                    placeholder=""
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                  </div>
               
                <ToastContainer></ToastContainer>

                <button
                  type='submit'
                  style={{ marginTop: '10px' }}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Sign In Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div
              className="border-b border-stroke py-4 px-6.5 dark:border-strokedark"
              style={{ display: 'flex', alignItems: 'center', gap: '50px' }}
            >
              <h3
                style={{ display: 'flex', alignItems: 'center', gap: '1px' }}
                className="font-medium text-black dark:text-white"
              >
                <svg
                  style={{ width: '25px' }}
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  ></path>
                </svg>
                List
              </h3>
              <Input size="lg" value={filterval} label="Search" name='text' onInput={(e)=>searchbarchange(e)} />
            </div>
            <Studentholidaylist  data={[classdata,getclasses]}/>
          </div>
        </div>
      </div>
    </div>
  );
}
