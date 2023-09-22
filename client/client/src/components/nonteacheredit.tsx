import React from 'react'
import { useState,useEffect} from 'react';
import { Input, Spinner,DialogFooter,Button } from '@material-tailwind/react'
import {useForm} from "react-hook-form";
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';
export default function NonTeacheredit({data}) {
    const url = String(import.meta.env.VITE_REACT_API_URL);
    const cookies = new Cookies();
    const auth = cookies.get('_UID');
    const successnotify = (text: string) =>
    toast.success(text, {
      position:'top-center',
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
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
      const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
      const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          setSelectedFile1(event.target.files[0]);
        }
      };
    
      const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          setSelectedFile2(event.target.files[0]);
        }
      };
 
  
  
  const [updateload,setupdateload]=useState(false);
  const updatedata=(data:object)=>{
    setupdateload(true);

        postdata(data);
        updatedstudentdoc();
        updatedstudentimg();
    
  }
  const teacher_code=data[0].teacher_id;
  const getalldata=data[3]
  const close=data[2];
  const postdata=async(data:any)=>{
   
        setupdateload(true);
    try{
      const res=await axios.put(`${url}/nonteacherupdate/${teacher_code}`,data);
      if(res.data.message==='Updated Successfully'){
      successnotify('Updated successfully');

      setupdateload(false);
      setTimeout(() => {
        close();
      }, 2000);
    
      getalldata(auth);
      }else{
        setupdateload(false);
    
        notify('Something went wrong please try again');
      }
          }catch(err){
                setupdateload(false);
    
                notify('Something went wrong please try again');
    
            return err;
          }
      
    
    
  }
  const updatedstudentdoc=async()=>{
      if(selectedFile1){
        try{
        
          const studentdoc=new FormData();
          studentdoc.append('file1',selectedFile1);

        const res=await axios.put(`${url}/nonteacherdoc/${teacher_code}`,studentdoc,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        getalldata(auth);

        }catch(err){
          notify('Something went wrong please try again');

        return err;
        }
      }
   
  }
  const updatedstudentimg=async()=>{
    if(selectedFile2){
      try{
      
        const studentimg=new FormData();
        studentimg.append('file2',selectedFile2);
      const res=await axios.put(`${url}/nonteacherimg/${teacher_code}`,studentimg,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      getalldata(auth);

      }catch(err){
        notify('Something went wrong please try again');

     return err;
      }
    }
}
  return (
    <>
 <ToastContainer></ToastContainer>
    
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-5">
          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name <p style={{ color: 'red' }}>*</p>
            </label>
            <input
              type="text"
              value={data[0].name}
              {...register('name',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setname(e.target.value);
              }
               })}
              id="default-input"
              placeholder="Enter name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of birth
              <p style={{ color: 'red' }}>*</p>
            </label>
            <input
              type="date"
              value={data[0].dob}
              {...register('dob',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setdob(e.target.value);
              }
               })}
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
     
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Religion
            </label>
            <input
              type="text"
              value={data[0].religion}
              {...register('religion',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setreligion(e.target.value);
              }
               })}
              placeholder="Enter religion"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
      
          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
              <p style={{ color: 'red' }}>*</p>
            </label>
            <input
            value={data[0].email}
              {...register('email',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setemail(e.target.value);
              }
               })}
              placeholder="info@example.com"
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
              <p style={{ color: 'red' }}>*</p>
            </label>
            <input
            value={data[0].phone}
              {...register('phone',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setphone(e.target.value);
              }
               })}
              type="number"
              placeholder="+91 1234567890"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qualification
              <p style={{ color: 'red' }}>*</p>
            </label>
            <input
            value={data[0].qualification}
              {...register('qualification',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setqualification(e.target.value);
              }
               })}
              placeholder="Enter Qualification"
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Martial Status
              <p style={{ color: 'red' }}>*</p>
            </label>
            <select
            value={data[0].martial_status}
              {...register('martial_status',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setmartial_status(e.target.value);
              }
               })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="married">Married</option>
              <option value="single">Single</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Address
            </label>
            <input
              type="text"
              value={data[0].address}
              {...register('address',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setaddress(e.target.value);
              }
               })}
              placeholder="Enter full address"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
      
          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Department
              <p style={{ color: 'red' }}>*</p>
            </label>
            <select
              {...register('department',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setdepartment(e.target.value);
              }
               })}
               value={data[0].department}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value=""> Select Department </option>
              <option value="administration">Administration Department</option>
              <option value="admissions">Admissions Department</option>
              <option value="student-affairs">
                Student Affairs/Student Services Department
              </option>
              <option value="academic-support">
                Academic Support Department
              </option>
              <option value="research">Research Department</option>
              <option value="alumni-relations">
                Alumni Relations Department
              </option>
              <option value="counseling">Counseling Department</option>
              <option value="library">Library/Media Center</option>
              <option value="athletics">Athletics Department</option>
              <option value="communications">
                Communications/PR Department
              </option>
              <option value="security">Security Department</option>
              <option value="transportation">Transportation Department</option>
              <option value="facilities">
                Facilities/Operations Department
              </option>
              <option value="other">other</option>

            </select>
          </div>
       
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Salary
            </label>
            <input
            value={data[0].salary}
              {...register('joiningsalary',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setsalary(e.target.value);
              }
               })}
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select status
            </label>
            <select
              {...register('status',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setstatus(e.target.value);
              }
               })}
               value={data[0].status}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </select>
          </div>
        </div>

        <div>
          <p className="font-bold text-2xl" style={{ marginBottom: '20px' }}>
            Bank Details
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Account Holder Name
              <p style={{ color: 'red' }}>*</p>
            </label>
            <input
            value={data[0].accountholdername}
              {...register('accountholdername',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setaccountname(e.target.value);
              }
               })}
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Account Number
              <p style={{ color: 'red' }}>*</p>
            </label>
            <input
            value={data[0].accountnumber}
              {...register('accountnumber',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setaccountnumber(e.target.value);
              }
               })}
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Bank Name
              <p style={{ color: 'red' }}>*</p>
            </label>
            <input
            value={data[0].bankname}
              {...register('bankname',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setbankname(e.target.value);
              }
               })}
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Branch
              <p style={{ color: 'red' }}>*</p>
            </label>
            <input
            value={data[0].branch}
              {...register('branch',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[1].setbranch(e.target.value);
              }
               })}
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <p className="font-bold text-2xl" style={{ marginBottom: '20px' }}>
            Identity Document
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
          <div>
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Documents
              <p style={{ color: 'red' }}>*</p>
            </label>
            <input
              name="file1"
              onChange={handleFileChange1}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="multiple_files"
              type="file"
              multiple
            />
          </div>
          <div>
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
              <p style={{ color: 'red' }}>*</p>
            </label>
            <input
              name="file2"
              onChange={handleFileChange2}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="multiple_files"
              type="file"
              multiple
            />
          </div>
        </div>
        
    
      <div style={{width:'100%'}} className='mt-5'>
          <Button
            variant="text"
            color="red"
            onClick={data[2]}
            className="mr-1 w-full"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" className='w-full' color="green" onClick={handleSubmit(updatedata)}>
            <span>
               {updateload?<Spinner style={{margin:'auto'}}/>:"Save"}
                </span>
          </Button>
        </div>

    </>
  )
}
