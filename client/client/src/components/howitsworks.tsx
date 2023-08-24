import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';
export default function Howitsworks() {
    const data=[
        {
        title:"Registration",
        text:"Begin by signing up using your email address. This initiates your journey towards a streamlined school management experience",
       },
       {
        title:"Information Input",
        text:" Input all the essential school-related details. Provide information about your institution, its particulars, and any unique aspects that define your educational setup",

       },
       {
        title:"Data Compilation",
        text:"Compile comprehensive lists of students, teachers, and staff members. Our intuitive interface makes it easy to organize and manage these crucial profiles effortlessly.",

       },
       {
        title:"Time Table & Calendar",
        text:"Design a well-structured timetable and calendar, ensuring a smooth flow of classes and activities. This dynamic scheduling feature enhances your institution's operational efficiency.",
       },
       {
        title:"Fee Structure & Dates",
        text:" Set up your fee structure and important payment dates. Our system helps you manage financial matters seamlessly, ensuring timely transactions and accurate records",
       },
       {
        title:"Software Readiness",
        text:"With these steps completed, our software is ready for use. You've successfully transformed your school's management process into a streamlined, efficient, and digitally-powered environment. Enjoy the benefits of hassle-free administration and enhanced productivity",
       }
]
const {howitsworksRef}=useContext(AuthContext);

  return (
    <div ref={howitsworksRef}> 
        <div>
        <p className="text-3xl font-bold text-black text-center py-4">How Its Works</p>
        <p className="text-center p-1">Our platform offers a cost-free ERP solution tailored for effective school work management. To get started, follow these simple steps</p>
        </div>
         <div  style={{margin:"auto",alignItems:"center",width:'90%'}} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            {data.map((el)=>(
 <Card style={{border:'1px solid silver', height:"280px"}} className="mt-6">
 <CardBody>                                                                                                     
   <Typography variant="h5" color="blue-gray" className="mb-2">
    {el.title}
   </Typography>
   <Typography>
     {el.text}
   </Typography>
 </CardBody>
 {/* <CardFooter className="pt-0">
   <Button color="blue">Read More</Button>
 </CardFooter> */}
</Card>
            ))}
         
         </div>
        
    </div>
  )
}
