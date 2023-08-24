import React from 'react';
import { Input } from '@material-tailwind/react';
import { Form, useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';

import Cookies from 'universal-cookie';
import {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
const url = String(import.meta.env.VITE_REACT_API_URL);

export default function Managestudentfees() {
    interface RouteParams {
       id: string;
      }  
      const { id } = useParams<RouteParams>();

const [studentdata, setdata] = useState({});
const successnotify = (text: string) =>
  toast.success(text, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

  const notify = (text: string) =>
  toast.error(text, {
    position:'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
  const [load, setload] = useState(false);
  const currentYear = new Date().getFullYear();
  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toDateString(); // Convert date to a human-readable string
    setCurrentDate(formattedDate);
  }, []);
      const getstudent = async (id: any) => {
        setload(true);
        try {
          const res = await axios.get(`${url}/studentdetails/${id}`);
          setdata(res.data[0]);
          setload(false);
        } catch (err) {
          setload(true);
          return err;
        }
      };
      useEffect(() => {
        getstudent(id);
      }, []);
    
    
    const jan = useForm();
    const feb = useForm();
    const march = useForm();
    const april = useForm();
    const may = useForm();
    const june = useForm();
    const july = useForm();
    const august = useForm();
    const setpember = useForm();
    const october = useForm();
    const november = useForm();
    const december = useForm();
    const [janrec,setjanrec]=useState({});
    const [febrec,setfebrec]=useState({});
    const [marrec,setmarrec]=useState({});
    const [aprilrec,setaprilrec]=useState({});
    const [mayrec,setmayrec]=useState({});
   
    const [junerec,setjunerec]=useState({});
    const [julyrec,setjulyrec]=useState({});
    const [augustrec,setaugustrec]=useState({});
    
    const [septrec,setseptrec]=useState({});
    const [octrec,setoctrec]=useState({});
    const [novrec,setnovrec]=useState({});
    const [decrec,setdecrec]=useState({});

    const [janstatus,setjanstatus]=useState('');
    const [febstatus,setfebstatus]=useState('');
    const [marstatus,setmarstatus]=useState('');
    const [aprilstatus,setaprilstatus]=useState('');
    const [maystatus,setmaystatus]=useState('');
  
    const [junestatus,setjunestatus]=useState('');
    const [julystatus,setjulystatus]=useState('');
    const [augstatus,setaugstatus]=useState('');
    const [septstatus,setseptstatus]=useState('');
    const [octstatus,setoctstatus]=useState('');
    const [novstatus,setnovstatus]=useState('');
    const [decstatus,setdecstatus]=useState('');
   
     const get_fees_record=async(student_code:any,school_id:any)=>{
        try{
            const res=await axios.get(`${url}/schoolstudentfees/${student_code}/${school_id}/January/${currentYear}`);
                        if(res.data.length===0){
                            setjanrec({status:"not_pay"})

                        }else{
                            const data=res.data[res.data.length-1];

                            setjanrec(data)

                        }
                  

            
             
        }catch(err){
            return err
        }
        try{
            const res=await axios.get(`${url}/schoolstudentfees/${student_code}/${school_id}/February/${currentYear}`);
         

            if(res.data.length===0){
                setfebrec({status:"not_pay"})

            }else{
                const data=res.data[res.data.length-1];

                setfebrec(data)

            }
            
             
        }catch(err){
            return err
        }

        try{
            const res=await axios.get(`${url}/schoolstudentfees/${student_code}/${school_id}/March/${currentYear}`);
            

            if(res.data.length===0){
                setmarrec({status:"not_pay"})

            }else{
                const data=res.data[res.data.length-1];

                setmarrec(data)

            }
            
             
        }catch(err){
            return err
        }
        try{
            const res=await axios.get(`${url}/schoolstudentfees/${student_code}/${school_id}/April/${currentYear}`);
           
                if(res.data.length===0){
                    setaprilrec({status:"not_pay"})

                }else{
                    const data=res.data[res.data.length-1];

                    setaprilrec(data)

                }

            
             
        }catch(err){
            return err
        }
        try{
            const res=await axios.get(`${url}/schoolstudentfees/${student_code}/${school_id}/May/${currentYear}`);
         
            if(res.data.length===0){
                setmayrec({status:"not_pay"})

            }else{
                const data=res.data[res.data.length-1];

                setmayrec(data)

            }

            
             
        }catch(err){
            return err
        }
        try{
            const res=await axios.get(`${url}/schoolstudentfees/${student_code}/${school_id}/June/${currentYear}`);
           

            if(res.data.length===0){
                setjunerec({status:"not_pay"})

            }else{
                const data=res.data[res.data.length-1];

                setjunerec(data)

            }
            
             
        }catch(err){
            return err
        }
        try{
            const res=await axios.get(`${url}/schoolstudentfees/${student_code}/${school_id}/July/${currentYear}`);
            
                if(res.data.length===0){
                    setjulyrec({status:"not_pay"})

                }else{
                    const data=res.data[res.data.length-1];

                    setjulyrec(data)

                }

            
             
        }catch(err){
            return err
        }
        try{
            const res=await axios.get(`${url}/schoolstudentfees/${student_code}/${school_id}/August/${currentYear}`);
            //  console.log(res.data[1])
           
                  if(res.data.length===0){
                            setaugustrec({status:"not_pay"})

                        }else{
                            const data=res.data[res.data.length-1];

                            setaugustrec(data)

                        }

            
             
        }catch(err){
            return err
        }
        try{
            const res=await axios.get(`${url}/schoolstudentfees/${student_code}/${school_id}/September/${currentYear}`);
           
            if(res.data.length===0){
                setseptrec({status:"not_pay"})

            }else{
                const data=res.data[res.data.length-1];

                setseptrec(data)

            }

            
             
        }catch(err){
            return err
        }
        try{
            const res=await axios.get(`${url}/schoolstudentfees/${student_code}/${school_id}/October/${currentYear}`);
          
            if(res.data.length===0){
                setoctrec({status:"not_pay"})

            }else{
                const data=res.data[res.data.length-1];

                setoctrec(data)

            }

            
             
        }catch(err){
            return err
        }
        try{
            const res=await axios.get(`${url}/schoolstudentfees/${student_code}/${school_id}/November/${currentYear}`);
              if(res.data.length===0){
               setnovrec({status:"not_pay"})

              }else{
                const data=res.data[res.data.length-1];
                     setnovrec(data)

              }
                

            
             
        }catch(err){
            return err
        }
        try{
            const res=await axios.get(`${url}/schoolstudentfees/${student_code}/${school_id}/December/${currentYear}`);
          
              if(res.data.length===0){
                            setdecrec({status:"not_pay"})

                        }else{
                            const data=res.data[res.data.length-1];

                            setdecrec(data)

                        }

            
             
        }catch(err){
            return err
        }
       


     }
     useEffect(()=>{
       get_fees_record(id,auth);
     },[])
    const handlesubmit_jan = async (data: any) => {
        
          if(janrec.status!=="balance_remain"&&data.amount===''&& janrec.status!=="balance_clear"){
            notify('Please Enter Fee Amount');
          }else{
            if(data.fee_status===""){
                notify('Please Update Fee Status');
            }else{
                if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                      notify('Please Enter Remain Fee amount');
                    
                }else{
                     if(janrec.status==="balance_remain"&& data.other_remain_amount==''){
                        notify('Please enter Remain account to clear balance');
                     }else{
                    const send={
                        month:data.month,
                        amount:janrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                        fee_status:data.fee_status,
                        year:data.year,
                        student_id:studentdata.student_code,
                        class:studentdata.select_class,
                        section:studentdata.section,
                        student_name:studentdata.student_name,
                        school_id:studentdata.admin_token,
                        date:currentDate,
                        remain_balance:data.remain_amount==''?'0':data.remain_amount
                    }
            
                    try{
               const res=await axios.post(`${url}/studentfees`,send);
               console.log(res.data);
               if(res.data.protocol41==true){
                get_fees_record(id,auth);
                setjanstatus('')
             successnotify('Updated Successfully');
               }else{
                notify('Something Went Wrong Please Try Again Later');
               }
        
                    }catch(err){
                        return err;
                    }
            
                }
            }
            }
          }
          
       
    }
    const handlesubmit_feb =async (data: any) => {
       
        
          if(febrec.status!=="balance_remain"&& data.amount==='' && febrec.status!=="balance_clear"){
            notify('Please Enter Fee Amount');
          }else{
            if(data.fee_status===""){
                notify('Please Update Fee Status');
            }else{
                if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                      notify('Please Enter Remain Fee amount');
                }else{
                     if(febrec.status="balance_remain" && data.other_remain_amount==''){
                        notify('Please enter Remain account to clear balance')
                     }else{

                    const send={
                        month:data.month,
                        amount:febrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                        fee_status:data.fee_status,
                        year:data.year,
                        student_id:studentdata.student_code,
                        class:studentdata.select_class,
                        section:studentdata.section,
                        student_name:studentdata.student_name,
                        school_id:studentdata.admin_token,
                        date:currentDate,
                        remain_balance:data.remain_amount==''?'0':data.remain_amount
                    }
                console.log(send);
            
                    try{
               const res=await axios.post(`${url}/studentfees`,send);
               console.log(res.data);
                      get_fees_record(id,auth);
                         setfebstatus('')
               successnotify('Updated Successfully');
                    }catch(err){
                        return err;
                    }
            
                }
            }
            }
          }
       
        
    }
    const handlesubmit_mar =async (data: any) => {
        if(marrec.status!=="balance_clear"&&data.amount==='' && febrec.status!=="balance_clear"){
            notify('Please Enter Fee Amount');
          }else{
            if(data.fee_status===""){
                notify('Please Update Fee Status');
            }else{
                if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                      notify('Please Enter Remain Fee amount');
                }else{
                    const send={
                        month:data.month,
                        amount:marrec.status==='balance_remain'?data.other_remain_amount:data.amount,
                        fee_status:data.fee_status,
                        year:data.year,
                        student_id:studentdata.student_code,
                        class:studentdata.select_class,
                        section:studentdata.section,
                        student_name:studentdata.student_name,
                        school_id:studentdata.admin_token,
                        date:currentDate,
                        remain_balance:data.remain_amount==''?'0':data.remain_amount
                    }
            
                    try{
               const res=await axios.post(`${url}/studentfees`,send);
               console.log(res.data);
               if(res.data.protocol41==true){
                get_fees_record(id,auth);
                       
                setmarstatus('');
         successnotify('Updated Successfully');
               }else{
                notify('Something Went Wrong Please Try Again Later');

               }
                    
                    }catch(err){
                        return err;
                    }
            
                }
            }
          }
    }
    const handlesubmit_april = async (data: any) => {
        
           if(aprilrec.status!=="balance_remain"&& data.amount==='' && aprilrec.status!=="balance_clear"){
            notify('Please Enter Fee Amount');
          }else{
            if(data.fee_status===""){
                notify('Please Update Fee Status');
            }else{
                if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                      notify('Please Enter Remain Fee amount');
                }else{
                    if(aprilrec.status==="balance_remain"&& data.other_remain_amount==''){
                        notify('Please enter Remain account to clear balance');
                     }else{
                    const send={
                        month:data.month,
                        amount:aprilrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                        fee_status:data.fee_status,
                        year:data.year,
                        student_id:studentdata.student_code,
                        class:studentdata.select_class,
                        section:studentdata.section,
                        student_name:studentdata.student_name,
                        school_id:studentdata.admin_token,
                        date:currentDate,
                        remain_balance:data.remain_amount==''?'0':data.remain_amount
                    }
            
                    try{
               const res=await axios.post(`${url}/studentfees`,send);
               console.log(res.data);
                if(res.data.protocol41==true){
                      get_fees_record(id,auth);
                       setaprilstatus('');

               successnotify('Updated Successfully');
                }else{
                    notify('Something Went Wrong Please Try Again Later');
 
                }
                    }catch(err){
                        return err;
                    }
                }
                }
            }
          }
    }
    const handlesubmit_may = async(data: any) => {
        
        if(mayrec.status!=="balance_remain"&&data.amount===''&& mayrec.status!=="balance_clear"){
            notify('Please Enter Fee Amount');
          }else{
            if(data.fee_status===""){
                notify('Please Update Fee Status');
            }else{
                if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                      notify('Please Enter Remain Fee amount');
                }else{
                    if(mayrec.status==="balance_remain"&& data.other_remain_amount==''){
                        notify('Please enter Remain account to clear balance');
                     }else{
                    const send={
                        month:data.month,
                        amount:mayrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                        fee_status:data.fee_status,
                        year:data.year,
                        student_id:studentdata.student_code,
                        class:studentdata.select_class,
                        section:studentdata.section,
                        student_name:studentdata.student_name,
                        school_id:studentdata.admin_token,
                        date:currentDate,
                        remain_balance:data.remain_amount==''?'0':data.remain_amount
                    }
            
                    try{
               const res=await axios.post(`${url}/studentfees`,send);
               console.log(res.data);
               if(res.data.protocol41==true){
                get_fees_record(id,auth);
                setmaystatus('')
             successnotify('Updated Successfully');
               }else{
                notify('Something Went Wrong Please Try Again Later');
               }
                   
                    }catch(err){
                        return err;
                    }
                }
                }
            }
          }
    }
    const handlesubmit_june = async(data: any) => {
        
        if(junerec.status!=="balance_remain"&&data.amount===''&& junerec.status!=="balance_clear"){
            notify('Please Enter Fee Amount');
          }else{
            if(data.fee_status===""){
                notify('Please Update Fee Status');
            }else{
                if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                      notify('Please Enter Remain Fee amount');
                }else{
                    if(junerec.status==="balance_remain"&& data.other_remain_amount==''){
                        notify('Please enter Remain account to clear balance');
                     }else{
                    const send={
                        month:data.month,
                        amount:junerec.status==="balance_remain"?data.other_remain_amount:data.amount,
                        fee_status:data.fee_status,
                        year:data.year,
                        student_id:studentdata.student_code,
                        class:studentdata.select_class,
                        section:studentdata.section,
                        student_name:studentdata.student_name,
                        school_id:studentdata.admin_token,
                        date:currentDate,
                        remain_balance:data.remain_amount==''?'0':data.remain_amount
                    }
            
                    try{
               const res=await axios.post(`${url}/studentfees`,send);
               console.log(res.data);
               if(res.data.protocol41==true){
                get_fees_record(id,auth);
                setjunestatus('')
             successnotify('Updated Successfully');
               }else{
                notify('Something Went Wrong Please Try Again Later');
               }
        
                    }catch(err){
                        return err;
                    }
                }
                }
            }
          }
    }
    const handlesubmit_july = async(data: any) => {
        
        if(julyrec.status!=="balance_remain"&&data.amount===''&& julyrec.status!=="balance_clear"){
            notify('Please Enter Fee Amount');
          }else{
            if(data.fee_status===""){
                notify('Please Update Fee Status');
            }else{
                if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                      notify('Please Enter Remain Fee amount');
                    
                }else{
                     if(julyrec.status==="balance_remain"&& data.other_remain_amount==''){
                        notify('Please enter Remain account to clear balance');
                     }else{
                    const send={
                        month:data.month,
                        amount:julyrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                        fee_status:data.fee_status,
                        year:data.year,
                        student_id:studentdata.student_code,
                        class:studentdata.select_class,
                        section:studentdata.section,
                        student_name:studentdata.student_name,
                        school_id:studentdata.admin_token,
                        date:currentDate,
                        remain_balance:data.remain_amount==''?'0':data.remain_amount
                    }
            
                    try{
               const res=await axios.post(`${url}/studentfees`,send);
               console.log(res.data);
               if(res.data.protocol41==true){
                get_fees_record(id,auth);
                setjulystatus('')
             successnotify('Updated Successfully');
               }else{
                notify('Something Went Wrong Please Try Again Later');
               }
        
                    }catch(err){
                        return err;
                    }
            
                }
            }
            }
          }
          
          }
    
    const handlesubmit_aug = async(data: any) => {
        
     
        if(augustrec.status!=="balance_remain"&&data.amount===''&& augustrec.status!=="balance_clear"){
            notify('Please Enter Fee Amount');
          }else{
            if(data.fee_status===""){
                notify('Please Update Fee Status');
            }else{
                if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                      notify('Please Enter Remain Fee amount');
                    
                }else{
                     if(augustrec.status==="balance_remain"&& data.other_remain_amount==''){
                        notify('Please enter Remain account to clear balance');
                     }else{
                    const send={
                        month:data.month,
                        amount:augustrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                        fee_status:data.fee_status,
                        year:data.year,
                        student_id:studentdata.student_code,
                        class:studentdata.select_class,
                        section:studentdata.section,
                        student_name:studentdata.student_name,
                        school_id:studentdata.admin_token,
                        date:currentDate,
                        remain_balance:data.remain_amount==''?'0':data.remain_amount
                    }
            
                    try{
               const res=await axios.post(`${url}/studentfees`,send);
               console.log(res.data);
               if(res.data.protocol41==true){
                get_fees_record(id,auth);
                setaugstatus('')
             successnotify('Updated Successfully');
               }else{
                notify('Something Went Wrong Please Try Again Later');
               }
        
                    }catch(err){
                        return err;
                    }
            
                }
            }
            }
          }
          
    }

    const handlesubmit_sept = async(data: any) => {
        if(septrec.status!=="balance_remain"&&data.amount===''&& septrec.status!=="balance_clear"){
            notify('Please Enter Fee Amount');
          }else{
            if(data.fee_status===""){
                notify('Please Update Fee Status');
            }else{
                if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                      notify('Please Enter Remain Fee amount');
                    
                }else{
                     if(septrec.status==="balance_remain"&& data.other_remain_amount==''){
                        notify('Please enter Remain account to clear balance');
                     }else{
                    const send={
                        month:data.month,
                        amount:septrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                        fee_status:data.fee_status,
                        year:data.year,
                        student_id:studentdata.student_code,
                        class:studentdata.select_class,
                        section:studentdata.section,
                        student_name:studentdata.student_name,
                        school_id:studentdata.admin_token,
                        date:currentDate,
                        remain_balance:data.remain_amount==''?'0':data.remain_amount
                    }
            
                    try{
               const res=await axios.post(`${url}/studentfees`,send);
               console.log(res.data);
               if(res.data.protocol41==true){
                get_fees_record(id,auth);
                setseptstatus('')
             successnotify('Updated Successfully');
               }else{
                notify('Something Went Wrong Please Try Again Later');
               }
        
                    }catch(err){
                        return err;
                    }
            
                }
            }
            }
          }
          
    }
    const handlesubmit_oct = async(data: any) => {
        if(octrec.status!=="balance_remain"&&data.amount===''&& octrec.status!=="balance_clear"){
            notify('Please Enter Fee Amount');
          }else{
            if(data.fee_status===""){
                notify('Please Update Fee Status');
            }else{
                if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                      notify('Please Enter Remain Fee amount');
                    
                }else{
                     if(octrec.status==="balance_remain"&& data.other_remain_amount==''){
                        notify('Please enter Remain account to clear balance');
                     }else{
                    const send={
                        month:data.month,
                        amount:octrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                        fee_status:data.fee_status,
                        year:data.year,
                        student_id:studentdata.student_code,
                        class:studentdata.select_class,
                        section:studentdata.section,
                        student_name:studentdata.student_name,
                        school_id:studentdata.admin_token,
                        date:currentDate,
                        remain_balance:data.remain_amount==''?'0':data.remain_amount
                    }
            
                    try{
               const res=await axios.post(`${url}/studentfees`,send);
               console.log(res.data);
               if(res.data.protocol41==true){
                get_fees_record(id,auth);
                setoctstatus('')
             successnotify('Updated Successfully');
               }else{
                notify('Something Went Wrong Please Try Again Later');
               }
        
                    }catch(err){
                        return err;
                    }
            
                }
            }
            }
          }
          
    }
    const handlesubmit_nov = async(data: any) => {
        
        if(novrec.status!=="balance_remain"&&data.amount===''&& novrec.status!=="balance_clear"){
            notify('Please Enter Fee Amount');
          }else{
            if(data.fee_status===""){
                notify('Please Update Fee Status');
            }else{
                if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                      notify('Please Enter Remain Fee amount');
                    
                }else{
                     if(novrec.status==="balance_remain"&& data.other_remain_amount==''){
                        notify('Please enter Remain account to clear balance');
                     }else{
                    const send={
                        month:data.month,
                        amount:novrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                        fee_status:data.fee_status,
                        year:data.year,
                        student_id:studentdata.student_code,
                        class:studentdata.select_class,
                        section:studentdata.section,
                        student_name:studentdata.student_name,
                        school_id:studentdata.admin_token,
                        date:currentDate,
                        remain_balance:data.remain_amount==''?'0':data.remain_amount
                    }
            
                    try{
               const res=await axios.post(`${url}/studentfees`,send);
               console.log(res.data);
               if(res.data.protocol41==true){
                get_fees_record(id,auth);
                setnovstatus('')
             successnotify('Updated Successfully');
               }else{
                notify('Something Went Wrong Please Try Again Later');
               }
        
                    }catch(err){
                        return err;
                    }
            
                }
            }
            }
          }
          
    }
    const handlesubmit_dec = async(data: any) => {
      
        if(decrec.status!=="balance_remain"&&data.amount===''&& decrec.status!=="balance_clear"){
            notify('Please Enter Fee Amount');
          }else{
            if(data.fee_status===""){
                notify('Please Update Fee Status');
            }else{
                if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                      notify('Please Enter Remain Fee amount');
                    
                }else{
                     if(decrec.status==="balance_remain"&& data.other_remain_amount==''){
                        notify('Please enter Remain account to clear balance');
                     }else{
                    const send={
                        month:data.month,
                        amount:decrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                        fee_status:data.fee_status,
                        year:data.year,
                        student_id:studentdata.student_code,
                        class:studentdata.select_class,
                        section:studentdata.section,
                        student_name:studentdata.student_name,
                        school_id:studentdata.admin_token,
                        date:currentDate,
                        remain_balance:data.remain_amount==''?'0':data.remain_amount
                    }
            
                    try{
               const res=await axios.post(`${url}/studentfees`,send);
               console.log(res.data);
               if(res.data.protocol41==true){
                get_fees_record(id,auth);
                setdecstatus('')
             successnotify('Updated Successfully');
               }else{
                notify('Something Went Wrong Please Try Again Later');
               }
        
                    }catch(err){
                        return err;
                    }
            
                }
            }
            }
          }
          
    }

