import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm } from 'react-hook-form';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { Button, Dialog, DialogBody } from '@material-tailwind/react'
import TextField from '@mui/material/TextField';
import success from './animations/animation_lmg0sv1v.json';
import { ToastContainer, toast } from 'react-toastify';

const url = String(import.meta.env.VITE_REACT_API_URL);
import Cookies from 'universal-cookie';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Input} from "@material-tailwind/react"
import Lottie from 'lottie-react';

import {
    Accordion,
    AccordionBody,
  } from "@material-tailwind/react";
import axios from 'axios';

  
export default function CreateExam() {

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
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

    const cookies = new Cookies();
    const auth = cookies.get('_UID');
    const { register, handleSubmit, reset } = useForm();
 const onSubmit=(data:any)=>{
     if(data.exam_name===''){
        notify("Please Select Examination");
     }else{
        if(data.start_date===''&&data.end_date===''){
            notify("Please Select Exams Start and end date");
        }else{
            PostExamData(data);
 
        }
     }
 }
 const PostExamData=async(data:object)=>{
    try{
   const res=await axios.post(`${url}/schoolexams/${auth}`,data);
         if(res.data.response===true){
            successok();
            reset()
            GetExamData();
         }else{
         notify("Something went wrong please try again later")
         }
    }catch(err){
        notify("Something went wrong please try again later")

        return err;
    }
 }
const [examdata,setexamdata]=useState([]);
const [examdataload,setexamdataload]=useState(false);
 const GetExamData=async()=>{
    setexamdataload(true);
    try{
        const res=await axios.get(`${url}/schoolexams/${auth}`);
        setexamdataload(false);

        setexamdata(res.data.response);
    }catch(err){
        return err;
        setexamdataload(false);

    }
 }
 useEffect(()=>{
    GetExamData();
 },[])
 const [ExamType, setExamType] = React.useState('');

 const handleChange = (event: SelectChangeEvent) => {
   setExamType(event.target.value as string);

 };
 interface Column {
    id: 'name' | 'start_date' | 'end_date' | 'Session';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'name', label: 'Examination', minWidth: 170 },
    {
      id: 'start_date',
      label: 'Start Date',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'end_date',
      label: 'End Date',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'Session',
      label: 'Session',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
  ];
  
  interface Data {
    exam_name: string;
    start_date: string;
    end_date: string;
    session: string;
  }
  
  function createData(
    exam_name: string,
    start_date: string,
    end_date: string,
    session: string,
  ): Data {
    return { exam_name, start_date, end_date, session};
  }

  
  const rows:any = [];

  examdata.map(
    ({
        exam_name, start_date, end_date, session
    }: Data) =>
      rows.push(
        createData(
            exam_name, start_date, end_date, session
        ),
      ),
  );
 const [SessionType, setSessionType] = React.useState('');

 const handleChangeSession = (event: SelectChangeEvent) => {
   setSessionType(event.target.value as string);

 };
 const sessions=[
    "2023-2024",
    "2024-2025",
    "2025-2026",
    "2026-2027",
    "2027-2028",
    "2028-2029",
    "2029-2030",

 ]
 const examtypes=[
     "Half Yearly Examination",
      "Unit-1",
      "Unit-2",
      "Unit-3",
      "Final Examination",
      "Other Examination"
 ]
 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(10);

 const handleChangePage = (event: unknown, newPage: number) => {
   setPage(newPage);
 };

 const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
   setRowsPerPage(+event.target.value);
   setPage(0);
 };
 const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

 const [open, setOpen] = React.useState(0);
 
 const handleOpen = (value:any) => setOpen(open === value ? 0 : value);
 const [Success, setSuccess] = React.useState(false);

 const handleSuccess = () => setSuccess(!Success);
 const successok = () => {
   handleSuccess();
 };
 const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
