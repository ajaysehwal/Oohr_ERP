import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Spinner } from '@material-tailwind/react';

export default function Createtimetable() {
  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  const url = String(import.meta.env.VITE_REACT_API_URL);

  const [getclass, setgetclasses] = useState([]);
  const [load, setload] = useState(false);
  const [teacher, setteacher] = useState([]);
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    setload(true);

        if(data.class===''){
          setload(false);

          notify("Please select a class")
        }else{
          if(data.endampm==''&&data.startampm==''){
            setload(false);

            notify("Please select AM / PM")
          }else{
            if(data.endday==''&&data.startday==''){
              setload(false);

          notify('Please select a day');
            }else{
              if(data.endminutes==''&&data.startminutes==''){
                setload(false);

                notify('Please select a minutes');
              }else{
            if(data.section===''){
              setload(false);

              notify('Please select a section');
            }else{
              if(data.subject===''){
                setload(false);

                notify('Please select a subject');
              }else{
                if(data.teacher_name==''){
                  setload(false);

                  notify('Please select a teacher name');
                }else{
                  posttimetable(data);
                }
              }
            }
            }
          }
          }
        }
    
  };
   const posttimetable=async(data:any)=>{
    setload(true);

    try {
      const res = await axios.post(`${url}/schooltimetable`, data);
      successnotify('New time table successfully added');
      setload(false);
    } catch (err) {
      notify('Something went wrong please try again later');
      return err;
      setload(false);
     }
   }

  const getteacherdata = async (token: any) => {
    setload(true);
    try {
      const res = await axios.get(
        `${url}/teacher.api/${token}`,
      );
      setteacher(res.data);
      setload(false);
    } catch (err) {
      setload(true);
      return err;
    }
  };
  const [subject, setsubjects] = useState([]);
  const getsubjects = async (classes: any, token: any) => {
    setload(true);
    try {
      const res = await axios.get(
        `${url}/schoolsubjects/${classes}/${token}`,
      );
      setsubjects(res.data);
      setload(false);
    } catch (err) {
      setload(true);
      return err;
    }
  };
  const [defaultsubject,setdefaultsubject] =useState([]);
  const getsubjects_default = async (classes: any) => {
    setload(true);
    try {
      const res = await axios.get(
        `${url}/studentsubjectsbyclass/${classes}`,
      );
        setdefaultsubject(res.data);
      setload(false);
    } catch (err) {
      setload(true);
      return err;
    }
  };

  const [section, setsection] = useState([]);
  const getsectionbyclass = async (value: any, verified_token: any) => {
    try {
      const res = await axios.get(
        `${url}/studentsection/${value}/${verified_token}`,
      );
      setsection(res.data);
      setload(false);
    } catch (err) {
      setload(true);
      console.log('error', err);
    }
  };
  useEffect(() => {
    getteacherdata(auth);
  }, []);

  return (
    <div>
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
              New class routine
            </h3>
          </div>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
            method="post"
            style={{ width: '100%', margin: 'auto' }}
          >
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-10/12">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Class *
                  </label>
                  <input type="hidden" {...register('admin_id')} value={auth} />
                  <select
                    {...register('class', {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        getsectionbyclass(e.target.value, auth);
                        getsubjects(e.target.value, auth);
                        getsubjects_default(e.target.value)
                      },
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">Select class</option>
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
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-10/12">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Section
                  </label>
                  <select
                    {...register('section')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  {section?.map((el) => (
                      <option key={el.id} value={el.section}>
                        {el.section}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-10/12">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Assign Class to Teacher *
                  </label>
                  <select
                    {...register('teacher_name')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">Select Teacher</option>
                    {teacher?.map((el) => (
                      <option key={el.id} value={el.name}>
                        {el.name}
                        <input
                          {...register('teacher_id')}
                          type="hidden"
                          value={el.teacher_id}
                        />
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-10/12">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Select Subject *
                  </label>
                  <select
                    {...register('subject')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">Select Subject</option>
                    {defaultsubject?.map((el) => (
                      <option key={el.id} value={el.subject}>
                        {el.subject}
                      </option>
                    ))}
                    {subject?.map((el) => (
                      <option key={el.id} value={el.subject}>
                        {el.subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                <div className="w-full xl:w-10/12">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Start Day *
                  </label>
                  <select
                    {...register('startday')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">Select Start Day</option>
                    <option value="Daily">Daily</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
                <div className="w-full xl:w-10/12">
                  <label className="mb-2.5 block text-black dark:text-white">
                    End Day *
                  </label>
                  <select
                    {...register('endday')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">Select End Day</option>

                    <option value="Daily">Daily</option>

                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
              </div>
              <label
                style={{ marginTop: '10px' }}
                className="mb-2.5 block text-black dark:text-white"
              >
                Starting time *
              </label>
              <div
                style={{ marginTop: '15px' }}
                className="grid grid-cols-3 gap-5"
              >
                <select
                  {...register('starthour')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">Hour</option>
                  <option value="00">0</option>
                  <option value="01">1</option>
                  <option value="02">2</option>
                  <option value="03">3</option>
                  <option value="04">4</option>
                  <option value="05">5</option>
                  <option value="06">6</option>
                  <option value="07">7</option>
                  <option value="08">8</option>
                  <option value="09">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                </select>
                <select
                  {...register('startminutes')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">Minutes</option>
                  <option value="00">0</option>
                  <option value="05">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </select>
                <select
                  {...register('startampm')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="Am">Am</option>
                  <option value="Pm">Pm</option>
                </select>
              </div>
              <label
                style={{ marginTop: '10px' }}
                className="mb-2.5 block text-black dark:text-white"
              >
                Ending time *
              </label>
              <div
                style={{ marginTop: '15px' }}
                className="grid grid-cols-3 gap-5"
              >
                <select
                  {...register('endhour')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">Hour</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                </select>
                <select
                  {...register('endminutes')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">Minutes</option>
                  <option value="0">0</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </select>
                <select
                  {...register('endampm')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="Am">Am</option>
                  <option value="Pm">Pm</option>
                </select>
              </div>
              <ToastContainer></ToastContainer>

              <button
                type="submit"
                style={{ marginTop: '10px' }}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                {load ? <Spinner /> : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