const handlesubmit_last_jan = async (data: any) => {
        
        if(janrec.status!=="balance_remain"&&data.other_remain_amount===''&& janrec.status!=="balance_clear"){
          notify('Please Enter Fee Amount');
        }else{
          if(data.fee_status===""){
              notify('Please Update Fee Status');
          }else{
              if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                    notify('Please Enter Remain Fee amount');
                  
              }else{
                   if(janrec.status==="balance_remain"&& data.other_remain_amount==''){
                      notify('Please enter Remain account to clear balance');
                   }else{
                  const send={
                      month:data.month,
                      amount:janrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                      fee_status:"balance_clear",
                      year:data.year,
                      student_id:studentdata.student_code,
                      class:studentdata.select_class,
                      section:studentdata.section,
                      student_name:studentdata.student_name,
                      school_id:studentdata.admin_token,
                      date:currentDate,
                      remain_balance:data.remain_amount==''?'0':data.remain_amount
                  }
          
                  try{
             const res=await axios.post(`${url}/studentfees`,send);
             console.log(res.data);
           get_fees_record(id,auth);
                setjanstatus('')
             successnotify('Updated Successfully');
                  }catch(err){
                      return err;
                  }
          
              }
          }
          }
        }
        
     
  }
  const handlesubmit_last_feb =async (data: any) => {
     
    if(febrec.status!=="balance_remain"&&data.other_remain_amount===''&& febrec.status!=="balance_clear"){
        notify('Please Enter Fee Amount');
      }else{
        if(data.fee_status===""){
            notify('Please Update Fee Status');
        }else{
            if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                  notify('Please Enter Remain Fee amount');
                
            }else{
                 if(febrec.status==="balance_remain"&& data.other_remain_amount==''){
                    notify('Please enter Remain account to clear balance');
                 }else{
                const send={
                    month:data.month,
                    amount:febrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                    fee_status:"balance_clear",
                    year:data.year,
                    student_id:studentdata.student_code,
                    class:studentdata.select_class,
                    section:studentdata.section,
                    student_name:studentdata.student_name,
                    school_id:studentdata.admin_token,
                    date:currentDate,
                    remain_balance:data.remain_amount==''?'0':data.remain_amount
                }
        
                try{
           const res=await axios.post(`${url}/studentfees`,send);
           console.log(res.data);
         get_fees_record(id,auth);
              setfebstatus('')
           successnotify('Updated Successfully');
                }catch(err){
                    return err;
                }
        
            }
        }
        }
    }
}
  const handlesubmit_last_mar =async (data: any) => {
    if(marrec.status!=="balance_remain"&&data.other_remain_amount===''&& marrec.status!=="balance_clear"){
        notify('Please Enter Fee Amount');
      }else{
        if(data.fee_status===""){
            notify('Please Update Fee Status');
        }else{
            if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                  notify('Please Enter Remain Fee amount');
                
            }else{
                 if(marrec.status==="balance_remain"&& data.other_remain_amount==''){
                    notify('Please enter Remain account to clear balance');
                 }else{
                const send={
                    month:data.month,
                    amount:marrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                    fee_status:"balance_clear",
                    year:data.year,
                    student_id:studentdata.student_code,
                    class:studentdata.select_class,
                    section:studentdata.section,
                    student_name:studentdata.student_name,
                    school_id:studentdata.admin_token,
                    date:currentDate,
                    remain_balance:data.remain_amount==''?'0':data.remain_amount
                }
        
                try{
           const res=await axios.post(`${url}/studentfees`,send);
           console.log(res.data);
         get_fees_record(id,auth);
              setmarstatus('')
           successnotify('Updated Successfully');
                }catch(err){
                    return err;
                }
        
            }
        }
        }
  }
}
  const handlesubmit_last_april = async (data: any) => {
      
    if(aprilrec.status!=="balance_remain"&&data.other_remain_amount===''&& aprilrec.status!=="balance_clear"){
        notify('Please Enter Fee Amount');
      }else{
        if(data.fee_status===""){
            notify('Please Update Fee Status');
        }else{
            if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                  notify('Please Enter Remain Fee amount');
                
            }else{
                 if(aprilrec.status==="balance_remain"&& data.other_remain_amount==''){
                    notify('Please enter Remain account to clear balance');
                 }else{
                const send={
                    month:data.month,
                    amount:aprilrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                    fee_status:"balance_clear",
                    year:data.year,
                    student_id:studentdata.student_code,
                    class:studentdata.select_class,
                    section:studentdata.section,
                    student_name:studentdata.student_name,
                    school_id:studentdata.admin_token,
                    date:currentDate,
                    remain_balance:data.remain_amount==''?'0':data.remain_amount
                }
        
                try{
           const res=await axios.post(`${url}/studentfees`,send);
           console.log(res.data);
         get_fees_record(id,auth);
              setaprilstatus('')
           successnotify('Updated Successfully');
                }catch(err){
                    return err;
                }
        
            }
        }
        }
  }
}
  const handlesubmit_last_may = async(data: any) => {
      
    if(mayrec.status!=="balance_remain"&&data.other_remain_amount===''&& mayrec.status!=="balance_clear"){
        notify('Please Enter Fee Amount');
      }else{
        if(data.fee_status===""){
            notify('Please Update Fee Status');
        }else{
            if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                  notify('Please Enter Remain Fee amount');
                
            }else{
                 if(mayrec.status==="balance_remain"&& data.other_remain_amount==''){
                    notify('Please enter Remain account to clear balance');
                 }else{
                const send={
                    month:data.month,
                    amount:mayrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                    fee_status:"balance_clear",
                    year:data.year,
                    student_id:studentdata.student_code,
                    class:studentdata.select_class,
                    section:studentdata.section,
                    student_name:studentdata.student_name,
                    school_id:studentdata.admin_token,
                    date:currentDate,
                    remain_balance:data.remain_amount==''?'0':data.remain_amount
                }
        
                try{
           const res=await axios.post(`${url}/studentfees`,send);
           console.log(res.data);
         get_fees_record(id,auth);
              setmaystatus('')
           successnotify('Updated Successfully');
                }catch(err){
                    return err;
                }
        
            }
        }
        }
        }
  }
  const handlesubmit_last_june = async(data: any) => {
    
    if(junerec.status!=="balance_remain"&&data.other_remain_amount===''&& junerec.status!=="balance_clear"){
        notify('Please Enter Fee Amount');
      }else{
        if(data.fee_status===""){
            notify('Please Update Fee Status');
        }else{
            if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                  notify('Please Enter Remain Fee amount');
                
            }else{
                 if(junerec.status==="balance_remain"&& data.other_remain_amount==''){
                    notify('Please enter Remain account to clear balance');
                 }else{
                const send={
                    month:data.month,
                    amount:junerec.status==="balance_remain"?data.other_remain_amount:data.amount,
                    fee_status:"balance_clear",
                    year:data.year,
                    student_id:studentdata.student_code,
                    class:studentdata.select_class,
                    section:studentdata.section,
                    student_name:studentdata.student_name,
                    school_id:studentdata.admin_token,
                    date:currentDate,
                    remain_balance:data.remain_amount==''?'0':data.remain_amount
                }
        
                try{
           const res=await axios.post(`${url}/studentfees`,send);
           console.log(res.data);
         get_fees_record(id,auth);
              setjunestatus('')
           successnotify('Updated Successfully');
                }catch(err){
                    return err;
                }
        
            }
        }
        }
    }
  }
  const handlesubmit_last_july = async(data: any) => {
      
    if(julyrec.status!=="balance_remain"&&data.other_remain_amount===''&& julyrec.status!=="balance_clear"){
        notify('Please Enter Fee Amount');
      }else{
        if(data.fee_status===""){
            notify('Please Update Fee Status');
        }else{
            if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                  notify('Please Enter Remain Fee amount');
                
            }else{
                 if(julyrec.status==="balance_remain"&& data.other_remain_amount==''){
                    notify('Please enter Remain account to clear balance');
                 }else{
                const send={
                    month:data.month,
                    amount:julyrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                    fee_status:"balance_clear",
                    year:data.year,
                    student_id:studentdata.student_code,
                    class:studentdata.select_class,
                    section:studentdata.section,
                    student_name:studentdata.student_name,
                    school_id:studentdata.admin_token,
                    date:currentDate,
                    remain_balance:data.remain_amount==''?'0':data.remain_amount
                }
        
                try{
           const res=await axios.post(`${url}/studentfees`,send);
           console.log(res.data);
         get_fees_record(id,auth);
              setjulystatus('')
           successnotify('Updated Successfully');
                }catch(err){
                    return err;
                }
        
            }
        }
    }
    }
  }
  const handlesubmit_last_aug = async(data: any) => {
      
    if(augustrec.status!=="balance_remain"&&data.other_remain_amount===''&& augustrec.status!=="balance_clear"){
        notify('Please Enter Fee Amount');
      }else{
        if(data.fee_status===""){
            notify('Please Update Fee Status');
        }else{
            if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                  notify('Please Enter Remain Fee amount');
                
            }else{
                 if(augustrec.status==="balance_remain"&& data.other_remain_amount==''){
                    notify('Please enter Remain account to clear balance');
                 }else{
                const send={
                    month:data.month,
                    amount:augustrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                    fee_status:"balance_clear",
                    year:data.year,
                    student_id:studentdata.student_code,
                    class:studentdata.select_class,
                    section:studentdata.section,
                    student_name:studentdata.student_name,
                    school_id:studentdata.admin_token,
                    date:currentDate,
                    remain_balance:data.remain_amount==''?'0':data.remain_amount
                }
        
                try{
           const res=await axios.post(`${url}/studentfees`,send);
           console.log(res.data);
         get_fees_record(id,auth);
         setaugstatus('')
           successnotify('Updated Successfully');
                }catch(err){
                    return err;
                }
        
            }
        }
    }
        }
  }
  const handlesubmit_last_sept = async(data: any) => {
    if(septrec.status!=="balance_remain"&&data.other_remain_amount===''&& septrec.status!=="balance_clear"){
        notify('Please Enter Fee Amount');
      }else{
        if(data.fee_status===""){
            notify('Please Update Fee Status');
        }else{
            if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                  notify('Please Enter Remain Fee amount');
                
            }else{
                 if(septrec.status==="balance_remain"&& data.other_remain_amount==''){
                    notify('Please enter Remain account to clear balance');
                 }else{
                const send={
                    month:data.month,
                    amount:septrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                    fee_status:"balance_clear",
                    year:data.year,
                    student_id:studentdata.student_code,
                    class:studentdata.select_class,
                    section:studentdata.section,
                    student_name:studentdata.student_name,
                    school_id:studentdata.admin_token,
                    date:currentDate,
                    remain_balance:data.remain_amount==''?'0':data.remain_amount
                }
        
                try{
           const res=await axios.post(`${url}/studentfees`,send);
           console.log(res.data);
         get_fees_record(id,auth);
              setseptstatus('')
           successnotify('Updated Successfully');
                }catch(err){
                    return err;
                }
        
            }
        }
        }
    }
  }
  const handlesubmit_last_oct = async(data: any) => {
      
      
    if(octrec.status!=="balance_remain"&&data.other_remain_amount===''&& octrec.status!=="balance_clear"){
        notify('Please Enter Fee Amount');
      }else{
        if(data.fee_status===""){
            notify('Please Update Fee Status');
        }else{
            if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                  notify('Please Enter Remain Fee amount');
                
            }else{
                 if(octrec.status==="balance_remain"&& data.other_remain_amount==''){
                    notify('Please enter Remain account to clear balance');
                 }else{
                const send={
                    month:data.month,
                    amount:octrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                    fee_status:"balance_clear",
                    year:data.year,
                    student_id:studentdata.student_code,
                    class:studentdata.select_class,
                    section:studentdata.section,
                    student_name:studentdata.student_name,
                    school_id:studentdata.admin_token,
                    date:currentDate,
                    remain_balance:data.remain_amount==''?'0':data.remain_amount
                }
        
                try{
           const res=await axios.post(`${url}/studentfees`,send);
           console.log(res.data);
         get_fees_record(id,auth);
              setoctstatus('')
           successnotify('Updated Successfully');
                }catch(err){
                    return err;
                }
        
            }
        }
        }
    }
  }
  const handlesubmit_last_nov = async(data: any) => {
      
    if(novrec.status!=="balance_remain"&&data.other_remain_amount===''&& novrec.status!=="balance_clear"){
        notify('Please Enter Fee Amount');
      }else{
        if(data.fee_status===""){
            notify('Please Update Fee Status');
        }else{
            if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                  notify('Please Enter Remain Fee amount');
                
            }else{
                 if(novrec.status==="balance_remain"&& data.other_remain_amount==''){
                    notify('Please enter Remain account to clear balance');
                 }else{
                const send={
                    month:data.month,
                    amount:novrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                    fee_status:"balance_clear",
                    year:data.year,
                    student_id:studentdata.student_code,
                    class:studentdata.select_class,
                    section:studentdata.section,
                    student_name:studentdata.student_name,
                    school_id:studentdata.admin_token,
                    date:currentDate,
                    remain_balance:data.remain_amount==''?'0':data.remain_amount
                }
        
                try{
           const res=await axios.post(`${url}/studentfees`,send);
           console.log(res.data);
         get_fees_record(id,auth);
              setnovstatus('')
           successnotify('Updated Successfully');
                }catch(err){
                    return err;
                }
        
            }
        }
        }
    }
  }
  const handlesubmit_last_dec = async(data: any) => {
      
    if(decrec.status!=="balance_remain"&&data.other_remain_amount===''&& decrec.status!=="balance_clear"){
        notify('Please Enter Fee Amount');
      }else{
        if(data.fee_status===""){
            notify('Please Update Fee Status');
        }else{
            if(data.fee_status==="remain_balance"&&data.remain_amount===''){
                  notify('Please Enter Remain Fee amount');
                
            }else{
                 if(decrec.status==="balance_remain"&& data.other_remain_amount==''){
                    notify('Please enter Remain account to clear balance');
                 }else{
                const send={
                    month:data.month,
                    amount:decrec.status==="balance_remain"?data.other_remain_amount:data.amount,
                    fee_status:"balance_clear",
                    year:data.year,
                    student_id:studentdata.student_code,
                    class:studentdata.select_class,
                    section:studentdata.section,
                    student_name:studentdata.student_name,
                    school_id:studentdata.admin_token,
                    date:currentDate,
                    remain_balance:data.remain_amount==''?'0':data.remain_amount
                }
        
                try{
           const res=await axios.post(`${url}/studentfees`,send);
           console.log(res.data);
         get_fees_record(id,auth);
              setdecstatus('')
           successnotify('Updated Successfully');
                }catch(err){
                    return err;
                }
        
            }
        }
        }
    }
  }
    
 

    const janstatuschange=(value:any)=>{
        
        setjanstatus(value);
    }
    const febstatuschange=(value:any)=>{
        
        setfebstatus(value);
    }

    const marstatuschange=(value:any)=>{
        
        setmarstatus(value);
    }
     const aprilstatuschange=(value:any)=>{
        
        setaprilstatus(value);
    }
     const maystatuschange=(value:any)=>{
        
        setmaystatus(value);
    }
    const junestatuschange=(value:any)=>{
        
        setjunestatus(value);
    }
    const julystatuschange=(value:any)=>{
        
        setjulystatus(value);
    }
    const auguststatuschange=(value:any)=>{
        
        setaugstatus(value);
    }
    const septstatuschange=(value:any)=>{
        
        setseptstatus(value);
    }
    const octstatuschange=(value:any)=>{
        
        setoctstatus(value);
    }
  
    const novstatuschange=(value:any)=>{
        
        setnovstatus(value);
    }
    const decstatuschange=(value:any)=>{
        
        setdecstatus(value);
    }


    return (
        <div
            style={{ padding: '20px' }}
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        >
             <p style={{textAlign:'center',marginBottom:'20px'}} className='text-2xl font-bold'>Manage Student Fee</p>
            <div style={{ width: '100%',display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',justifyContent:'space-between' }}>
                 <div style={{ width: '100%',display:'flex',alignItems:'center',gap:'10px' }}>
                 <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
             <p>Current year :</p>
            <p className='text-1xl font-bold'> {currentYear}</p>
             </div>
             <ToastContainer></ToastContainer>
             <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
             <p>Date :</p>
            <p className='text-1xl font-bold'> {currentDate}</p>
             </div>
                 </div>
               <Link to={`/students/detailtable/student_fee_record/${id}`}>
               <Button  variant='text' style={{display:'flex',alignItems:'center',gap:'5px',width:'220px'}}  >
               <svg className="h-5 w-5"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
</svg>
               <p>View All Record</p> </Button>
               </Link>
           
            </div>
            {/* January */}
            <form>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 'auto',
                        width: '100%',
                    }}
                >
                    <Input

                        {...jan.register('month')}
                        value="January"
                        label={janrec.status=='balance_remain'?(
                               <p className='text-orange-600'>Balance Remain</p>
                        ):janrec.status==='balance_clear'?(
                            <p className='text-green-600'>Clear</p>

                        ):(
                            <p className='text-red-600'>Not Pay</p>
  
                        ) } 
                        style={{ cursor: 'pointer', fontSize: '22px', textAlign: 'center' }}
                    />
                     <div style={{display:janrec.status=='balance_clear' || janrec.status=='balance_remain'?"none":'block'}}>
                         <Input variant="outlined" label="₹ Fee amount" {...jan.register('amount')} />
                          </div>
                          <div style={{display:janrec.status=='balance_remain'?"block":'none'}}>
                         <Input variant="outlined" label="₹ Enter Remain Fee amount" {...jan.register('other_remain_amount')} />
                          </div>
                    <input type="hidden" {...jan.register('year')} value={currentYear} />

                    <select
                        id="small"
                        {...jan.register('fee_status',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                             janstatuschange(e.target.value)
                        }})}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Update Status</option>
                        <option
                            style={{ background: 'rgb(76,175,80)', color: 'white' }}
                            value="balance_clear"
                        >
                            Balance clear
                        </option>
                        <option
                            style={{ background: 'rgb(255,193,7)', color: 'white' }}
                            value="balance_remain"
                        >
                            Balance remain
                        </option>
                        <option
                            style={{ background: 'rgb(244,67,54)', color: 'white' }}
                            value="not_pay"
                        >
                            Not Pay
                        </option>
                    </select>
                     <div style={{display:janstatus=='balance_remain'?'block':'none'}}>
                     <Input   label='₹ Remain balance' {...jan.register('remain_amount')}/>

                     </div>
                     <button
                       style={{display:janstatus=='balance_remain' && janrec.status=='balance_clear'?'flex':"none",alignItems:'center',gap:'5px'}}
                        onClick={jan.handleSubmit(handlesubmit_last_jan)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                 
                     Update
                  
                
                    </button>

                    <button
                       style={{display:'flex',alignItems:'center',gap:'5px'}}
                        disabled={janrec.status==="balance_clear"}
                        onClick={jan.handleSubmit(handlesubmit_jan)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                    {janrec.status==="balance_remain"?"Update":""} {janrec.status==='not_pay'?"Add":''} {janrec.status==='balance_clear'?<svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
:''}   
{janrec.status==='balance_clear'?"Clear":''}   
                   
                  
                
                    </button>
                </div>
            </form>
            {/* February */}
            <form>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 'auto',
                        width: '100%',
                    }}
                >
                    <Input
                        {...feb.register('month')}
                        value="February"
                        label={febrec.status=='balance_remain'?(
                            <p className='text-orange-600'>Balance Remain</p>
                     ):febrec.status==='balance_clear'?(
                         <p className='text-green-600'>Clear</p>

                     ):(
                         <p className='text-red-600'>Not Pay</p>

                     ) } 
                        style={{ cursor: 'pointer', fontSize: '22px', textAlign: 'center' }}
                    />
                      <div style={{display:febrec.status=='balance_clear' || febrec.status=='balance_remain'?"none":'block'}}>
                         <Input variant="outlined" label="₹ Fee amount" {...feb.register('amount')} />
                      </div>
                      <div style={{display:febrec.status=='balance_remain'?"block":'none'}}>
                         <Input variant="outlined" label="₹ Enter Remain Fee amount" {...feb.register('other_remain_amount')} />
                          </div>
                    <input type="hidden" {...feb.register('year')} value={currentYear} />
                    <select
                        id="small"
                        {...feb.register('fee_status',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                            febstatuschange(e.target.value)
                       }})}

                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Update Status</option>
                        <option
                            style={{ background: 'rgb(76,175,80)', color: 'white' }}
                            value="balance_clear"
                        >
                            Balance clear
                        </option>
                        <option
                            style={{ background: 'rgb(255,193,7)', color: 'white' }}
                            value="balance_remain"
                        >
                            Balance remain
                        </option>
                        <option
                            style={{ background: 'rgb(244,67,54)', color: 'white' }}
                            value="not_pay"
                        >
                            Not Pay
                        </option>
                    </select>
                    <div style={{display:febstatus=='balance_remain'?'block':'none'}}>
                     <Input   label='₹ Remain balance' {...feb.register('remain_amount')}/>

                     </div>
                     <button
                       style={{display:febstatus=='balance_remain' && febrec.status=='balance_clear'?'flex':"none",alignItems:'center',gap:'5px'}}
                        onClick={feb.handleSubmit(handlesubmit_last_feb)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                 
                     Update
                  
                
                    </button>
                    <button
                                           style={{display:'flex',alignItems:'center',gap:'5px'}}
                                           disabled={febrec.status==="balance_clear"}

                        onClick={feb.handleSubmit(handlesubmit_feb)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                          {febrec.status==="balance_remain"?"Update":""} {febrec.status==='not_pay'?"Add":''} {febrec.status==='balance_clear'?<svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
:''}   
{febrec.status==='balance_clear'?"Clear":''}   
                    </button>
                </div>
            </form>
            {/* March */}
            <form>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 'auto',
                        width: '100%',
                    }}
                >
                    <Input
                        {...march.register('month')}
                        value="March"
  
    label={marrec.status=='balance_remain'?(
                               <p className='text-orange-600'>Balance Remain</p>
                 ):marrec.status==='balance_clear'?(
                            <p className='text-green-600'>Clear</p>

                        ):(
                            <p className='text-red-600'>Not Pay</p>
  
                        ) }                       style={{ cursor: 'pointer', fontSize: '22px', textAlign: 'center' }}
                    />
                    <input type="hidden" {...march.register('year')} value={currentYear} />
                    <div style={{display:marrec.status=='balance_clear' || marrec.status=='balance_remain'?"none":'block'}}>
                         <Input variant="outlined" label="₹ Fee amount" {...march.register('amount')} />
                          </div>
                          <div style={{display:marrec.status=='balance_remain'?"block":'none'}}>
                         <Input variant="outlined" label="₹ Enter Remain Fee amount" {...march.register('other_remain_amount')} />
                          </div>
                    <select
                        {...march.register('fee_status',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                            marstatuschange(e.target.value)
                       }})}
                        id="small"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Update Status</option>
                        <option
                            style={{ background: 'rgb(76,175,80)', color: 'white' }}
                            value="balance_clear"
                        >
                            Balance clear
                        </option>
                        <option
                            style={{ background: 'rgb(255,193,7)', color: 'white' }}
                            value="balance_remain"
                        >
                            Balance remain
                        </option>
                        <option
                            style={{ background: 'rgb(244,67,54)', color: 'white' }}
                            value="not_pay"
                        >
                            Not Pay
                        </option>
                    </select>
                    <div style={{display:marstatus=='balance_remain'?'block':'none'}}>
                     <Input   label='₹ Remain balance' {...march.register('remain_amount')}/>

                     </div>
                     <button
                       style={{display:marstatus=='balance_remain' && marrec.status=='balance_clear'?'flex':"none",alignItems:'center',gap:'5px'}}
                        onClick={march.handleSubmit(handlesubmit_last_mar)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                 
                     Update
                  
                
                    </button>
                    <button
                     style={{display:'flex',alignItems:'center',gap:'5px'}}

                     disabled={marrec.status==="balance_clear"}

                        onClick={march.handleSubmit(handlesubmit_mar)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                          {marrec.status==="balance_remain"?"Update":""} {marrec.status==='not_pay'?"Add":''} {marrec.status==='balance_clear'?<svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
:''}   
{marrec.status==='balance_clear'?"Clear":''}   
                   
                    </button>
                </div>
            </form>
            {/* April */}
            <form >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 'auto',
                        width: '100%',
                    }}
                >
                    <Input
                        {...april.register('month')}
                        value="April"
  
    label={aprilrec.status=='balance_remain'?(
                               <p className='text-orange-600'>Balance Remain</p>
                        ):aprilrec.status==='balance_clear'?(
                            <p className='text-green-600'>Clear</p>

                        ):(
                            <p className='text-red-600'>Not Pay</p>
  
                        ) }                       style={{ cursor: 'pointer', fontSize: '22px', textAlign: 'center' }}
                    />
                    <input type="hidden" {...april.register('year')} value={currentYear} />
                    <div style={{display:aprilrec.status=='balance_clear' || aprilrec.status=='balance_remain'?"none":'block'}}>
                         <Input variant="outlined" label="₹ Fee amount" {...april.register('amount')} />
                          </div>
                          <div style={{display:aprilrec.status=='balance_remain'?"block":'none'}}>
                         <Input variant="outlined" label="₹ Enter Remain Fee amount" {...april.register('other_remain_amount')} />
                     </div>
                    <select
                        {...april.register('fee_status',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                            aprilstatuschange(e.target.value)
                       }})}
                        id="small"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Update Status</option>
                        <option
                            style={{ background: 'rgb(76,175,80)', color: 'white' }}
                            value="balance_clear"
                        >
                            Balance clear
                        </option>
                        <option
                            style={{ background: 'rgb(255,193,7)', color: 'white' }}
                            value="balance_remain"
                        >
                            Balance remain
                        </option>
                        <option
                            style={{ background: 'rgb(244,67,54)', color: 'white' }}
                            value="not_pay"
                        >
                            Not Pay
                        </option>
                    </select>
                    <div style={{display:aprilstatus=='balance_remain'?'block':'none'}}>
                     <Input   label='₹ Remain balance' {...april.register('remain_amount')}/>

                     </div>
                     <button
                       style={{display:aprilstatus=='balance_remain' && aprilrec.status=='balance_clear'?'flex':"none",alignItems:'center',gap:'5px'}}
                        onClick={april.handleSubmit(handlesubmit_last_april)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                 
                     Update
                  
                
                    </button>
                    <button
                        style={{display:'flex',alignItems:'center',gap:'5px'}}
                        disabled={aprilrec.status==="balance_clear"}

                        onClick={april.handleSubmit(handlesubmit_april)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                         {aprilrec.status==="balance_remain"?"Update":""} {aprilrec.status==='not_pay'?"Add":''} {aprilrec.status==='balance_clear'?<svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
:''}   
{aprilrec.status==='balance_clear'?"Clear":''}   
                    </button>
                </div>
            </form>
            {/* May */}
            <form >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 'auto',
                        width: '100%',
                    }}
                >
                    <Input
                        {...may.register('month')}
                        value="May"
    
      label={mayrec.status=='balance_remain'?(
                               <p className='text-orange-600'>Balance Remain</p>
                        ):mayrec.status==='balance_clear'?(
                            <p className='text-green-600'>Clear</p>

                        ):(
                            <p className='text-red-600'>Not Pay</p>
  
                        ) }                     style={{ cursor: 'pointer', fontSize: '22px', textAlign: 'center' }}
                    />
                    <input type="hidden" {...may.register('year')} value={currentYear} />
                    <div style={{display:mayrec.status=='balance_clear' || mayrec.status=='balance_remain'?"none":'block'}}>
                         <Input variant="outlined" label="₹ Fee amount" {...may.register('amount')} />
                          </div>
                          <div style={{display:mayrec.status=='balance_remain'?"block":'none'}}>
                         <Input variant="outlined" label="₹ Enter Remain Fee amount" {...may.register('other_remain_amount')} />
                          </div>

                    <select
                        id="small"
                        {...may.register('fee_status',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                            maystatuschange(e.target.value)
                       }})}

                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Update Status</option>
                        <option
                            style={{ background: 'rgb(76,175,80)', color: 'white' }}
                            value="balance_clear"
                        >
                            Balance clear
                        </option>
                        <option
                            style={{ background: 'rgb(255,193,7)', color: 'white' }}
                            value="balance_remain"
                        >
                            Balance remain
                        </option>
                        <option
                            style={{ background: 'rgb(244,67,54)', color: 'white' }}
                            value="not_pay"
                        >
                            Not Pay
                        </option>
                    </select>
                    <div style={{display:maystatus=='balance_remain'?'block':'none'}}>
                     <Input   label='₹ Remain balance' {...may.register('remain_amount')}/>

                     </div>
                     <button
                       style={{display:maystatus=='balance_remain' && mayrec.status=='balance_clear'?'flex':"none",alignItems:'center',gap:'5px'}}
                        onClick={may.handleSubmit(handlesubmit_last_may)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                 
                     Update
                  
                
                    </button>
                    <button
                                           style={{display:'flex',alignItems:'center',gap:'5px'}}
                                 disabled={mayrec.status==="balance_clear"}

                        onClick={may.handleSubmit(handlesubmit_may)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                          {mayrec.status==="balance_remain"?"Update":""} {mayrec.status==='not_pay'?"Add":''} {mayrec.status==='balance_clear'?<svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
:''}   
{mayrec.status==='balance_clear'?"Clear":''}   
                    </button>
                </div>
            </form>
            {/* June */}
            <form >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 'auto',
                        width: '100%',
                    }}
                >
                    <Input
                        {...june.register('month')}
                        value="June"
   
     label={junerec.status=='balance_remain'?(
                               <p className='text-orange-600'>Balance Remain</p>
                        ):junerec.status==='balance_clear'?(
                            <p className='text-green-600'>Clear</p>

                        ):(
                            <p className='text-red-600'>Not Pay</p>
  
                        ) }                      style={{ cursor: 'pointer', fontSize: '22px', textAlign: 'center' }}
                    />
                    <input type="hidden" {...june.register('year')} value={currentYear} />
                    <div style={{display:junerec.status=='balance_clear' || junerec.status=='balance_remain'?"none":'block'}}>
                         <Input variant="outlined" label="₹ Fee amount" {...june.register('amount')} />
                          </div>
                          <div style={{display:junerec.status=='balance_remain'?"block":'none'}}>
                         <Input variant="outlined" label="₹ Enter Remain Fee amount" {...june.register('other_remain_amount')} />
                          </div>
                    <select
                        {...june.register('fee_status',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                            junestatuschange(e.target.value)
                       }})}
                        id="small"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Update Status</option>
                        <option
                            style={{ background: 'rgb(76,175,80)', color: 'white' }}
                            value="balance_clear"
                        >
                            Balance clear
                        </option>
                        <option
                            style={{ background: 'rgb(255,193,7)', color: 'white' }}
                            value="balance_remain"
                        >
                            Balance remain
                        </option>
                        <option
                            style={{ background: 'rgb(244,67,54)', color: 'white' }}
                            value="not_pay"
                        >
                            Not Pay
                        </option>
                    </select>
                    <div style={{display:junestatus=='balance_remain'?'block':'none'}}>
                     <Input   label='₹ Remain balance' {...june.register('remain_amount')}/>

                     </div>
                     <button
                       style={{display:junestatus=='balance_remain' && junerec.status=='balance_clear'?'flex':"none",alignItems:'center',gap:'5px'}}
                        onClick={june.handleSubmit(handlesubmit_last_june)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                 
                     Update
                  
                
                    </button>

                    <button
                       style={{display:'flex',alignItems:'center',gap:'5px'}}
                        disabled={junerec.status==="balance_clear"}
                        onClick={june.handleSubmit(handlesubmit_june)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                    {junerec.status==="balance_remain"?"Update":""} {junerec.status==='not_pay'?"Add":''} {junerec.status==='balance_clear'?<svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
:''}   
{junerec.status==='balance_clear'?"Clear":''}   
                   
                  
                
                    </button>
                </div>
            </form>
            {/* july */}
            <form >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 'auto',
                        width: '100%',
                    }}
                >
                    <Input
                        {...july.register('month')}
                        value="July"
   
     label={julyrec.status=='balance_remain'?(
                               <p className='text-orange-600'>Balance Remain</p>
                        ):julyrec.status==='balance_clear'?(
                            <p className='text-green-600'>Clear</p>

                        ):(
                            <p className='text-red-600'>Not Pay</p>
  
                        ) }                      style={{ cursor: 'pointer', fontSize: '22px', textAlign: 'center' }}
                    />
                    <input type="hidden" {...july.register('year')} value={currentYear} />
                    <div style={{display:julyrec.status=='balance_clear' || julyrec.status=='balance_remain'?"none":'block'}}>
                         <Input variant="outlined" label="₹ Fee amount" {...july.register('amount')} />
                          </div>
                          <div style={{display:julyrec.status=='balance_remain'?"block":'none'}}>
                         <Input variant="outlined" label="₹ Enter Remain Fee amount" {...july.register('other_remain_amount')} />
                          </div>
                    <select
                        {...july.register('fee_status',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                            julystatuschange(e.target.value)
                       }})}
                        id="small"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Update Status</option>
                        <option
                            style={{ background: 'rgb(76,175,80)', color: 'white' }}
                            value="balance_clear"
                        >
                            Balance clear
                        </option>
                        <option
                            style={{ background: 'rgb(255,193,7)', color: 'white' }}
                            value="balance_remain"
                        >
                            Balance remain
                        </option>
                        <option
                            style={{ background: 'rgb(244,67,54)', color: 'white' }}
                            value="not_pay"
                        >
                            Not Pay
                        </option>
                    </select>
                    <div style={{display:julystatus=='balance_remain'?'block':'none'}}>
                     <Input   label='₹ Remain balance' {...july.register('remain_amount')}/>

                     </div>
                     <button
                       style={{display:julystatus=='balance_remain' && julyrec.status=='balance_clear'?'flex':"none",alignItems:'center',gap:'5px'}}
                        onClick={july.handleSubmit(handlesubmit_last_july)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                 
                     Update
                  
                
                    </button>

                    <button
                       style={{display:'flex',alignItems:'center',gap:'5px'}}
                        disabled={julyrec.status==="balance_clear"}
                        onClick={july.handleSubmit(handlesubmit_july)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                    {julyrec.status==="balance_remain"?"Update":""} {julyrec.status==='not_pay'?"Add":''} {julyrec.status==='balance_clear'?<svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
:''}   
{julyrec.status==='balance_clear'?"Clear":''}   
                   
                  
                
                    </button>
                </div>
            </form>
            {/* August */}
            <form>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 'auto',
                        width: '100%',
                    }}
                >
                    <Input
                        {...august.register('month')}
                        value="August"
 
   label={augustrec.status=='balance_remain'?(
                               <p className='text-orange-600'>Balance Remain</p>
                        ):augustrec.status==='balance_clear'?(
                            <p className='text-green-600'>Clear</p>

                        ):(
                            <p className='text-red-600'>Not Pay</p>
  
                        ) }                        style={{ cursor: 'pointer', fontSize: '22px', textAlign: 'center' }}
                    />
                    <input type="hidden" {...august.register('year')} value={currentYear} />
                    <div style={{display:augustrec.status=='balance_clear' || augustrec.status=='balance_remain'?"none":'block'}}>
                         <Input variant="outlined" label="₹ Fee amount" {...august.register('amount')} />
                          </div>
                          <div style={{display:augustrec.status=='balance_remain'?"block":'none'}}>
                         <Input variant="outlined" label="₹ Enter Remain Fee amount" {...august.register('other_remain_amount')} />
                          </div>
                    <select
                        {...august.register('fee_status',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                            auguststatuschange(e.target.value)
                       }})}
                        id="small"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Update Status</option>
                        <option
                            style={{ background: 'rgb(76,175,80)', color: 'white' }}
                            value="balance_clear"
                        >
                            Balance clear
                        </option>
                        <option
                            style={{ background: 'rgb(255,193,7)', color: 'white' }}
                            value="balance_remain"
                        >
                            Balance remain
                        </option>
                        <option
                            style={{ background: 'rgb(244,67,54)', color: 'white' }}
                            value="not_pay"
                        >
                            Not Pay
                        </option>
                    </select>
                    <div style={{display:augstatus=='balance_remain'?'block':'none'}}>
                     <Input   label='₹ Remain balance' {...august.register('remain_amount')}/>

                     </div>
                     <button
                       style={{display:augstatus=='balance_remain' && augustrec.status=='balance_clear'?'flex':"none",alignItems:'center',gap:'5px'}}
                        onClick={august.handleSubmit(handlesubmit_last_aug)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                 
                     Update
                  
                
                    </button>

                    <button
                       style={{display:'flex',alignItems:'center',gap:'5px'}}
                        disabled={augustrec.status==="balance_clear"}
                        onClick={august.handleSubmit(handlesubmit_aug)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                    {augustrec.status==="balance_remain"?"Update":""} {augustrec.status==='not_pay'?"Add":''} {augustrec.status==='balance_clear'?<svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
:''}   
{augustrec.status==='balance_clear'?"Clear":''}   
                   
                  
                
                    </button>
                </div>
            </form>
            {/* September */}
            <form >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 'auto',
                        width: '100%',
                    }}
                >
                    <input type="hidden" {...setpember.register('year')} value={currentYear} />

                    <Input
                        {...setpember.register('month')}
                        value="September"
                          label={septrec.status=='balance_remain'?(
                               <p className='text-orange-600'>Balance Remain</p>
                        ):septrec.status==='balance_clear'?(
                            <p className='text-green-600'>Clear</p>

                        ):(
                            <p className='text-red-600'>Not Pay</p>
  
                        ) } 
                        style={{ cursor: 'pointer', fontSize: '22px', textAlign: 'center' }}
                    />
                     <div style={{display:septrec.status=='balance_clear' || septrec.status=='balance_remain'?"none":'block'}}>
                         <Input variant="outlined" label="₹ Fee amount" {...setpember.register('amount')} />
                          </div>
                          <div style={{display:septrec.status=='balance_remain'?"block":'none'}}>
                         <Input variant="outlined" label="₹ Enter Remain Fee amount" {...setpember.register('other_remain_amount')} />
                          </div>

                    <select
                        {...setpember.register('fee_status',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                            septstatuschange(e.target.value)
                       }})}
                        id="small"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Update Status</option>
                        <option
                            style={{ background: 'rgb(76,175,80)', color: 'white' }}
                            value="balance_clear"
                        >
                            Balance clear
                        </option>
                        <option
                            style={{ background: 'rgb(255,193,7)', color: 'white' }}
                            value="balance_remain"
                        >
                            Balance remain
                        </option>
                        <option
                            style={{ background: 'rgb(244,67,54)', color: 'white' }}
                            value="not_pay"
                        >
                            Not Pay
                        </option>
                    </select>
                    <div style={{display:septstatus=='balance_remain'?'block':'none'}}>
                     <Input   label='₹ Remain balance' {...setpember.register('remain_amount')}/>

                     </div>
                     <button
                       style={{display:septstatus=='balance_remain' && septrec.status=='balance_clear'?'flex':"none",alignItems:'center',gap:'5px'}}
                        onClick={setpember.handleSubmit(handlesubmit_last_sept)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                 
                     Update
                  
                
                    </button>

                    <button
                       style={{display:'flex',alignItems:'center',gap:'5px'}}
                        disabled={septrec.status==="balance_clear"}
                        onClick={setpember.handleSubmit(handlesubmit_sept)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                    {septrec.status==="balance_remain"?"Update":""} {septrec.status==='not_pay'?"Add":''} {septrec.status==='balance_clear'?<svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
:''}   
{septrec.status==='balance_clear'?"Clear":''}   
                   
                  
                
                    </button>
                </div>
            </form>
            {/* October */}
            <form >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 'auto',
                        width: '100%',
                    }}
                >
                    <Input
                        {...october.register('month')}
                        value="October"

  label={octrec.status=='balance_remain'?(
                               <p className='text-orange-600'>Balance Remain</p>
                        ):octrec.status==='balance_clear'?(
                            <p className='text-green-600'>Clear</p>

                        ):(
                            <p className='text-red-600'>Not Pay</p>
  
                        ) }                         style={{ cursor: 'pointer', fontSize: '22px', textAlign: 'center' }}
                    />
                    <input type="hidden" {...october.register('year')} value={currentYear} />
                    <div style={{display:octrec.status=='balance_clear' || octrec.status=='balance_remain'?"none":'block'}}>
                         <Input variant="outlined" label="₹ Fee amount" {...october.register('amount')} />
                          </div>
                          <div style={{display:octrec.status=='balance_remain'?"block":'none'}}>
                         <Input variant="outlined" label="₹ Enter Remain Fee amount" {...october.register('other_remain_amount')} />
                          </div>
                    <select
                        {...october.register('fee_status',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                            octstatuschange(e.target.value)
                       }})}

                        id="small"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Update Status</option>
                        <option
                            style={{ background: 'rgb(76,175,80)', color: 'white' }}
                            value="balance_clear"
                        >
                            Balance clear
                        </option>
                        <option
                            style={{ background: 'rgb(255,193,7)', color: 'white' }}
                            value="balance_remain"
                        >
                            Balance remain
                        </option>
                        <option
                            style={{ background: 'rgb(244,67,54)', color: 'white' }}
                            value="not_pay"
                        >
                            Not Pay
                        </option>
                    </select>
                    <div style={{display:octstatus=='balance_remain'?'block':'none'}}>
                     <Input   label='₹ Remain balance' {...october.register('remain_amount')}/>

                     </div>
                      <button
                       style={{display:octstatus=='balance_remain' && octrec.status=='balance_clear'?'flex':"none",alignItems:'center',gap:'5px'}}
                        onClick={october.handleSubmit(handlesubmit_last_oct)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                 
                     Update
                  
                
                    </button>

                    <button
                       style={{display:'flex',alignItems:'center',gap:'5px'}}
                        disabled={octrec.status==="balance_clear"}
                        onClick={october.handleSubmit(handlesubmit_oct)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                    {octrec.status==="balance_remain"?"Update":""} {octrec.status==='not_pay'?"Add":''} {octrec.status==='balance_clear'?<svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
:''}   
{octrec.status==='balance_clear'?"Clear":''}   
                   
                  
                
                    </button>
                </div>
            </form>
            {/* November */}
            <form >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 'auto',
                        width: '100%',
                    }}
                >
                    <Input
                        {...november.register('month')}
                        value="November"
                          label={novrec.status=='balance_remain'?(
                               <p className='text-orange-600'>Balance Remain</p>
                        ):novrec.status==='balance_clear'?(
                            <p className='text-green-600'>Clear</p>

                        ):(
                            <p className='text-red-600'>Not Pay</p>
  
                        ) } 
                        style={{ cursor: 'pointer', fontSize: '22px', textAlign: 'center' }}
                    />
                    <div style={{display:novrec.status=='balance_clear' || novrec.status=='balance_remain'?"none":'block'}}>
                         <Input variant="outlined" label="₹ Fee amount" {...november.register('amount')} />
                      </div>
                      <div style={{display:novrec.status=='balance_remain'?"block":'none'}}>
                         <Input variant="outlined" label="₹ Enter Remain Fee amount" {...november.register('other_remain_amount')} />
                          </div>
                    <input type="hidden" {...november.register('year')} value={currentYear} />

                       
                    <select
                        {...november.register('fee_status',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                            novstatuschange(e.target.value)
                       }})}

                        id="small"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Update Status</option>
                        <option
                            style={{ background: 'rgb(76,175,80)', color: 'white' }}
                            value="balance_clear"
                        >
                            Balance clear
                        </option>
                        <option
                            style={{ background: 'rgb(255,193,7)', color: 'white' }}
                            value="balance_remain"
                        >
                            Balance remain
                        </option>
                        <option
                            style={{ background: 'rgb(244,67,54)', color: 'white' }}
                            value="not_pay"
                        >
                            Not Pay
                        </option>
                    </select>
                    <div style={{display:novstatus=='balance_remain'?'block':'none'}}>
                     <Input   label='₹ Remain balance' {...november.register('remain_amount')}/>

                     </div>
                     <button
                       style={{display:novstatus=='balance_remain' && novrec.status=='balance_clear'?'flex':"none",alignItems:'center',gap:'5px'}}
                        onClick={november.handleSubmit(handlesubmit_last_nov)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                 
                     Update
                  
                
                    </button>
                    <button
                                           style={{display:'flex',alignItems:'center',gap:'5px'}}
                                           disabled={novrec.status==="balance_clear"}

                        onClick={november.handleSubmit(handlesubmit_nov)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                          {novrec.status==="balance_remain"?"Update":""} {novrec.status==='not_pay'?"Add":''} {novrec.status==='balance_clear'?<svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
:''}   
{novrec.status==='balance_clear'?"Clear":''}   
                    </button>
                </div>
            </form>
            {/* December */}
            <form >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 'auto',
                        width: '100%',
                    }}
                >
                    <input type="hidden" {...december.register('year')} value={currentYear} />

                    <Input

                        {...december.register('month')}
                        value="December"
                          label={decrec.status=='balance_remain'?(
                               <p className='text-orange-600'>Balance Remain</p>
                        ):decrec.status==='balance_clear'?(
                            <p className='text-green-600'>Clear</p>

                        ):(
                            <p className='text-red-600'>Not Pay</p>
  
                        ) } 
                        style={{ cursor: 'pointer', fontSize: '22px', textAlign: 'center' }}
                    />

