import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const url = String(import.meta.env.VITE_REACT_API_URL);


const CardFive = () => {
  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  const [male,setmale]=useState(0);
  const [load,setload]=useState(false);
  const [female,setfemale]=useState(0);
  const [other,setother]=useState(0);

  const getdatacount=async(auth:any)=>{
    try{
      const res=await axios.get(`${url}/schoolstudent/${auth}/male`)
        setmale(res.data.length);
    }catch(err){
      return err;
    }
    try{
      const res=await axios.get(`${url}/schoolstudent/${auth}/female`)
   setfemale(res.data.length)
    }catch(err){
      return err;
    }
    try{
      const res=await axios.get(`${url}/schoolstudent/${auth}/other`)
   setother(res.data.length)
    }catch(err){
      return err;
    }
  }
  useEffect(()=>{
 getdatacount(auth);
  },[])

    return (
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      
   <p className="text-title-md font-bold text-black dark:text-white">{load?<Spinner/>:male+female+other}</p>
        {/* </div> */}
  
        <div className="mt-4 flex items-end justify-between">
          <div>
            {/* <h4 className="text-title-md font-bold text-black dark:text-white">
              $3.456K
            </h4> */}
            <span className="text-sm font-medium">Total Students</span>
            <p className="text-sm font-medium">Shows total number of students by gender</p>

          </div>
          
  
          {/* <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
            0.43%
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          </span> */}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",textAlign:'center',marginTop:"10px",padding:'15px',borderRadius:"10px"}} className="bg-green-500 text-white dark:text-white" >
                 <div>
                 <p className="text-xl font-medium text-white dark:text-white">{load?<Spinner/>:male}</p>
                 <p className="text-xl font-medium text-white dark:text-white">Male</p>

                 </div>
                 <div>
                 <p className="text-xl font-medium text-white dark:text-white">{load?<Spinner/>:female}</p>
                 <p className="text-xl font-medium text-white dark:text-white">Female</p>
                 </div>
                 <div>
                 <p className="text-xl font-medium text-white dark:text-white">{load?<Spinner/>:other}</p>
                 <p className="text-xl font-medium text-white dark:text-white">Other</p>
                 </div>
            </div>
      </div>
    );
  };
  
  export default CardFive;
  