import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {useState,useEffect} from 'react';

export default function Studentfeerecord() {
    const [studentdata, setdata] = useState([]);
    const [load ,setload]=useState(false);
    const url = String(import.meta.env.VITE_REACT_API_URL);

    const [name,setname]=useState('');
    const cookies = new Cookies();
    const auth = cookies.get('_UID');
    interface RouteParams {
        id: string;
       }  
       const { id } = useParams<RouteParams>();
         const getstudent = async (id: any) => {
        setload(true);
        try {
          const res = await axios.get(`${url}/studentfees/${auth}/${id}`);
          setdata(res.data);
          const studentname=res.data[0];
          setname(studentname.student_name);
          setload(false);
        } catch (err) {
          setload(true);
          return err;
        }
      };
      useEffect(() => {
        getstudent(id);
      }, []);

 
  return (
    <div style={{padding:'20px'}} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <p className='text-2xl font-bold' style={{padding:'10px'}}>{name} Fees Record</p>
      <div className="max-w-full overflow-x-auto">
        <table className='w-full table-auto'>
            <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Student ID
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Month</th>
                 <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Year</th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Class
                 </th>
                 <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Section
                 </th>
                 <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Amount Paid
                 </th>
                 <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Amount Remain</th>
                 <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">DateTime</th>

                 

                 <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Status</th>
            </tr>
            </thead>
            <tbody>
                {studentdata.map((el)=>(
  <tr className={el.status==='balance_clear'?'bg-green-200 text-black font-bold':'bg-orange-200 text-black font-bold'}>
  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
    {el.student_id}
  </td>
  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
    {el.month}
  </td> 
  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
    {el.year}
  </td>
  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
    {el.class}
  </td>
  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
    {el.section}
  </td><td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
    {el.amount}
  </td>
  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
    {el.remain_balance}
  </td>
  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
    {el.time}
  </td> 
  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
    {el.status==='balance_clear'?"Clear":"Remain Balance"}
  </td>
</tr>
                ))}
               
            </tbody>
          
        </table>
      </div>
    </div>
  )
}
