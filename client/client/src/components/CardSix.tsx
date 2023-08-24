import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const CardSix = () => {
  const cookies = new Cookies();
  const url = String(import.meta.env.VITE_REACT_API_URL);

  const auth = cookies.get('_UID');
  const [male,setmale]=useState(0);
  const [load,setload]=useState(false);
  const [female,setfemale]=useState(0);
  const [other,setother]=useState(0);

  const getdatacount=async(auth:any)=>{
    setload(true);
    try{
      const res=await axios.get(`${url}/schoolteacher/${auth}/male`)
        setmale(res.data.length);
        setload(false);
    }catch(err){
      return err;
    }
    try{
       setload(true);
      const res=await axios.get(`${url}/schoolteacher/${auth}/female`)
   setfemale(res.data.length)
   setload(false);

    }catch(err){
      return err;
    }
    try{
      setload(true);

      const res=await axios.get(`${url}/schoolteacher/${auth}/other`)
   setother(res.data.length)
   setload(false);

    }catch(err){
      return err;
    }
  }
  useEffect(()=>{
 getdatacount(auth);
  },[])

    return (
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* <div className="flex h-15.5 w-15.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"> */}
         
          {/* <svg
           className="fill-primary dark:fill-white"
           width="22"
           height="16"
           viewBox="0 0 22 16"
          
           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
   */}

   <p className="text-title-md font-bold text-black dark:text-white">{male+female+other}</p>
        {/* </div> */}
  
        <div className="mt-4 flex items-end justify-between">
          <div>
            {/* <h4 className="text-title-md font-bold text-black dark:text-white">
              $3.456K
            </h4> */}
            <span className="text-sm font-medium">Total Teachers</span>
            <p className="text-sm font-medium">Shows total number of teachers by gender</p>

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
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",textAlign:'center',marginTop:"10px",padding:'15px',border:'2px solid rgb(70,128,255)',borderRadius:"10px"}}  className="bg-blue-500 text-white dark:text-white"  >
                 <div>
                 <p className="text-xl font-medium text-white dark:text-white">{male}</p>
                 <p className="text-xl font-medium text-white dark:text-white">Male</p>

                 </div>
                 <div>
                 <p className="text-xl font-medium text-white dark:text-white">{female}</p>
                 <p className="text-xl font-medium text-white dark:text-white">Female</p>
                 </div>
                 <div>
                 <p className="text-xl font-medium text-white dark:text-white">{other}</p>
                 <p className="text-xl font-medium text-white dark:text-white">Other</p>
                 </div>
            </div>
      </div>
    );
  };
  
  export default CardSix;
  