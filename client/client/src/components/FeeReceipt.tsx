import React, { useState, useEffect,useRef } from 'react';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import axios from "axios"

import Cookies from 'universal-cookie';
import { Spinner } from '@material-tailwind/react';
interface FeeReceiptProps{
    data:object;
    covertpdf:any
  }
//   
const FeeReceipt=(props:FeeReceiptProps) => {
  
    const {data,covertpdf}:{data:any,covertpdf:any}=props
    const cookies = new Cookies();
    const url = String(import.meta.env.VITE_REACT_API_URL);
  const [schooldata,setschooldata]=useState({
    schoolname:'',
    phone:'',
  });
  const [schooladdress,setschooladdress]=useState({
    schooladdress:'',
    country:'',
  })
    const [initdata,setinitdata]=useState({
        tuition_amount:'',
        admission_amount:'',
        exam_amount:'',
        sports_amount:'',
        transport_amount:'',
        date:'',
        reciept_no:'',
        student_name:'',
        father_name:'',
        student_class:'',
        months:'',
        remain_amount:'',




    })
    useEffect(()=>{
      setinitdata(data[0]);
    },[])
    const auth = cookies.get('_UID');
    const getschooldata = async (auth: any) => {
        try {
            const res = await axios.get(`${url}/register_address/${auth}`);

            const schoolname = await axios.get(`${url}/apisignup/${auth}`);
            const schoonamedata:any = schoolname.data[0];
            const addressdata:any = res.data[0];
            setschooldata(schoonamedata);
            setschooladdress(addressdata);
        } catch (err) {
            return err;
        }
    }

    useEffect(() => {
        getschooldata(auth);
    }, [])
    const FeeData = [
        {
            name: 'Tuition Fee',
            amount: Number(initdata.tuition_amount||0),
        },
        {
            name: 'Admission Fee',
            amount: Number(initdata.admission_amount||0),
        },
        {
            name: 'Exam Fee',
            amount: Number(initdata.exam_amount||0),
        },
        {
            name: 'Sports Fee',
            amount: Number(initdata.sports_amount||0),
        },
        {
            name: 'Transport Fee',
         amount: Number(initdata.transport_amount||0),
        },
    ];
    let total_amount: number = 0
    for (let key of FeeData) {
        total_amount += key.amount;
    }



    return (
        <>
        
            <div ref={covertpdf} className="w-[100%] md:w-[80%] lg:w-[90%] m-auto p-5  border">
            <div className="m-auto p-3 text-center">
                <SchoolIcon color="primary" sx={{ fontSize: 60 }} />
                <p className="text-red-800 font-bold text-3xl">
                   {schooldata.schoolname}
                </p>
                <Typography>{schooladdress.schooladdress} , {schooladdress.country}</Typography>
                 <Typography>{schooldata.phone}</Typography>
            </div>
            <hr />
            <br  />
            <p className="text-blue-600 font-bold uppercase flex align-middle justify-end">Recipt No: {initdata.reciept_no}</p>
            <p className="text-graydark font-bold  flex align-middle justify-end">Date: {initdata.date}</p>

           


             <div>
                 <div className='flex align-middle justify-normal w-full text-1xl'>
                 <p className='font-bold'>Name </p>  <div style={{borderBottom:'1px dotted black',width:'100%'}} className='text-blue-500'> <p className='text-blue-700 ml-2'>{initdata.student_name} </p> </div>
                 </div>
                 
                 <div className='flex align-middle justify-normal w-full text-1xl mt-0 md:mt-2 lg:mt-2'>
                 <p className='w-40 md:w-30 lg:w-34 font-bold'>Father's Name </p>  <p style={{borderBottom:'1px dotted black',width:'100%'}} className='text-blue-500'> <p className='text-blue-700 ml-2'>{initdata.father_name}</p> </p>
                 </div>
               
             </div>
             
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 mt-0 md:mt-2 lg:mt-2'>
              <div className='flex align-middle justify-normal w-full text-1xl'>
                 <p className='font-bold'>Class </p>  <div style={{borderBottom:'1px dotted black',width:'100%'}} className='text-blue-500'> <p className='text-blue-700 ml-2'>{initdata.student_class}</p> </div>
                 </div>
                 <div className='flex align-middle justify-normal w-full text-1xl'>
                 <p className='font-bold'>Month </p>  <div style={{borderBottom:'1px dotted black',width:'100%'}} className='text-blue-500'> <p className='text-blue-700 ml-2'>{initdata.months}</p> </div>
                 </div>
              </div>
            
            <div>
                <table className='w-[80%] md:w-[60%] lg:w-[55%] min-w-max table-auto text-left mt-10'>
                    <thead>
                        <tr>
                            <th className='text-blue-900'>Particulars</th>
                            <th className='text-blue-900'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {FeeData.map((el, i) => (
                            <tr key={i} className="even:bg-blue-gray-50/50 p-3">

                                <td>
                                    <Typography color="blue-gray" className="font-normal p-3">
                                        {el.name}
                                    </Typography>
                                </td>
                                <td>
                                    <Typography color="blue-gray" className="font-normal p-3">
                                        {el.amount}
                                    </Typography>

                                </td>
                            </tr>
                        ))}
                        <tr className='w-full font-bold bg-[#b9c9de] p-5'>
                            <td className='p-3'>Total Paid Amount</td>
                            <td className='p-3'>{total_amount}</td>
                        </tr>
                        <tr className=''>
                            <td>

                                <p color="blue-gray" className="font-bold p-3">
                                    Balance if any
                                </p>

                            </td>
                            <td>
                                <Typography color="blue-gray" className="font-normal p-3">
                                  {initdata.remain_amount}
                                  
                                </Typography>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <div className='w-full flex justify-center gap-15 align-middle mt-20'>
                <div className='font-bold text-1xl p-2' style={{ borderTop: '2px solid black' }}>Signature of School Head</div>
                <div className='font-bold text-1xl p-2' style={{ borderTop: '2px solid black' }}>Signature of Parent</div>
            </div>
        </div>
    
        
        </>
    );
};

export default FeeReceipt;
