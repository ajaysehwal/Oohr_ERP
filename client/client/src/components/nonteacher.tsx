import React from 'react';
import { Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';
import Nonteachertable from "./nonteachertable";
import { Avatar, Divider } from '@mui/material';

import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
export default function NonTeachering({mydata}) {
  const getdata=mydata[0];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [load, setload] = useState(false);
  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  if (!auth) {
    return <Navigate to="/signin" />;
  }
  const verified_token = cookies.get('_UID');

  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
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

  const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile1(event.target.files[0]);
    }
  };
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile2(event.target.files[0]);
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const url = event.target.result;

          setImageURL(url);
        };

        reader.readAsDataURL(file);
      }
    }
  };
  const FormReset=()=>{
    const form=document.querySelector('#teacherform');
    if(form){
      form.reset();
    }
   
  }
  const onSubmit = async(data: any) => {
    setload(true);

         if(data.name==""||data.dob==''||data.gender==''||data.email===''||data.phone==''||data.qualification==''||data.martial_status==''||data.department==''){
          setload(false);

          notify('Please enter all required information');
         }else{
          if(data.accountholdername===''||data.accountnumber==''||data.bankname==''||data.branch==''){
         notify("Please enter all bank information")
         setload(false);

          }else{
             if(data.phone.length!==10){
               notify('Please enter 10 characters phone number')
             }else{
              if (selectedFile1 && selectedFile2) {

                setload(true);
    
                const formData = new FormData();
                formData.append('file1', selectedFile1||'');
                formData.append('file2', selectedFile2||'');
                formData.append('name', data.name);
                formData.append('dob',data.dob);
                formData.append('bloodgroup', data.bloodgroup);
           
                formData.append('gender', data.gender);
                formData.append('address', data.address);
                formData.append('religion', data.religion);
                formData.append('phone', data.phone);
                formData.append('email', data.email);
                formData.append('martial_status', data.martial_status);
                formData.append('qualification', data.qualification);
                formData.append('department', data.department);
                formData.append('status', data.status);
                formData.append('accountholdername', data.accountholdername);
                formData.append('accountnumber', data.accountnumber);
                formData.append('bankname', data.bankname);
                formData.append('branch', data.branch);
                formData.append('joiningsalary', data.joiningsalary);
                formData.append('dateofjoining', data.dateofjoining);
                formData.append('school_id',verified_token);
                postnonteacherdata(formData);
                }else{
                  setload(false);
                  notify('Please Upload Identity document')
                }
             }
          
          }
        
        }
      }
const postnonteacherdata=async(data:any)=>{
  setload(true);
  try {
    const response = await axios.post(`${url}/nonteacherapi`,data,{
     headers: {
       'Content-Type': 'multipart/form-data',
     },
    });
    setload(false);
     if(response.data.protocol41===true){
      successnotify("Registered Successfully");
      setload(false);
      mydata[1]();
      FormReset();
      getdata(verified_token);
      
      }else{
     notify("Something went wrong please try again")
     }
     } catch (error) {
      setload(false);

       notify('Something went wrong please try again')
       console.error(error);
     }
}
    
  return (
     <div>
      <ToastContainer></ToastContainer>
    <div
      style={{ padding: '20px' }}
      className="rounded-sm  bg-white dark:border-strokedark dark:bg-boxdark"
    >
      <form
      id='teacherform'
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        method="post"
        style={{ width: '90%', margin: 'auto' }}
        action=""
      >
        <p className="font-bold text-2xl text-center mb-3">
          Register Non-Teaching Staff
        </p>
       
          <Divider/>
          <div className="mt-2">

            <Avatar src={imageURL} sx={{ width: 120, height: 120 }} className="m-auto" />
            <div className="flex gap-2 align-middle justify-center mt-2">
              <label className="custom-file-input-button" >
                <input
                  type="file"
                  accept="image/*"
                  name="file2"
                  onChange={handleFileChange2}
                  className="file-input"
                  multiple

                />
                Upload
              </label>
              <Button className="bg-red-100 text-red-500" onClick={() => setImageURL('')}>Reset</Button>
            </div>
          </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-5">
          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name <p style={{ color: 'red' }}>*</p>
            </label>
            <input
              type="text"
              {...register('name')}
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
              {...register('dob')}
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label
              style={{ display: 'flex', gap: '5px' }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
              <p style={{ color: 'red' }}>*</p>
            </label>
            <select
              {...register('gender')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Religion
            </label>
            <input
              type="text"
              {...register('religion')}
              placeholder="Enter religion"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Blood Group
            </label>
            <input
              {...register('bloodgroup')}
              placeholder="Enter blood group"
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
              Email
              <p style={{ color: 'red' }}>*</p>
            </label>
            <input
              {...register('email')}
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
              {...register('phone')}
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
              {...register('qualification')}
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
              {...register('martial_status')}
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
              {...register('address')}
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
              {...register('department')}
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
              Date of joining
            </label>
            <input
              {...register('dateofjoining')}
              type="date"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Salary
            </label>
            <input
              {...register('joiningsalary')}
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
              {...register('status')}
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
              {...register('accountholdername')}
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
              {...register('accountnumber')}
              type="number"
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
              {...register('bankname')}
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
              {...register('branch')}
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
        
        </div>
        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
          <Button type="submit" className="ml-auto  w-full" color="green">
          {load?<Spinner style={{margin:'auto'}}/>:"Register"}
          </Button>
        </div>
      </form>
      </div>
    
    </div>
  );
}
