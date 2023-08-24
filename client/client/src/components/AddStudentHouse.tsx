import React from 'react';
import Studenthouselist from './studenthoueselist';
import { Input } from '@material-tailwind/react';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';
import {useState,useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Spinner } from "@material-tailwind/react";

export default function AddStudentHouse() {
  const cookies = new Cookies();
  const auth=cookies.get('_UID');
 if(!auth){
   return <Navigate to='/signin'/>
 }
 const verified_token = cookies.get('_UID');
 const [load,setload]=useState(false);
 const [classdata,setclasses]=useState([]);
 const [finaldata,setfinaldata]=useState([]);
const url = String(import.meta.env.VITE_REACT_API_URL);
const [upload,setupload]=useState(false);
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
     house_name:string,
      user_token:string,
     
   }
 }

 const [data,setdata]=useState<FormSchema>({
   user:{
    house_name:'',
   
    user_token:verified_token,

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
 const handlesubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  setupload(true);
   e.preventDefault();
  
   const formdata=data.user;
    if(formdata.house_name===''){
      setupload(false);

     notify('Please enter class name');
    }else{
      try{
        const res=await axios.get(`${url}/schoolhousescan/${formdata.house_name}/${verified_token}`);
        if(res.data.length>=1){
          setupload(false);

          notify(`${formdata.house_name} house already exists`);
        }else{
          postclasses(formdata);

        }
       }catch(err){
        setupload(false);

       notify('Something went wrong please try again')
       }
    }
}
 const postclasses=async(formdata:object )=>{
  setupload(true);

     setload(true)
     try{
         const res=await axios.post(`${url}/api.studenthouses`,formdata);
           successnotify('New House Created')
           setdata({user:{
               house_name:'',
                
             user_token:verified_token,
        
            }})
            gethouse(verified_token);
           setload(false)
           setupload(false);

       }catch(err){
         setload(true);
         setupload(false);

         notify('Something went wrong please try again');
       }
      
 }
 const gethouse=async(token:any)=>{
   setload(true)
   try{
     const res=await axios.get(`${url}/api.studenthouses/${token}`);
       setclasses(res.data);
       setfinaldata(res.data);
     setload(false);
   }catch(err){
     setload(true);
     notify('Something went wrong please try again');
   }
}
const [filterval,setfilterval]=useState();
const searchbarchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.value);
      if(e.target.value===''){
           setclasses(finaldata);
      }else{
        const filtered= classdata.filter(el=>el.house_name.toLowerCase().includes(e.target.value.toLowerCase()));
        setclasses(filtered);
      }
      setfilterval(e.target.value);
}

useEffect(()=>{
  gethouse(verified_token);
},[])


  
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
              Add House
            </h3>
          </div>
          <form onSubmit={handlesubmit} >
            <div className="p-6.5"> 
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-10/12">
                  <label className="mb-2.5 block text-black dark:text-white">
                    House name
                  </label>
                  <input
                    type="text"
                    onChange={handlechange}
                    name='house_name'
                    placeholder="Eg :- Red, Blue, Green , Yellow"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                 
                </div>
              </div>
              {/* <div className="w-full xl:w-10/12">
                <label className="mb-2.5 block text-black dark:text-white">
                House description
                </label>
                <input
                  type="hidden"
                  onChange={handlechange}
                  name='house_des'
                  placeholder="Description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div> */}
              <ToastContainer></ToastContainer>

              <button
                type='submit'
                style={{ marginTop: '10px' }}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                {upload?<Spinner/>:'Add'}
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
          <Studenthouselist data={[classdata,gethouse]}/>
        </div>
      </div>
    </div>
  </div>
  );
}