<div style={{display:decrec.status=='balance_clear' || decrec.status=='balance_remain'?"none":'block'}}>
                         <Input variant="outlined" label="₹ Fee amount" {...december.register('amount')} />
                      </div>
                      <div style={{display:decrec.status=='balance_remain'?"block":'none'}}>
                         <Input variant="outlined" label="₹ Enter Remain Fee amount" {...december.register('other_remain_amount')} />
                          </div>
                    <select
                        {...december.register('fee_status',{onChange:(e:React.ChangeEvent<HTMLInputElement>)=>{
                            decstatuschange(e.target.value)
                       }})}

                        id="small"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Update Status</option>
                        <option
                            style={{ background: 'rgb(76,175,80)', color: 'white' }}
                            value="balance_clear"
                        >
                            Balance clear
                        </option>
                        <option
                            style={{ background: 'rgb(255,193,7)', color: 'white' }}
                            value="balance_remain"
                        >
                            Balance remain
                        </option>
                        <option
                            style={{ background: 'rgb(244,67,54)', color: 'white' }}
                            value="not_pay"
                        >
                            Not Pay
                        </option>
                    </select>

                    <div style={{display:decstatus=='balance_remain'?'block':'none'}}>
                     <Input   label='₹ Remain balance' {...december.register('remain_amount')}/>

                     </div>
                     <button
                       style={{display:decstatus=='balance_remain' && decrec.status=='balance_clear'?'flex':"none",alignItems:'center',gap:'5px'}}
                        onClick={december.handleSubmit(handlesubmit_last_dec)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                    >
                 
                     Update
                  
                
                    </button>
                    <button
                                           style={{display:'flex',alignItems:'center',gap:'5px'}}
                                           disabled={decrec.status==="balance_clear"}

                        onClick={december.handleSubmit(handlesubmit_dec)}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                          {decrec.status==="balance_remain"?"Update":""} {decrec.status==='not_pay'?"Add":''} {decrec.status==='balance_clear'?<svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
:''}   
{decrec.status==='balance_clear'?"Clear":''}   
                    </button>
                </div>
            </form>
        </div>
    );
}
