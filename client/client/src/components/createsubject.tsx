import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Spinner } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Subjectlist from './subjectlist';
export default function Createsubject() {
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
  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  const url = String(import.meta.env.VITE_REACT_API_URL);
  const [upload, setupload] = useState(false);
  const [load, setload] = useState(false);
  const [currclass, setcurrclass] = useState('');
  const [listcurrclass, setlistcurrclass] = useState('');
  const handlecurrentclass = (value: any) => {
    setcurrclass(value);
  };
  const handlelistcurrclass = (value: any) => {
    setlistcurrclass(value);
  };
  const [listload, setlistload] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getsubjectsdata('', auth);
  }, []);
  const onSubmit = async (data: any) => {
    
    setupload(true);
    if (data.subject === '') {
      setupload(false);
      notify('Please enter subject name');
    } else {
      if (data.class == '') {
        setupload(false);
        notify('Please select class');
      } else {
        try{
          const res=await axios.get(`${url}/schoolsubjectscan/${data.subject}/${auth}/${data.class}`)
          console.log(res);
          if(res.data.length>=1){
            notify(`${data.subject} subject already exists in class ${data.class}`)
          }else{
          postsubject(data);

          }
         }catch(err){
          return err
         }
      }
    }
  };
   const postsubject=async(data:any)=>{
    try {
      const res = await axios.post(`${url}/schoolsubjects`, data);
      console.log(res);
      setupload(false);

      getsubjectsdata(data.class, auth);
      successnotify('New Subject Successfully Added');
    } catch (err) {
      setupload(false);

      notify('Please try again');
      return err;
    }
   }
  const [getsubjects, setgetsubjects] = useState([]);
  const getsubjectsdata = async (classes: any, user_id: any) => {
    setlistload(true);
    try {
      const res = await axios.get(
        `${url}/schoolsubjects/${classes}/${user_id}`,
      );
      console.log(res);
      setgetsubjects(res.data);
      setlistload(false);
    } catch (err) {
      setload(false);
      return err;
    }
  };
  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                  Add Subjects
                </h3>
              </div>
              <form
                encType="multipart/form-data"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
                style={{ width: '100%', margin: 'auto' }}
              >
                <div className="p-6.5">
                  <input type="hidden" {...register('admin_id')} value={auth} />
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
                        {...register('class', {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            handlecurrentclass(e.target.value);
                          },
                        })}
                        style={{ border: '1px solid rgb(176,190,197)' }}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  </div>
                  <div
                    style={{
                      display:
                        currclass == '11th' || currclass == '12th'
                          ? 'block'
                          : 'none',
                    }}
                    className="mb-4.5 flex flex-col gap-6 xl:flex-row"
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                      className="w-full xl:w-10/12"
                    >
                      <select
                        {...register('stream')}
                        style={{ border: '1px solid rgb(176,190,197)' }}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select Stream</option>
                        <option value="science">Science</option>
                        <option value="commerce">Commerce</option>
                        <option value="Art and Humanities">
                          Art and Humanities
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full xl:w-10/12">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      {...register('subject')}
                      placeholder="Eg: Math, Science, History"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <ToastContainer></ToastContainer>

                  <button
                    type="submit"
                    style={{ marginTop: '10px' }}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                  >
                   {upload?<Spinner/>:"Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-9">
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
            {/* <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> */}
              <select
                style={{ border: '1px solid rgb(176,190,197)' }}
                {...register('classes', {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    handlelistcurrclass(e.target.value);
                    getsubjectsdata(e.target.value, auth);

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

              {/* <select
                style={{
                  display:
                    listcurrclass == '11th' || listcurrclass == '12th'
                      ? 'block'
                      : 'none',
                }}
                {...register('liststream')}
                className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                // className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="">Select Stream</option>
                <option value="science">Science</option>
                <option value="commerce">Commerce</option>
                <option value="Art and Humanities">Art and Humanities</option>
              </select> */}
            {/* </div> */}
          </div>

          <Subjectlist data={[getsubjects, listload]} />
        </div>
      </div>
    </div>
  );
}
