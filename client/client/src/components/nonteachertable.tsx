import React, { useEffect, useState,useRef } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 import axios from 'axios';
 import { useReactToPrint } from 'react-to-print';

 import {Spinner} from "@material-tailwind/react"
 import Cookies from 'universal-cookie';
import NonTeachering from './nonteacher';
import emptyfolder from "./images/emptyfolder.png";

export default function Nonteachertable() {
  const url = String(import.meta.env.VITE_REACT_API_URL);
  const cookies = new Cookies();
  const coverttopdf = useRef();
   const generatepdf = useReactToPrint({
     content: () => coverttopdf.current,
     documentTitle: 'Staff Members',
  });
  const [singleload,setsingleload]=useState(false);
  const auth = cookies.get('_UID');
  const [opensingle, setOpensingle] =useState(false);
 
  const handleOpensingle = (id:any) =>{
    console.log(id);
    setOpensingle(!opensingle);
    getsinglestaffdata(id,auth);
  } 
  const [open, setOpen] = useState(false);

 const [load,setload]=useState(false); 
 const [staff,setstaff]=useState([]);
 const [finalstaff,setfinalstaff]=useState([]);
 const [singleataff,setsinglestaff]=useState([]);

  const handleOpen = () => setOpen(!open);;
  const close=()=>{
    setOpen(false);
  }
  const getstaffdata=async(id:any)=>{
    setload(true);
   try{
  const res=await axios.get(`${url}/nonteacherapi/${id}`);
  setload(false);
  console.log(res.data);
  setstaff(res.data);
  setfinalstaff(res.data);
   }catch(err){
    setload(false);
    return err
   }
  }
  useEffect(()=>{
  getstaffdata(auth);
  },[])
  const [filterval, setfilterval] = useState('');
  const debounce = (fn: Function, delay: number) => {
    let timerId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const performSearch = async (searchText: string) => {
    if (searchText === '') {
           setstaff(finalstaff);
         } else {
           const filtered = staff.filter((el) =>
             el.name.toLowerCase().includes(searchText.toLowerCase()),
           );
           setstaff(filtered);
      }
      setSearchInput(searchText);
  };
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setSearchInput(inputText);
  
    const debouncedSearch = debounce(performSearch, 300); 
    debouncedSearch(inputText);
  };
  
  const [filterdeparment,setfilterdepartment]=useState('');

  const searchdepartment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setstaff(finalstaff);
    } else {
      const filtered = staff.filter((el) =>
       el.department==e.target.value
      );
      setstaff(filtered);
    }
    setfilterdepartment(e.target.value);
  };
  const getsinglestaffdata=async(id:any,school_id:any)=>{
    setsingleload(true);
   try{
  const res=await axios.get(`${url}/nonteacherapi/${school_id}/${id}`);
  setsingleload(false);
  setsinglestaff(res.data);
   }catch(err){
    setsingleload(false);
    return err
   }
  }
  return (
    <div> 
      <Button  onClick={handleOpen}color='green' style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:"2px",width:'200px',textAlign:'center',justifyContent:'center'}}>
    <svg className="h-6 w-6"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
