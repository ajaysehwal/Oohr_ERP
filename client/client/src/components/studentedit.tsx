import React from 'react'
import { useState,useEffect} from 'react';
import { Input, Spinner,DialogFooter,Button } from '@material-tailwind/react'
import {useForm} from "react-hook-form";
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';
export default function Studentedit({data}) {
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
      const [gethouses, setgethouse] = useState([]);
 
  const gethouse = async (token: any) => {
   
    try {
      const res = await axios.get(
        `${url}/api.studenthouses/${token}`
      );
      setgethouse(res.data);
    } catch (err) {
      return err
    }
  };
  useEffect(() => {
   
    gethouse(auth);
  }, []);
  const [updateload,setupdateload]=useState(false);
  const updatedata=(data:object)=>{
    setupdateload(true);
    getallstudent(auth,student_class,student_section);

        postdata(data);
        updatedstudentdoc();
        updatedstudentimg();
    
  }
  const student_code=data[0].student_code;
  const student_class=data[0].select_class;
  const student_section=data[0].section;
  const getallstudent=data[5]
  const close=data[6];
  const postdata=async(data:any)=>{
    if(data.student_name===''){
      setupdateload(false);

      notify("Please Enter a student name")
    }else{
      if(data.phone.length!==10){
        setupdateload(false);

      notify("Student Contact number should be only 10 characters");
      }else{
        if(data.parents_phone.length!==10){
          setupdateload(false);

          notify('Student parents contact number should be only 10 characters')
        }else{
          setupdateload(true);
          try{
      const res=await axios.put(`${url}/studentupdated/${student_code}`,data);
      if(res.data.message==='student updated successfully'){
        setupdateload(false);
         getallstudent(auth,student_class,student_section);
         setTimeout(()=>{
          close();
         },2000)
         
      successnotify('Student Updated successfully');
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
      }
    }
    
  }
  const updatedstudentdoc=async()=>{
      if(selectedFile1){
        try{
        
          const studentdoc=new FormData();
          studentdoc.append('file1',selectedFile1);

        const res=await axios.put(`${url}/studentupdateddocs/${student_code}`,studentdoc,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        getallstudent(auth,student_class,student_section);

        }catch(err){
        return err;
        }
      }
   
  }
  const updatedstudentimg=async()=>{
    if(selectedFile2){
      try{
      
        const studentimg=new FormData();
        studentimg.append('file2',selectedFile2);
      const res=await axios.put(`${url}/studentupdatedimage/${student_code}`,studentimg,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      getallstudent(auth,student_class,student_section);

      }catch(err){
     return err;
      }
    }
}
  return (
    <>
 <ToastContainer></ToastContainer>
    
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
      <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student name</label>
            <input value={data[0].student_name} {...register('student_name',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].setstudentname(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" />
        </div>

        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
            <input value={data[0].date_of_birth} {...register('date_of_birth',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].setdob(e.target.value);
                  }
                })} 
                type="date" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        </div><div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Father name</label>
            <input value={data[0].father_name} {...register('father_name',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].setfather(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Father name" />
        </div><div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mother name</label>
            <input value={data[0].mother_name} {...register('mother_name',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].setmother(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mother name" />
        </div><div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admission No</label>
            <input value={data[0].admission_no} {...register('admission_no',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].setaddmission(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Admission no" />
        </div><div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Religion</label>
            <input value={data[0].religion} {...register('religion',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].setreligion(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Religion" />
        </div><div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
            <input value={data[0].address} {...register('address',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].address(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" />
        </div><div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
            <input value={data[0].city} {...register('city',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].setcity(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City" />
        </div><div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
            <input value={data[0].state} {...register('state',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].setstate(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="State" />
        </div><div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
            <input value={data[0].age} {...register('age',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].setage(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Student Age" />
        </div><div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <input value={data[0].phone} {...register('phone',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].setphone(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone number" />
        </div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parents Phone</label>
            <input value={data[0].parents_phone} {...register('parents_phone',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].setparents_phone(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Parents phone number" />
        </div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Previous School name</label>
            <input value={data[0].previous_school_name} {...register('previous_school_name',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].previous_school_name(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Previous school name" />
        </div>
        <div >
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select House</label>

            <select
              {...register('house',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[4].sethouse(e.target.value);
              }
               })}
               value={data[0].house}
              className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="">Select House</option>
              {gethouses?.map((el) => (
                <option value={el.house_name}>{el.house_name}</option>
              ))}
            </select>

          
          </div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input value={data[0].email} {...register('email',{
                    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                    data[4].setemail(e.target.value);
                  }
                   })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" />
        </div>
        <div>
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Class</label>

            <select
            value={data[0].select_class}
            {...register('select_class',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[4].setselect_class(e.target.value);
              }
               })}
            //   {...register('select_class', {
            //     onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            //       getsectionbyclass(e.target.value);
            //     },
            //   })}
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
          <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Section</label>

          <select
               {...register('section',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[4].set_student_section(e.target.value);
              }
               })}
               value={data[0].section}
              className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="">Select Section</option>

               <option value="A">A</option>
               <option value="B">B</option>
               <option value="C">C</option>
             {/* {section?.map((el) => (
                <option value={el.section}>{el.section}</option>
              ))} */}
            </select>
          
         
          </div>
          <div>
            <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Select Identity Document
            </label>
            <select
            value={data[0].birth_certificate}
              id="countries"
              {...register('select_document',{
                onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                data[4].setbirth_certificate(e.target.value);
              }
               })}
              className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="dob">Birth Certificate</option>
              <option value="aadhar">Aadhar</option>
              <option value="passport">Passport</option>
            </select>
          </div>
        <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Upload Student Document</label>
<input  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"  name="file"  onChange={handleFileChange1}
  type="file"/>
        </div>
        <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Upload Student Image</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"  name="file"  onChange={handleFileChange2} type="file"/>
        </div>
       

       


      </div>
      <div style={{width:'100%'}}>
          <Button
            variant="text"
            color="red"
            onClick={data[3]}
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
