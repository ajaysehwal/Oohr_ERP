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
      <div data-aos="zoom-in-up" className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      

   <p className="text-title-md font-bold text-black dark:text-white">{male+female+other}</p>
        {/* </div> */}
  
        <div className="mt-4 flex items-end justify-between">
          <div>
          
          
            <span className="text-sm font-medium">Total Teachers</span>
            <p className="text-sm font-medium">Shows total number of teachers by gender</p>

          </div>
          
  
        
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
  