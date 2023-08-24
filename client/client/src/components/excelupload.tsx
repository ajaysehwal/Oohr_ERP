import React from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Select,
  Option,
  Typography,
} from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';

import { useForm } from 'react-hook-form';

import { useState ,useEffect} from 'react';
import { IconButton } from '@material-tailwind/react';
import axios from 'axios';
import Cookies from 'universal-cookie';
export default function Excelupload() {
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const successnotify = (text: string) =>
  toast.success(text, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
  const notify = (text: string) =>
  toast.error(text, {
    position:'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
  const cookies = new Cookies();
  const auth=cookies.get('_UID');
  const url = String(import.meta.env.VITE_REACT_API_URL);

  const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile1(event.target.files[0]);
    }
  };
          const Onsubmit=(data:any)=>{
           
             if(selectedFile1){
              const formData=new FormData();
               formData.append('file',selectedFile1);
               formData.append('admin_token',auth);
               formData.append('class',data.class);
               formData.append('section',data.section);
                  postexcelfile(formData);
             }else{
                notify("Please Upload Excel File Only")
             }
           
          }
          const postexcelfile=async(data:any)=>{
             try{
              const res=await axios.post(`${url}/apiexceldata`,data,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
               successnotify('New student list successfully added')
             }catch(err){
               notify('Please Upload Excel File Only');
              return err;
             }
          }
          const [classes, setgetclasses] = useState([]);
  const [section,setsection]=useState([]);
const [load,setload]=useState(false);
  const getclasses = async (token: any) => {
    setload(true);
    try {
      const res = await axios.get(
        `${url}/studentclasses/${token}`
      );
      setgetclasses(res.data);

      setload(false);
    } catch (err) {
      setload(true);
      console.log('error', err);
    }
  };
  const getsectionbyclass=async(value:any,verified_token:any)=>{
    try{
      const res=await axios.get(`${url}/studentsection/${value}/${verified_token}`);
        setsection(res.data)

      
    }catch(err){
     
       console.log("error",err);
    }
  }
 
  useEffect(() => {
    getclasses(auth);
  }, []);
  return (
    <div>
      {/*  */}
      <form  style={{ display: 'grid', gap: '10px' }} method="post" encType="multipart/form-data" onSubmit={handleSubmit(Onsubmit)}>
      <ToastContainer></ToastContainer>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
        <select  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"  
        {...register('class',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
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
      
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <select   className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" color="teal" {...register('section') } >
      <option value="">Select Section</option>
               <option value="A">A</option>
               <option value="B">B</option>
               <option value="C">C</option>
        {section?.map((el)=>(

         <option value={el.section}>{el.section}</option>

        ))}
       
      </select>
        
        </div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload excel file only</label>
<input onChange={handleFileChange1} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
<p className="mt-1 text-sm text-red-500 dark:text-red-300" id="file_input_help">* Please follow proper sequences of excel data</p>

        <Button
        color="blue"
          type="submit"
          className="mt-6"
          fullWidth
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: 'auto',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </Button>
      </form>
    </div>
 
  );
}
