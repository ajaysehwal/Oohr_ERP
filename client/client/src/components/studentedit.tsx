import React from 'react';
import { useState, useEffect } from 'react';
import { Input, Spinner, DialogFooter, Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import Lottie from 'lottie-react';
import success from "./animations/animation_lmg0sv1v.json";

import {
  Dialog, DialogBody,} from "@material-tailwind/react";
import axios from 'axios';
export default function Studentedit({ id }: { id: any }) {
  const url = String(import.meta.env.VITE_REACT_API_URL);
  const cookies = new Cookies();
  const auth = cookies.get('_UID');
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
  const [gethouses, setgethouse] = useState([]);

  const gethouse = async (token: any) => {
    try {
      const res = await axios.get(`${url}/api.studenthouses/${token}`);
      setgethouse(res.data);
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    gethouse(auth);
  }, []);
  
  const [student_name, setstudent_name] = useState('');
  const [date_of_birth, setdate_of_birth] = useState('');
  const [father_name, setfather_name] = useState('');
  const [mother_name, setmother_name] = useState('');
  const [admission_no, setadmission_no] = useState('');
  const [religion, setreligion] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [age, setage] = useState('');
  const [phone, setphone] = useState('');
  const [parents_phone, setparents_phone] = useState('');
  const [previous_school_name, setprevious_school_name] = useState('');
  const [email, setemail] = useState('');
  const [select_class, setselect_class] = useState('');
  const [section, setsection] = useState('');
  const [house, sethouse] = useState('');
  const [birth_certificate, setbirth_certificate] = useState('');
  const [student_cod,setstudent_code]=useState('')
  
  const [updateload, setupdateload] = useState(false);

  const updatedata = () => {
    const updatedstudent: any = {
      student_name,
      date_of_birth,
      father_name,
      mother_name,
      admission_no,
      religion,
      address,
      city,
      state,
      age,
      phone,
      parents_phone,
      previous_school_name,
      email,
      select_class,
      section,
      birth_certificate,
      house,
      student_cod,
      
    };
      setupdateload(true);

    postdata(updatedstudent);
    updatedstudentdoc();
    updatedstudentimg();
    console.log(updatedstudent);
  };

  const getstudent = async (id: any) => {
    try {
      const res = await axios.get(`${url}/studentdetails/${id}`);
      const R=res.data[0];
      setstudent_name(R.student_name);
      setdate_of_birth(R.date_of_birth);
      setfather_name(R.father_name);
      setmother_name(R.mother_name);
      setadmission_no(R.admission_no);
      setreligion(R.religion);
      setaddress(R.address);
      setcity(R.city);
      setstate(R.state);
      setage(R.age);
      setphone(R.phone);
      setparents_phone(R.parents_phone);
      setprevious_school_name(R.previous_school_name);
      setemail(R.email);
      setemail(R.email);
      setselect_class(R.select_class);
      setsection(R.section);
      setbirth_certificate(R.birth_certificate);
      setstudent_code(R.student_code);

    } catch (err) {
      return err;
    }
  };

  React.useEffect(() => {
    getstudent(id);
  }, [id]);

  const student_code = student_cod;
  const postdata = async (data: any) => {
    if (data.student_name === '') {
      setupdateload(false);

      notify('Please Enter a student name');
    } else {
      if (data.phone.length !== 10) {
        setupdateload(false);

        notify('Student Contact number should be only 10 characters');
      } else {
        if (data.parents_phone.length !== 10) {
          setupdateload(false);

          notify('Student parents contact number should be only 10 characters');
        } else {
          setupdateload(true);
          try {
            const res = await axios.put(
              `${url}/studentupdated/${student_code}`,
              data,
            );
            if (res.data.message === 'student updated successfully') {
              setupdateload(false);
              handleSuccess();
            } else {
              setupdateload(false);

              notify('Something went wrong please try again');
            }
          } catch (err) {
            setupdateload(false);

            notify('Something went wrong please try again');

            return err;
          }
        }
      }
    }
  };
  const updatedstudentdoc = async () => {
    if (selectedFile1) {
      try {
        const studentdoc = new FormData();
        studentdoc.append('file1', selectedFile1);

        const res = await axios.put(
          `${url}/studentupdateddocs/${student_code}`,
          studentdoc,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
      } catch (err) {
        return err;
      }
    }
  };
  const updatedstudentimg = async () => {
    if (selectedFile2) {
      try {
        const studentimg = new FormData();
        studentimg.append('file2', selectedFile2);
        const res = await axios.put(
          `${url}/studentupdatedimage/${student_code}`,
          studentimg,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
      } catch (err) {
        return err;
      }
    }
  };
  const [Success, setSuccess] = useState(false);
 
  const handleSuccess = () => setSuccess(!Success);
  return (
    <>
      <ToastContainer></ToastContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 p-3">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Student name
          </label>
          <input
            value={student_name}
            {...register('student_name', {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setstudent_name(e.target.value);
              },
            })}
            name="student_name"
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Date of Birth
          </label>
          <input
            {...register('data_of_birth',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setdate_of_birth(e.target.value);
              },
            })}
            value={date_of_birth}
            type="date"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Father name
          </label>
          <input
            {...register('father_name',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setfather_name(e.target.value);
              },
            })}
            value={father_name}
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Father name"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Mother name
          </label>
          <input
            {...register('mother_name',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setmother_name(e.target.value);
              },
            })}
            value={mother_name}
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Mother name"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Admission No
          </label>
          <input
            {...register('admission_no',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setadmission_no(e.target.value);
              },
            })}
            value={admission_no}
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Admission no"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Religion
          </label>
          <input
            {...register('religion',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setreligion(e.target.value);
              },
            })}
            value={religion}
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Religion"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Address
          </label>
          <input
            value={address}
            {...register('address',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setaddress(e.target.value);
              },
            })}
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Address"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            City
          </label>
          <input
            value={city}
            type="text"
            {...register('city',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setcity(e.target.value);
              },
            })}
            name="city"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="City"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            State
          </label>
          <input
            value={state}
            type="text"
            id="first_name"
            {...register('state',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setstate(e.target.value);
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="State"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Age
          </label>
          <input
            value={age}
            type="text"
            id="first_name"
            {...register('age',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setage(e.target.value);
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Student Age"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Phone
          </label>
          <input
            value={phone}
            type="text"
            id="first_name"
            {...register('phone',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setphone(e.target.value);
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Phone number"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Parents Phone
          </label>
          <input
            value={parents_phone}
            type="text"
            id="first_name"
            {...register('parents_phone',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setparents_phone(e.target.value);
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Parents phone number"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Previous School name
          </label>
          <input
            value={previous_school_name}
            type="text"
            {...register('previous_school_name',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setprevious_school_name(e.target.value);
              },
            })}
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Previous school name"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select House
          </label>

          <select
            value={house}
            {...register('house',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                sethouse(e.target.value);
              },
            })}
            className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="">Select House</option>
            {gethouses?.map((el: { house_name: any }) => (
              <option value={el.house_name}>{el.house_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            {...register('email',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setemail(e.target.value);
              },
            })}
            name="email"
            value={email}
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="email"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Student Class
          </label>

          <select
            value={select_class}
            {...register('select_class',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setselect_class(e.target.value);
              },
            })}
            name="select_class"
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
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Student Section
          </label>

          <select
            {...register('section',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setsection(e.target.value);
              },
            })}
            value={section}
            className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="">Select Section</option>

            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div>
          <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
            Select Identity Document
          </label>
          <select
            {...register('birth_certificate',{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setbirth_certificate(e.target.value);
              },
            })}
            value={birth_certificate}
            id="countries"
            className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="dob">Birth Certificate</option>
            <option value="aadhar">Aadhar</option>
            <option value="passport">Passport</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Update Student Document
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            name="file"
            onChange={handleFileChange1}
            type="file"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Update Student Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            name="file"
            onChange={handleFileChange2}
            type="file"
          />
        </div>
      </div>
      <div style={{ width: '100%' }}>
     
        <Button
          variant="gradient"
          className="w-full"
          color="green"
          onClick={handleSubmit(updatedata)}
        >
          <span>
            {updateload ? <Spinner style={{ margin: 'auto' }} /> : 'Save'}
          </span>
        </Button>
      </div>
      <Dialog size='sm' open={Success} handler={handleSuccess}>
        <DialogBody>
           <div className='w-[200px] m-auto'>
           <Lottie
          
          animationData={success} 
          loop={false} 
          autoplay={true}
        />
           </div>
            <div className='m-auto grid grid-cols-1 gap-2'>
            <p className='font-bold text-center text-2xl'>Student Successfully Updated</p>
           <Button className='m-auto'  color="green" onClick={handleSuccess}>
            <span>Ok</span>
          </Button>
            </div>
         
       
        </DialogBody>
       
      </Dialog>
    </>
  );
}