console.log(rows);
  return (
    <>
     <div className='rounded-sm  bg-white dark:border-strokedark dark:bg-boxdark '>
     <Button onClick={() => handleOpen(1)} color='green' variant={open===1?"outlined":"filled"} className=' w-full flex justify-center align-middle gap-1'>{open===1?<ClearIcon  className='w-auto h-auto m-auto'/>:(
        <p>
     <AddCircleOutlineIcon className='w-auto h-auto'/>
        <span className='mt-1.5 ml-1'>Create Examination</span>
        </p>
      
     )} </Button>

     <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
    <AccordionBody>
        <p  className='text-graydark text-center mb-5 font-bold text-2xl'>Create Examination</p>
        <div style={{marginTop:'10px',width:'90%',margin:'auto'}}>

      <FormControl fullWidth >

        <InputLabel id="demo-simple-select-label">Select Examination</InputLabel>
        <Select
        {...register('exam_name')}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ExamType}
          label="Select Examination"
          onChange={handleChange}
        >
            {examtypes.map((el)=>(
          <MenuItem value={el}>{el}</MenuItem>

            ))}
        
        </Select>
        
        <br />


         </FormControl>
         <div style={{display:ExamType==="Other Examination"?"block":'none'}}>
          <Input variant="static" label="Other Examination" {...register('other_exam')}  color='blue' placeholder="Enter Examination Name" />

          </div>
          <br />
         <FormControl fullWidth >

        <InputLabel id="demo-simple-select-label">Select Session</InputLabel>
        <Select
        {...register('session')}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={SessionType}
          label="Select Examination"
          onChange={handleChangeSession}
        >
            {sessions.map((el)=>(
          <MenuItem value={el}>{el}</MenuItem>

            ))}
        
        </Select>
        
        


         </FormControl>
         



      <br />
    <br />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
       
            <div className='w-full '>
            <InputLabel htmlFor="outlined-adornment-password" style={{fontWeight:'700'}}>Start Date</InputLabel>
               
            <TextField style={{width:'100%'}} id="outlined-basic" {...register('start_date')} type='date'  />

            </div>
             <div className='w-full '>
             <InputLabel htmlFor="outlined-adornment-password" style={{fontWeight:'700'}}>End Date</InputLabel>

             <TextField style={{width:'100%'}}  id="outlined-basic" {...register('end_date')} type='date'  />

             </div>
         </div>
       <br />
         <Button color='green' onClick={handleSubmit(onSubmit)} className='w-full flex justify-center align-middle gap-1'> <AddCircleOutlineIcon className='w-auto h-auto'/> <span className='mt-1'>Create Examination</span> </Button>

    </div>
        </AccordionBody>
      </Accordion>
      
  
   </div>
   <div className='rounded-sm  bg-white dark:border-strokedark dark:bg-boxdark mt-3'>
   <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
            
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,background: '#2196f3', color: 'white'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row:any,i:number) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={i}>
                   <StyledTableCell>
                     {row.exam_name}
                   </StyledTableCell>
                   <StyledTableCell align='right'>
                     {row.start_date}
                   </StyledTableCell>
                   <StyledTableCell align='right'>
                     {row.end_date}
                   </StyledTableCell>
                   <StyledTableCell align='right'>
                     {row.session}
                   </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      
        
     
   </div>
   <Dialog size="sm" open={Success} handler={handleSuccess}>
        <DialogBody>
          <div className="w-[200px] m-auto">
            <Lottie animationData={success} loop={false} autoplay={true} />
          </div>
          <div className="m-auto grid grid-cols-1 gap-2">
            <p className="font-bold text-center text-2xl">
             Examination successfully Created
            </p>
            <Button
              className="m-auto"
              variant="gradient"
              color="green"
              onClick={successok}
            >
              <span>Ok</span>
            </Button>
          </div>
        </DialogBody>
      </Dialog>
      <ToastContainer></ToastContainer>
    </>
   
  )
}

// {columns.map((column) => {
//     const value = row[column.id];
//     return (
//       <TableCell key={column.id} align={column.align}>
//         {column.format && typeof value === 'number'
//           ? column.format(value)
//           : value}
//       </TableCell>
//     );
//   })}