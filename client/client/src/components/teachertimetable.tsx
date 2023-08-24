import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Spinner } from '@material-tailwind/react';
export default function Teachertimetable() {
  interface RouteParams {
    teacher_id: string;
  }
  const { teacher_id } = useParams<RouteParams>();
  const url = String(import.meta.env.VITE_REACT_API_URL);

  const cookies = new Cookies();
  const [getdata, setgetdata] = useState([]);
  const [load, setload] = useState(false);
  const [teachername,setname]=useState('');
  const auth = cookies.get('_UID');
  console.log(teacher_id);
  const getteacherbyteacherdata = async (auth: any, teacher_id: any) => {
    try {
      const res = await axios.get(
        `${url}/teacherdata/${teacher_id}/${auth}`
      );
      console.log(res.data);
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    getteacherbyteacherdata(auth, teacher_id);
  }, []);
  const getteacherbytimetable = async (auth: any, teacher_id: any) => {
    setload(true);
    try {
      const res = await axios.get(
        `${url}/schooltimetablebyteacher/${teacher_id}/${auth}`
      );
      setload(false);
      setgetdata(res.data);
     const teacher=res.data[0];
      setname(teacher.assign_teacher);
    } catch (err) {
      setload(false);
      return err;
    }
  };
  useEffect(() => {
    getteacherbytimetable(auth, teacher_id);
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
       <div  style={{width:"100%",padding:'10px'}}   className="max-w-full overflow-x-auto">
        <p className='text-3xl font-bold'> {teachername} Lectures</p>
          <table style={{marginTop:'10px'}}  className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Class
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                   Section
                  </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Subject
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Class Timing
                </th>
               </tr>
            </thead>
            <tbody>
              {load? <Spinner style={{display:'flex',alignItems:'center',justifyContent:'center',marginLeft:'500px',marginRight:'10px'}} className='h-12 w-12' />:getdata?.map((el,i) => (
                <tr className="text-black dark:text-black" key={el.id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                      {el.class}
                    </h5>                 
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {el.section}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {el.subject}
                    </h5>
                  </td>
                
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {el.startingtime} - {el.endingtime}
                    </h5>
                  </td>
                 
                
                
                 
              
                </tr>

              ))}

            </tbody>
          </table>
        </div>
    </div>
  );
}