Add New</Button>
            <div
        style={{ marginTop: '10px' }}
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
         
       <div className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3'>
          <div>
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              value={searchInput}
              onChange={handleSearchInputChange}
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search"
              required
            />
          </div>
          </div>
          <div>
          <select
             onChange={searchdepartment}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value=""> Filter by Department </option>
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
      
          <div>
          <Button onClick={generatepdf} color='orange' style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:"2px"}}>
          <svg className="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          <line x1="12" y1="11" x2="12" y2="17" />  <polyline points="9 14 12 17 15 14" /></svg>
          Print as Pdf</Button>
          </div>
          </div>
        <div className="max-w-full overflow-x-auto">
          <table ref={coverttopdf}  className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Photo
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Department
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Gender
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Phone
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Date of Joining
                </th>
              </tr>
            </thead>
          <tbody>
            {load?<Spinner color='blue' className="h-10 w-10" style={{position:'absolute',left:'47%'}}/>:staff.length===0?(
                 <div
                 style={{
                   textAlign: 'center',
                   margin: 'auto',
                   width: '100%',
                   display: 'grid',
                   alignItems: 'center',
                   justifyContent: 'center',
                   position: 'absolute',
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
                   No Found
                 </p>
               
               </div>
            ):staff.map((el)=>(

           
        <tr>
          <td  onClick={()=>handleOpensingle(el.id)} className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
         <img width="80px" src={`${url}/${el.img}`} alt="" />    
          </td>
          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
            {el.name}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
            {el.department}
          </td>
       
          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
            {el.status}
          </td>
           <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
            {el.email}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
            {el.gender}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
            {el.phone}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
            {el.dateofjoining}
          </td>
        </tr>
         ))}
          </tbody>
          </table>
        </div>
      </div>
      <Dialog
       className="h-[40rem] w-[40rem]  overflow-scroll  bg-white  dark:bg-boxdark"
       open={open}
       size="xl"
      handler={handleOpen}
      >
        <DialogBody>
           <NonTeachering/>
        </DialogBody>
      
      </Dialog>
      {/* //singledata */}
      <Dialog
        open={opensingle}
        handler={handleOpensingle}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
         {singleload?<Spinner/>:singleataff?.map((el)=>(

        
         <div key={el.id} style={{padding:'20px'}}>
         <DialogHeader>
  <img 
   style={{width:'150px',margin:"auto"}}
        className="rounded-full object-cover object-center"
        src={`${url}/${el.img}`} alt="" />
</DialogHeader>
<DialogBody className="h-[30rem] overflow-scroll">
   <div className='grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3'>
     <div style={{overflow:'hidden',borderBottom:'1px solid silver',padding:'10px'}}>
      <p className="font-semibold">Name</p>
      {el.name}</div>
     <div  style={{overflow:'hidden',borderBottom:'1px solid silver',padding:'10px'}}>
     <p className="font-semibold">Date of Birth</p>
{el.dob}</div>
     <div  style={{overflow:'hidden',borderBottom:'1px solid silver',padding:'10px'}}>
     <p className="font-semibold">Gender</p>

      {el.gender}</div>
     <div  style={{overflow:'hidden',borderBottom:'1px solid silver',padding:'10px'}}>
     <p className="font-semibold">Religion</p>
{el.religion}</div>
     <div  style={{overflow:'hidden',borderBottom:'1px solid silver',padding:'10px'}}>
     <p className="font-semibold">Email</p>

      {el.email}</div>
     <div  style={{overflow:'hidden',borderBottom:'1px solid silver',padding:'10px'}}>
     <p className="font-semibold">Phone</p>

      {el.phone}</div>
     <div  style={{overflow:'hidden',borderBottom:'1px solid silver',padding:'10px'}}>
     <p className="font-semibold">Qualification</p>
{el.qualification}</div>
     <div  style={{overflow:'hidden',borderBottom:'1px solid silver',padding:'10px'}}>
     <p className="font-semibold">Martial Status</p>
{el.martialstatus}</div>
     <div  style={{overflow:'hidden',borderBottom:'1px solid silver',padding:'10px'}}>
     <p className="font-semibold">Address</p>

      {el.address}</div>
     <div  style={{overflow:'hidden',borderBottom:'1px solid silver',padding:'10px'}}>
     <p className="font-semibold">Department</p>
{el.department}</div>
     <div  style={{overflow:'hidden',borderBottom:'1px solid silver',padding:'10px'}}>
     <p className="font-semibold">Date of Joining</p>
{el.dateofjoining}</div>
     <div  style={{overflow:'hidden',borderBottom:'1px solid silver',padding:'10px'}}>
     <p className="font-semibold">Status</p>
{el.status}</div>
     <div  style={{borderBottom:'1px solid silver',padding:'10px'}}>
     <p className="font-semibold">Identity Document</p>
<a href={`${url}/${el.identifydocument}`} style={{color:'blue'}}>Click here</a></div>
   <div style={{borderBottom:'1px solid silver',padding:'10px'}}>
   <p className="font-semibold">Bank Name</p>
   {el.bankname}

   </div>

   </div>
 
</DialogBody>
         </div>
          ))}
        
       
      </Dialog>
    </div>
  )
}
