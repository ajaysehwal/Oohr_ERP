import React from 'react';
import { Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';
import Nonteachertable from "./nonteachertable";
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
export default function TeacheringStaff({data}) {
  const getdata=data;
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
  const url = String(import.meta.env.VITE_REACT_API_URL);

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
  const onSubmit = async(data: any) => {
    setload(true);
    console.log(data);

         if(data.name==""||data.dob==''||data.gender==''||data.email===''||data.phone==''||data.qualification==''||data.martial_status==''||data.department==''){
          setload(false);

          notify('Please enter all required information');
         }else{
          if(data.accountholdername===''||data.accountnumber==''||data.bankname==''||data.branch==''){
         notify("Please enter all bank information")
         setload(false);

          }else{
            if (selectedFile1 && selectedFile2) {

            setload(true);

            const formData = new FormData();
            formData.append('file1', selectedFile1);
            formData.append('file2', selectedFile2);
            formData.append('name', data.name);
            formData.append('dob',data.dob);
            formData.append('facebook', data.facebook);
            formData.append('bloodgroup', data.bloodgroup);
            formData.append('twitter', data.twitter);
            formData.append('linkedin', data.linkedin);
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
            postteacherdata(formData);
            }else{
              setload(false);
              notify('Please Upload Identity document')
            }
          }
        
        }
      }
const postteacherdata=async(data:any)=>{
  setload(true);
  try {
    const response = await axios.post(`${url}/apiteacher`,data,{
     headers: {
       'Content-Type': 'multipart/form-data',
     },
    });

    setload(false);
     if(response.data.protocol41===true){
      successnotify("Registered Successfully");
      setload(false);
     getdata();
      
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
      className="rounded-sm  bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        method="post"
        style={{ width: '90%', margin: 'auto' }}
        action=""
      >
        <p className="font-bold text-2xl text-center mb-10">
          Register Teaching Staff
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              type="text"
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
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Facebook
            </label>
            <input
              {...register('facebook')}
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Twitter
            </label>
            <input
              {...register('twitter')}
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Linkedin
            </label>
            <input
              {...register('linkedin')}
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
              Department
              <p style={{ color: 'red' }}>*</p>
            </label>
            <select
              {...register('department')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value=""> Select Department </option>
              <option value="english">English Department</option>
        <option value="math">Mathematics Department</option>
        <option value="science">Science Department</option>
        <option value="social-studies">Social Studies Department</option>
        <option value="foreign-languages">Foreign Languages Department</option>
        <option value="physical-ed">Physical Education Department</option>
        <option value="fine-arts">Fine Arts Department</option>
        <option value="performing-arts">Performing Arts Department</option>
        <option value="music">Music Department</option>
        <option value="visual-arts">Visual Arts Department</option>
        <option value="computer-science">Computer Science Department</option>
        <option value="technology-ed">Technology Education Department</option>
        <option value="business-ed">Business Education Department</option>
        <option value="economics">Economics Department</option>
        <option value="home-economics">Home Economics Department</option>
        <option value="industrial-arts">Industrial Arts Department</option>
        <option value="health-ed">Health Education Department</option>
        <option value="special-ed">Special Education Department</option>
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
              Joining Salary
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

  