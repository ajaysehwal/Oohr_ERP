import React from 'react';
import { Input } from '@material-tailwind/react';
import StudentClasssectionlist from './class_section_list';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Spinner } from '@material-tailwind/react';
import { Card, Button, IconButton } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
export default function AddClasses_section() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  if (!auth) {
    return <Navigate to="/signin" />;
  }
  const verified_token = cookies.get('_UID');
  const [load, setload] = useState(false);
  const [upload,setupload]=useState(false);
  const url = String(import.meta.env.VITE_REACT_API_URL);

  const [classdata, setclasses] = useState([]);
  const [finaldata, setfinaldata] = useState([]);
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
  interface FormSchema {
    user: {
      class_name: string;
      user_token: string;
      section_name: string;
    };
  }

  const [data, setdata] = useState<FormSchema>({
    user: {
      class_name: '',
      user_token: verified_token,
      section_name: '',
    },
  });

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setdata({
      user: {
        ...data.user,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handlesubmit =async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
   
    const formdata = data.user;
    if (formdata.section_name === '') {
         
      notify('Please enter section name');
    } else {
    
       if(formdata.section_name==="A"||formdata.section_name==="B"||formdata.section_name==="C"){
          notify("Section Already Exists in our system");
       }else{
           postsection(formdata);

       }
    }
  };
  const postsection = async (formdata: object) => {
     setupload(true);
    try {
      const res = await axios.post(`${url}/studentclasses.section`, formdata);
      if(res.status===200){
        setupload(false);
      successnotify(`New section added in ${formdata.class_name} Class`);
     
      getclasses_section(verified_token, formdata.class_name);
    }
    } catch (err) {
        setupload(false)
      notify('Please try again');
      console.log('error', err);
    }
  };
  const [get, getdata] = useState([]);

  const getclasses_section = async (token: any, classes: any) => {
    const url = String(import.meta.env.VITE_REACT_API_URL);

    try {
      const res = await axios.get(`${url}/studentsection/${classes}/${token}`);
      setclasses(res.data);

      setfinaldata(res.data);
    } catch (err) {
      setload(true);
      console.log('error', err);
    }
  };

  const [filterval, setfilterval] = useState('');
  const searchbarchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value === '') {
      setclasses(finaldata);
    } else {
      const filtered = classdata.filter((el) =>
        el.section.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      setclasses(filtered);
    }
    setfilterval(e.target.value);
  };

  
  useEffect(() => {
    getclasses_section(verified_token,"nursery");
  }, []);

  if (load) {
    return (
      <Spinner
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
        }}
        className="h-8 w-8"
      />
    );
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
                Add Class Sections
              </h3>
            </div>
            <form onSubmit={handlesubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                    className="w-full xl:w-10/12"
                  >
                    <select
                      style={{ border: '1px solid rgb(176,190,197)' }}
                      name="class_name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      onChange={handlechange}
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
                    {/* <Link to="/academics/studentclasses">
                      <IconButton
                        color="green"
                        className="rounded-full"
                        fullWidth
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
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </IconButton>
                    </Link> */}
                  </div>
                </div>
                <div className="w-full xl:w-10/12">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Class Section Name
                  </label>
                  <input
                    type="text"
                    onChange={handlechange}
                    name="section_name"
                    placeholder="Enter section name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <ToastContainer></ToastContainer>

                <button
                  type="submit"
                  style={{ marginTop: '10px' }}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  {upload?<Spinner style={{margin:"auto"}} />:"Upload"}
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
              <select
                style={{ border: '1px solid rgb(176,190,197)' }}
                {...register('classes', {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    getclasses_section(verified_token, e.target.value);
                  },
                })}
                className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="nursery">Select Class</option>
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
              {/* <Input size="lg" value={filterval} label="Search" name='text' onInput={(e)=>searchbarchange(e)} /> */}
            </div>
            <StudentClasssectionlist data={[classdata,getclasses_section]} />
          </div>
        </div>
      </div>
    </div>
  );
}
