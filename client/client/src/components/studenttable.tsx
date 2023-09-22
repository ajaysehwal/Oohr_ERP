import React, { useState } from 'react';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Button, Spinner } from '@material-tailwind/react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Chip } from '@mui/material';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
} from '@material-tailwind/react';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@material-tailwind/react';

import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import emptyfolder from './images/emptyfolder.png';

import Cookies from 'universal-cookie';
import Studentedit from './studentedit';
export default function Studentdetailtable() {
  const [active, setActive] = React.useState(1);
  const [data, setdata] = useState([]);
  const {
    register,
    handleSubmit,
  } = useForm();
  const [open0, setOpen0] = React.useState(false);
  
  const handleOpen0 = () => setOpen0(!open0);
  const [open, setOpen] = useState(1);
  const [newvalue, setnewvalue] = useState(1);
  const url = String(import.meta.env.VITE_REACT_API_URL);

  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  const coverttopdf = useRef();
  if (!auth) {
    return <Navigate to="/signin" />;
  }
  const [load, setload] = useState(false);
  const generatepdf = useReactToPrint({
    content: () => coverttopdf.current,
    documentTitle: 'Staff Members',
  });
  const [finaldata, setfinaldata] = useState([]);
  const [btnload, setbtnload] = useState(false);
  const getstudentdata = async (token: any, classes: any, section: any) => {
    setbtnload(true);
    try {
      const res = await axios.get(
        `${url}/studentsdata/${classes}/${section}/${token}`,
      );
      if (res.data.length === 0) {
        handleOpen0();
        setbtnload(false);
      } else {
        setdata(res.data);
        setbtnload(false);

        studentfeedata(token, classes);
        setfinaldata(res.data);
      }
    } catch (err) {
      setbtnload(false);

      return err;
    }
  };

  const [filterval, setfilterval] = useState('');
  const [filerbyclass, setfilterbyclass] = useState('');
  const searchbarchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setdata(finaldata);
    } else {
      const filtered = data.filter((el) =>
        el.student_name.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      setdata(filtered);
    }
    setfilterval(e.target.value);
  };

  const [classes, setgetclasses] = useState([]);
  const [section, setsection] = useState([]);

  const getclasses = async (token: any) => {
    setload(true);
    try {
      const res = await axios.get(`${url}/studentclasses/${token}`);
      setgetclasses(res.data);

      setload(false);
    } catch (err) {
      setload(true);
      return err
    }
  };
  const getsectionbyclass = async (value: any, verified_token: any) => {
    try {
      const res = await axios.get(
        `${url}/studentsection/${value}/${verified_token}`,
      );
      setsection(res.data);
    } catch (err) {
      return err
    }
  };
  useEffect(() => {
    getclasses(auth);
  }, []);
  const onSubmit = (data: any) => {
    if (data.class == '' && data.section == '') {
      handleOpen0();
      setdata([]);
    } else {
      setdata([]);

      getstudentdata(auth, data.class, data.section);
    }
  };
  const [feedata, setfeedata] = useState([]);
  const studentfeedata = async (auth: any, classes: any) => {
    try {
      const res = await axios.get(`${url}/studentfee/${auth}/${classes}`);
      setfeedata(res.data);
    } catch (err) {
      return err
    }
  }
  const [opensingle, setOpensingle] = useState(false);

  const handleOpensingle = (id: any) => {
    setOpensingle(!opensingle);
    getstudent(id);
  }
  const closesingle = () => {
    setOpensingle(!opensingle);
  }
  const [singlestudent, setsinglestudent] = useState([]);
  const [singleload, setsingleload] = useState(false);

  const [studentname, setstudentname] = useState('');
  const [dob, setdob] = useState('');
  const [father, setfather] = useState('');
  const [mother, setmother] = useState('');
  const [addmission, setaddmission] = useState('');
  const [religion, setreligion] = useState('');
  const [birth_certificate, setbirth_certificate] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [age, setage] = useState('');
  const [parents_phone, setparents_phone] = useState('');
  const [phone, setphone] = useState('');
  const [previous_school_name, setprevious_school_name] = useState('');
  const [email, setemail] = useState('');
  const [select_class, setselect_class] = useState('');
  const [student_section, set_student_section] = useState('');
  const [house, sethouse] = useState('');
  const [student_code, setstudent_code] = useState('');
  const upadatedstudent = {
    student_name: studentname,
    date_of_birth: dob,
    father_name: father,
    mother_name: mother,
    admission_no: addmission,
    religion: religion,
    address: address,
    city: city,
    state: state,
    age: age,
    phone: phone,
    parents_phone: parents_phone,
    previous_school_name: previous_school_name,
    email: email,
    select_class: select_class,
    section: student_section,
    birth_certificate: birth_certificate,
    house: house,
    student_code: student_code,
  }
  const [updated, setupdated] = useState(upadatedstudent);
  const [studentimg, setstudentimg] = useState('');
  const getstudent = async (id: any) => {
    setsingleload(true);
    try {
      const res = await axios.get(`${url}/studentdetails/${id}`);
      setsinglestudent(res.data);
      setsingleload(false);

      const changedata = res.data[0];

      setstudentname(changedata.student_name)
      setdob(changedata.date_of_birth)
      setfather(changedata.father_name)
      setmother(changedata.mother_name)
      setaddmission(changedata.admission_no)
      setreligion(changedata.religion)
      setbirth_certificate(changedata.birth_certificate)
      setaddress(changedata.address)
      setcity(changedata.city)
      setstate(changedata.state)
      setage(changedata.age)
      setparents_phone(changedata.parents_phone)
      setphone(changedata.phone)
      setprevious_school_name(changedata.previous_school_name)
      setemail(changedata.email)
      setselect_class(changedata.select_class)
      set_student_section(changedata.section)
      sethouse(changedata.house);
      setstudent_code(changedata.student_code);
      setstudentimg(changedata.student_image);

    } catch (err) {
      setsingleload(true);
      return err;
    }
  };
  const [editopen, seteditOpen] = useState(false);

  const edithandleOpen = (id: any) => {
    seteditOpen(!editopen);
    getstudent(id)
  }
  const editclose = () => {
    seteditOpen(!editopen);
  }
  const changeupdatestate = {
    setstudentname,
    setdob,
    setfather,
    setmother,
    setaddmission,
    setreligion,
    setbirth_certificate,
    setaddress,
    setcity,
    setstate,
    setage,
    setparents_phone,
    setphone,
    setprevious_school_name,
    setemail,
    setselect_class,
    set_student_section,
    sethouse
  }

  return (
    <div>
      <div
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        style={{
          width: '100%',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifySelf: 'center',
          gap: '10px',
          padding: '20px',
        }}
        data-aos="fade-down"
      >
        <select
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          {...register('class', {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              getsectionbyclass(e.target.value, auth);
            },
          })}
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
        <select
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          color="teal"
          {...register('section')}
        >
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          {section?.map((el) => (
            <option value={el.section}>{el.section}</option>
          ))}
        </select>
        <button onClick={handleSubmit(onSubmit)} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          {btnload ? (<Spinner style={{ margin: 'auto' }} />) : (

            <p style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>Get
              <svg
                className="h-4 w-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {' '}
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="10" cy="10" r="7" />
                <line x1="7" y1="10" x2="13" y2="10" />
                <line x1="10" y1="7" x2="10" y2="13" />{' '}
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </p>
          )}
        </button>


      </div>


      <div data-aos="fade-up"
        style={{ marginTop: '10px' }}
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
        <div
          style={{
            width: '60%',
            marginBottom: '5px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="text-gray-500 dark:text-gray-400 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              value={filterval}
              onInput={(e) => searchbarchange(e)}
              type="text"
              id="simple-search"
              className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border p-2 pl-10 text-sm dark:text-white"
              placeholder="Search student by name"
            />
          </div>

          <Chip onClick={generatepdf} icon={<PrintIcon />} label="Print" />

        </div>
        <div className="max-w-full overflow-x-auto">
          <table ref={coverttopdf} className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Photo
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Class
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Section
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Father Name
                </th>

                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Phone
                </th>


                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>

              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    display: 'grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    margin: 'auto',
                    padding: '20px',
                  }}
                >
                  <img
                    style={{ width: '140px', margin: 'auto' }}
                    src={emptyfolder}
                    alt=""
                  />
                  <p
                    className="text-2xl font-bold"
                    style={{ textAlign: 'center', margin: 'auto' }}
                  >
                    No Student Found
                  </p>
                  <p style={{ textAlign: 'center', margin: 'auto' }}>
                    Select Classes to view Students.
                  </p>
                </div>
              ) : (
                data?.map((el,i) => (
                  <tr style={{ borderBottom: '1px silver silver' ,background:i%2?'#f1f5f9':'white' }}  key={el.id}>
                    <td onClick={() => handleOpensingle(el.student_code)} className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11" >

                      <Avatar sx={{ width: 80, height: 80 }} alt={el.name} src={`${url}/${el.student_image}`} />


                    </td>

                    <td>
                      <p className="border-[#eee] py-5 px-4 dark:border-strokedark">
                        {el.student_name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {el.select_class}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{el.section}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {el.father_name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{el.phone}</p>
                    </td>


                    <td
                      className="flex items-center justify-end px-4 py-3"
                      style={{ textAlign: 'center' }}
                    >
                      <Menu
                        animate={{
                          mount: { y: 0 },
                          unmount: { y: 25 },
                        }}
                      >
                        <MenuHandler>
                          <Button
                            variant="text"
                            color="silver"
                            style={{ marginTop: '20px' }}
                          >
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              style={{ color: 'gray' }}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </Button>
                        </MenuHandler>
                        <MenuList>
                          <MenuItem>

                            <button
                              onClick={() => handleOpensingle(el.student_code)}
                              className="hover:text-primary"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                              }}
                            >
                              <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                  fill=""
                                />
                                <path
                                  d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                  fill=""
                                />
                              </svg>
                              <p> Preview</p>
                            </button>

                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => edithandleOpen(el.student_code)}
                              className="hover:text-primary"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                              }}
                            >
                              <svg
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                {' '}
                                <path stroke="none" d="M0 0h24v24H0z" />{' '}
                                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{' '}
                                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{' '}
                                <line x1="16" y1="5" x2="19" y2="8" />
                              </svg>
                              <p> Edit</p>
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              to={`/students/detailtable/managestudentfees/${el.student_code}`}
                            >
                              {' '}
                              <Button color="green">Update Fee</Button>{' '}
                            </Link>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p className='font-semibold'>Total results {data.length}</p>
      </div>
      <Dialog
        size='xl'
        open={opensingle}
        handler={handleOpensingle}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className='overflow-scroll'
      >
        {singleload ? <Spinner className="w-10 h-10" style={{ margin: 'auto' }} /> : singlestudent?.map((el) => (


          <div style={{ padding: '20px' }}>
            <DialogHeader className="justify-between">

              <Avatar style={{ margin: 'auto' }} sx={{ width: 150, height: 150 }} alt={el.name} src={`${url}/${el.student_image}`} />


              <IconButton
                onClick={closesingle}
                color="blue-gray"
                size="sm"
                variant="text"
                style={{ marginTop: '-100px' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </DialogHeader>
            <DialogBody className="h-[30rem] overflow-scroll">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Student Name</h3>
                  {el.student_name}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Date of birth</h3>
                  {el.date_of_birth}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Father name</h3>
                  {el.father_name}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Mother name</h3>
                  {el.mother_name}
                </div>

                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Admission no</h3>
                  {el.admission_no}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Full address</h3>
                  {el.address}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Age</h3>
                  {el.age}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Phone</h3>
                  {el.phone}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Other Contact</h3>
                  {el.parents_phone}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Religion</h3>
                  {el.religion}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">City</h3>
                  {el.city}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Previous school name</h3>
                  {el.previous_school_name}
                </div>

                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Email</h3>
                  {el.email}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Transfer Certificate</h3>
                  {el.transfer_certificate}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Physical handicap</h3>
                  {el.physical_handicap}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">House</h3>
                  {el.house}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Category</h3>
                  {el.student_category}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Class</h3>
                  {el.select_class}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Section</h3>
                  {el.section}
                </div>

                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">State</h3>
                  {el.state}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Blood group</h3>
                  {el.blood_group}
                </div>

                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">Identity Document</h3>
                  {el.birth_certificate}
                </div>
                <div style={{ overflow: 'hidden', borderBottom: '1px solid silver', padding: '10px' }}>
                  <h3 className="text-1xl font-bold">student document</h3>
                  <a href={`${url}/${el.student_document}`}>Click here</a>
                </div>

              </div>
            </DialogBody>
          </div>
        ))}


      </Dialog>
      <Dialog
        size="sm"
        open={open0}
        handler={handleOpen0}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        style={{
          textAlign: 'center',
          margin: 'auto',
          display: 'grid',
          alignItems: 'center',
          width: '200px',
          padding: '20px',
        }}
      >
        <div>
          <h1 className="text-3xl font-bold">Error Message</h1>
          <p>Student not found</p>
          <Button
            style={{ width: '100px', margin: '10px' }}
            variant="gradient"
            color="green"
            onClick={handleOpen0}
          >
            <span>Ok</span>
          </Button>
        </div>
      </Dialog>
      <Dialog
        open={editopen} handler={edithandleOpen} size='xl'>
        <DialogHeader style={{ textAlign: 'center', margin: 'auto' }}>
          <img
            style={{ width: '200px', height: "150px", margin: "auto" }}
            className="rounded-full object-cover object-center"
            src={`${url}/${studentimg}`}
            alt="student img"
          />
        </DialogHeader>
        <DialogBody className='h-[30rem] overflow-scroll'>
          {singleload ? <Spinner style={{ margin: 'auto' }} className='w-10 h-10' /> : (
            <Studentedit data={[upadatedstudent, singleload, setupdated, edithandleOpen, changeupdatestate, getstudentdata, editclose]} />
          )}

        </DialogBody>
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={edithandleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={edithandleOpen}>
            <span>Save</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </div>
  );
}
