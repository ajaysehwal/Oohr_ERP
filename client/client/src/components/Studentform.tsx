import {
  IconButton,
  Spinner,
  Dialog,
 DialogBody,
} from '@material-tailwind/react';
import Lottie from 'lottie-react';

import success from "./animations/animation_lmg0sv1v.json";
import { useForm, Controller } from 'react-hook-form';

import { ToastContainer, toast } from 'react-toastify';

import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

import Cookies from 'universal-cookie';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export default function StudentAdmissionform() {
  const url = String(import.meta.env.VITE_REACT_API_URL);
  const [btnload, setbtnload] = useState(false);
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
  const [imageURL, setImageURL] = useState<string | null>(null);

 
  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile2(event.target.files[0]);
      const file = event.target.files[0];
        if (file) {
      const reader = new FileReader();

      reader.onload = (event:any) => {
        const url = event.target.result;

        setImageURL(url);
      };

      reader.readAsDataURL(file);
    }
    }
  };

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
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    const FormReset=()=>{
      const form=document.querySelector('#studentform');
      if(form){
        form.reset();
      }
     
    }
  const onSubmit = async (data: any) => {
    setbtnload(true);
    setload(true);
    if (data.student_name === '') {
      notify('Please enter student name');
      setbtnload(false);
    } else if (data.date_of_birth === '') {
      setbtnload(false);

      notify('Date of birth is compulsory for register new student');
    } else if (data.admission_no === '') {
      setbtnload(false);

      notify('Admission number is compulsory for register new student');
    } else if (data.select_class === '') {
      setbtnload(false);

      notify(
        
        'Please select student class if class is not there click on add button ',
      );
    } else {
      if (data.phone.length !== 10) {
                      setbtnload(false);

        notify('Student contact number must be at least 10 characters');
      } else {
        try {
          setbtnload(true);
          const res = await axios.get(
            `${url}/apistudents/${data.admission_no}`,
          );

          if (res.data.length >= 1) {
            setbtnload(false);

            notify('This admission number already present');
          } else {
            setbtnload(true);
            const formData = new FormData();
            if (selectedFile1 && selectedFile2) {
              formData.append('file1', selectedFile1);
              formData.append('file2', selectedFile2);
              formData.append('student_name', data.student_name);
              formData.append('date_of_birth', data.date_of_birth);
              formData.append('father_name', data.father_name);
              formData.append('mother_name', data.mother_name);
              formData.append('address', data.address);
              formData.append('nationality', data.nationality);
              formData.append('admission_no', data.admission_no);
              formData.append('gender', data.gender);
              formData.append('religion', data.religion);
              formData.append('city', data.city);
              formData.append('age', data.age);

              formData.append('phone', data.phone);
              formData.append('parents_phone', data.parents_phone);
              formData.append(
                'previous_school_name',
                data.previous_school_name,
              );

              formData.append('email', data.email);
              formData.append(
                'transfer_certificate',
                data.transfer_certificate,
              );
              formData.append('physical_handicap', data.physical_handicap);
              formData.append('house', data.house);
              formData.append('state', data.state);
              formData.append('admin_token', verified_token);
              formData.append('student_category', data.student_category);
              formData.append('select_class', data.select_class);
              formData.append('section', data.section);

              formData.append('blood_group', data.blood_group);
              formData.append('birth_certificate', data.birth_certificate);
              formData.append(
                'additional_information',
                data.additional_information,
              );

              poststudentdata(formData);
              setload(false);
            } else {
              setload(false);
              setbtnload(false);

              notify('Please Upload Student Document');
            }
          }
        } catch (err) {
          return err;
        }
      }
    }
  };

  const poststudentdata = async (formdata: any) => {
    setbtnload(true);

    try {
      const res = await axios.post(`${url}/apistudents`, formdata);
     
      if (res.data.protocol41 == true) {
        handleOpen();
        setbtnload(false);
        FormReset();
        setImageURL('')
      } else {
        notify('Something went wrong please try again');
        setload(false);
      }
    } catch (err) {
      setload(true);
      setbtnload(false);
      notify('Something went wrong please try again');
      return err;
    }
  };
   const successok=()=>{
    handleOpen();
}
  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  if (!auth) {
    return <Navigate to="/signin" />;
  }
  const verified_token = cookies.get('_UID');
  const [load, setload] = useState(false);
  const [get, getdata] = useState([]);
  const [gethouses, setgethouse] = useState([]);

  const gethouse = async (token: any) => {
    setload(true);
    try {
      const res = await axios.get(`${url}/api.studenthouses/${token}`);
      setgethouse(res.data);
      setload(false);
    } catch (err) {
      setload(true);
      return err;
    }
  };
  useEffect(() => {
    gethouse(verified_token);
  }, []);
  const [section, setsection] = useState([]);
  const getsectionbyclass = async (value: any) => {
    try {
      const res = await axios.get(
        `${url}/studentsection/${value}/${verified_token}`,
      );
      setsection(res.data);
      setload(false);
    } catch (err) {
      setload(true);
      return err;
    }
  };
  
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <div>
        <ToastContainer></ToastContainer>
        <p
          style={{ textAlign: 'center', marginBottom: '30px' }}
          className="text-2xl font-bold dark:text-white"
        >
          Admission form
        </p>
        <form
         id="studentform"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 max-w-screen-lg sm:w-96"
          style={{ width: '100%', margin: 'auto' }}
        >
          <div className="m-auto">

            <Avatar src={imageURL} sx={{ width: 120, height: 120 }} className="m-auto" />
            <div className="flex gap-2 align-middle justify-center mt-2">
          
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload 
      <VisuallyHiddenInput  accept="image/*"
          name="file2"
          onChange={handleFileChange2}  multiple type="file" />
    </Button>
              <Button variant="outlined" color="error" className="bg-red-100 text-red-500" onClick={()=>setImageURL('')}>Reset</Button>
            </div>
          </div>

          <p className="font-bold text-[20px]">Student Information</p>
          <Divider />

          <div
            style={{ marginTop: '10px' }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <input
              type="hidden"
              {...register('admin_token')}
              value={verified_token}
            />
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Student name
              </label>
              <input
                placeholder="Enter student name"
                {...register('student_name')}
                type="text"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Date of birth
              </label>
              <input
                placeholder="Enter student date of birth"
                {...register('date_of_birth')}
                type="date"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>

            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Student Age
              </label>
              <input
                placeholder="Enter student age"
                {...register('age')}
                type="number"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>

            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Phone number
              </label>
              <input
                placeholder="Enter phone number"
                {...register('phone')}
                type="number"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Previous school name
              </label>
              <input
                placeholder="Enter previous school name"
                {...register('previous_school_name')}
                type="text"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Select Gender
              </label>
              <select
                {...register('gender')}
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Select Category
              </label>
              <select
                {...register('student_category')}
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="">Student Category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC/ST">SC/ST</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Select Class
              </label>
              <select
                {...register('select_class', {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    getsectionbyclass(e.target.value);
                  },
                })}
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
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
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Admission no
              </label>
              <input
                placeholder="Enter unique admission number"
                {...register('admission_no')}
                type="number"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select
                {...register('house')}
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="">Select House</option>
                {gethouses?.map((el:any) => (
                  <option value={el.house_name}>{el.house_name}</option>
                ))}
              </select>

              <Link to="/setting/studenthouses">
                <IconButton color="green" className="rounded-full" fullWidth>
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </IconButton>
              </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select
                {...register('section')}
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="">Select Section</option>

                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                {section?.map((el:any) => (
                  <option value={el.section}>{el.section}</option>
                ))}
              </select>

              <Link to="/academics/classes_sections">
                <IconButton color="green" className="rounded-full" fullWidth>
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </IconButton>
              </Link>
            </div>
            {/* ;;;;;;;;;;;;;;;;;;;;;;;; */}
          </div>
          <p className="font-bold text-[20px] mt-5">Parents Information</p>

          <Divider />
          <div
            style={{ marginTop: '10px' }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Father name / Parents
              </label>
              <input
                placeholder="Enter father name"
                {...register('father_name')}
                type="text"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Mother name / Parents
              </label>
              <input
                placeholder="Enter mother name"
                {...register('mother_name')}
                type="text"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Parents phone number
              </label>
              <input
                placeholder="Enter parents phone  number"
                {...register('parents_phone')}
                type="number"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Email Address
              </label>
              <input
                placeholder="Enter student email address"
                {...register('email')}
                type="text"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            {/* '''''''''''''''''''''''' */}
          </div>
          <p className="font-bold text-[20px] mt-5">Address Information</p>

          <Divider />
          <div
            style={{ marginTop: '10px' }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Full Address
              </label>
              <input
                placeholder="Enter full address"
                {...register('address')}
                type="text"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                City name
              </label>
              <input
                placeholder="Enter city name"
                {...register('city')}
                type="text"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Nationality
              </label>
              <input
                placeholder="Enter nationality name"
                {...register('nationality')}
                type="text"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                State
              </label>
              <input
                placeholder="Enter State name"
                {...register('state')}
                type="text"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
          </div>
          <p className="font-bold text-[20px] mt-5">Upload Document</p>

          <Divider />
          <div
            style={{ marginTop: '10px' }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <div>
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Select Document Type
              </label>
              <select
                id="countries"
                {...register('birth_certificate')}
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="dob">Birth Certificate</option>
                <option value="aadhar">Aadhar Card</option>
                <option value="passport">Passport</option>
              </select>
            </div>
            <div>
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Upload Student Document
              </label>
              <input
                className="text-gray-900 border-gray-300 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full cursor-pointer rounded-lg border text-sm focus:outline-none"
                name="file1"
                onChange={handleFileChange1}
                id="multiple_files"
                type="file"
                multiple
              />
            </div>
          </div>

          <p className="font-bold text-[20px] mt-5">Optional</p>

          <Divider />
          <div
            style={{ marginTop: '10px' }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Religion
              </label>
              <input
                placeholder="Enter religion name"
                {...register('religion')}
                type="text"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Student Blood Group
              </label>
              <input
                placeholder="Enter Student Blood Group"
                {...register('blood_group')}
                type="text"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Select an option
              </label>
              <select
                {...register('transfer_certificate')}
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="">Transfer certificate</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="mb-2">
               <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Select an option
              </label>
              <select
                {...register('physical_handicap')}
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="">Physical Handicap</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="mb-2">
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Additional Information
              </label>
              <input
                {...register('additional_information')}
                type="text"
                id="default-input"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
          </div>

        
          <Button color="success" variant="contained" type="submit" className="mt-6" fullWidth>
            {btnload ? <Spinner style={{ margin: 'auto' }} /> : 'Register'}
          </Button>
        </form>
      </div>
      <Dialog size='sm' open={open} handler={handleOpen}>
        <DialogBody>
           <div className='w-[200px] m-auto'>
           <Lottie
          
          animationData={success} 
          loop={false} 
          autoplay={true}
        />
           </div>
            <div className='m-auto grid grid-cols-1 gap-2'>
            <p className='font-bold text-center text-2xl'>Student successfully registerd</p>
           <Button className='m-auto'  color="success" onClick={successok}>
            <span>Ok</span>
          </Button>
            </div>
         
       
        </DialogBody>
       
      </Dialog>


    </>
  );
}
