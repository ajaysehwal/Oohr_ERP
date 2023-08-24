import React from 'react'
import notfound from "../assets/images/404notfound.jpg";
import {Button} from "@material-tailwind/react"
import { useNavigate} from 'react-router-dom';

export default function PageNotfound() {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    };
  return (
    <div style={{background:'rgb(255,255,255)',height:'100vh'}}>
        <img style={{width:"60%",margin:"auto"}} src={notfound} alt="" />
         <Button onClick={goBack} color='red' style={{margin:'auto',display:'flex'}}>Go Back</Button>
    </div>
  )
}
