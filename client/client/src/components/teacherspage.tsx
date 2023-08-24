import React from 'react';
import {useState} from "react";
import TearcherAdmissionform from "./Addteachers";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Button,
  } from "@material-tailwind/react";
   
  const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };
export default function Teacherspage() {
    const [open, setOpen] = useState(0);
    const handleOpen = (value:any) => setOpen(open === value ? 0 : value);
  return (
    <>
    <Accordion style={{marginBottom:'10px'}} className="" open={open === 1} animate={CUSTOM_ANIMATION}>
        <AccordionHeader  onClick={() => handleOpen(1)}>
        <Button color='green' style={{display:'flex',alignItems:'center',justifyContent:'right',margin:'auto',gap:"5px"}}>
        <svg className="h-6 w-6"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  
        strokeWidth="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="12" y1="5" x2="12" y2="19" /> 
         <line x1="5" y1="12" x2="19" y2="12" /></svg>Add New Teachers</Button>
        </AccordionHeader>
        <AccordionBody>
         <TearcherAdmissionform/>
        </AccordionBody>
      </Accordion>
       <Teacherdetailtable/>
    </>
  )
}
