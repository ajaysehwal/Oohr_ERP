import React from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
  import {
    UserPlusIcon,
    UserCircleIcon,
    DocumentArrowUpIcon,
  } from "@heroicons/react/24/solid";
  import StudentAdmissionform from './Studentform';
  import ChartTwo from './ChartTwo';
  import Excelupload from './excelupload';
  import Cookies from 'universal-cookie';
  import { Navigate } from 'react-router-dom';
export default function Studentadmissionform() {
  const cookies = new Cookies();
  const auth=cookies.get('_UID');
 if(!auth){
   return <Navigate to='/signin'/>
 }
    const data = [
        {
          label: "Form",
          value: "Form",
          icon: UserPlusIcon,
          desc: <StudentAdmissionform/>
        },
    
        {
          label: "Excel",
          value: "Excel",
          icon: DocumentArrowUpIcon,
          desc: <Excelupload/>
        },
      ];
  return (
    <div>
        <Tabs  className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4" value="Form">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader> 
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    </div>
  )
}
