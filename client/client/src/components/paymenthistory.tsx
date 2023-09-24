import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import PrintIcon from '@mui/icons-material/Print';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "../styles/paymenthistory.css";
import FeeReceipt from './FeeReceipt';
import { Button, Spinner } from '@material-tailwind/react';
import { Chip } from "@mui/material";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';
interface Column {
  id: 'student_id' | 'student_name' | 'total_amount' | 'months' | 'date' | 'year' | 'status' | 'payment_method' | 'student_class'|'recipt';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
const url = String(import.meta.env.VITE_REACT_API_URL);
import Cookies from 'universal-cookie';

export default function Paymenthistory() {
  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  const columns: readonly Column[] = [
    {
      id: 'student_id',
      label: 'Student ID',
      minWidth: 170
    },

    {
      id: 'student_name',
      label: 'Student Name',
      minWidth: 170
    },

    {
      id: 'student_class',
      label: 'Class',
      minWidth: 170
    },

    {
      id: 'total_amount',
      label: 'Total Amount',
      minWidth: 170,


    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,

      format: (value: number) => value.toFixed(2),
    },

    {
      id: 'months',
      label: 'Month',
      minWidth: 170,

      format: (value: number) => value.toLocaleString('en-US'),
    },

    {
      id: 'date',
      label: 'Date',
      minWidth: 170,

      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'payment_method',
      label: 'Payment Method',
      minWidth: 170,

      format: (value: number) => value.toFixed(2),
    },
    {
      id: 'year',
      label: 'Year',
      minWidth: 170,

      format: (value: number) => value.toFixed(2),
    },
    {
      id: 'recipt',
      label: 'Download Receipt',
      minWidth: 170,

      format: (value: number) => value.toFixed(2),
    },


  ];

  interface Data {
    student_id: string,
    student_name: string;
    total_amount: string;
    months: string;
    date: string;
    payment_method: string;
    year: string;
    status: string,
    student_class: string;
    id: number;
    student_school_side_code:string;
  }
   const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [ClassFilterTerm, setClassFilteredTerm] = React.useState<string>('')
  const [finalsearchdata, setfinalsearchdata] = React.useState([]);
  const [finalfilterdata, setfinalfilterdata] = React.useState([]);
  const [paymenthistory, setpaymenthistory] = React.useState([]);
  const [paymenthistoryload, setpaymenthistoryload] = React.useState(false);
  const [reciptdata,setreciptdata]=React.useState([]);
  const getdata = async (school_id: any) => {
    setpaymenthistoryload(true);
    try {
      const res = await axios.get(`${url}/allpaymenthistory/${school_id}`);
      setpaymenthistory(res.data)
      setpaymenthistoryload(false);
      setfinalsearchdata(res.data);
      setfinalfilterdata(res.data);
    } catch (err) {
      setpaymenthistoryload(false);

      return err;
    }

  }
  const [amounts, setamounts] = React.useState([]);
  const [amountsload, setamountload] = React.useState(false);
  const getdataforamount = async (student_id: any) => {
    setamountload(true);
    try {
      const res = await axios.get(`${url}/paymentamount/${auth}/${student_id}`);
      setamounts(res.data)
      setamountload(false);
      setreciptdata(res.data);

    } catch (err) {
      setamountload(false);

      return err;
    }

  }
  React.useEffect(() => {
    getdata(auth)
  }, [auth])
  function createData(
    student_id: string,
    student_name: string,
    student_class: string,
    total_amount: string,
    months: string,
    date: string,
    payment_method: string,
    year: string,
    status: string,
    id: number,
    student_school_side_code:string,
  ): Data {
    return {
      student_id,
      student_name,
      student_class,
      total_amount,
      months,
      date,
      payment_method,
      year,
      status,
      id,
      student_school_side_code

    }
  }
 
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    if (searchValue === '') {
      setfinalsearchdata(paymenthistory);
      setClassFilteredTerm('')
    } else {
      if (ClassFilterTerm == '') {
        const filteredData = paymenthistory.filter((el: any) => el.student_name.toLowerCase().includes(searchValue));
        setfinalsearchdata(filteredData);
      } else {
        const filteredData = finalfilterdata.filter((el: any) => el.student_name.toLowerCase().includes(searchValue));
        setfinalsearchdata(filteredData);
      }

    }
  };
  const handleClassfilter = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value;
    setClassFilteredTerm(value);
    if (value === '') {
      setfinalsearchdata(paymenthistory);
    } else {
      const filteredData: any = finalfilterdata.filter((el: any) => el.student_class === value);
      setfinalfilterdata(filteredData);
      setfinalsearchdata(filteredData);

    }
  }
  const rows: any = [];
  finalsearchdata.map(
    ({
      student_id,
      student_name,
      student_class,
      total_amount,
      months,
      date,
      payment_method,
      year,
      status,
      id,
      student_school_side_code
    }: Data) =>
      rows.push(
        createData(
          student_id,
          student_name,
          student_class,
          total_amount,
          months,
          date,
          payment_method,
          year,
          status,
          id,
          student_school_side_code
        ),
      ),
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  const [openPopover, setOpenPopover] = React.useState(-1);
  const handlePopOpen = (id: any) => {
    setamounts([]);
    setOpenPopover(id)
    getdataforamount(id)
  }

  const [open, setOpen] = React.useState(false);
 
  const handleOpen = (id:any) =>{
    setOpen(!open);
    getdataforamount(id);
  }

  const coverttopdf: any = useRef();
  const generatepdf = useReactToPrint({
    content: () => coverttopdf.current,
    documentTitle: 'Fees Receipt',
  });
  
  return (
    <>
      <div className="rounded-sm  bg-white dark:border-strokedark dark:bg-boxdark p-3">
        <div className='w-[70%] flex align-middle gap-5 mb-2'>
          <div className='w-full' >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input value={searchTerm} onChange={handleSearch} type="search" id="default-search" className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Students..." required />
            </div>
          </div>
          <div className='w-full'>
            <select value={ClassFilterTerm} onChange={handleClassfilter} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="">Filter by Class</option>
              <option value="nursery">Nursery</option>
              <option value="pre_kg">Pre-Kindergarten</option>
              <option value="kg">Kindergarten</option>
              <option value="1st">1st Grade</option>
              <option value="2nd">2nd Grade</option>
              <option value="3rd">3rd Grade</option>
              <option value="4th">4th Grade</option>
              <option value="5th">5th Grade</option>
              <option value="6th">6th Grade</option>
              <option value="7th">7th Grade</option>
              <option value="8th">8th Grade</option>
              <option value="9th">9th Grade</option>
              <option value="10th">10th Grade</option>
              <option value="11th">11th Grade</option>
              <option value="12th">12th Grade</option>
            </select>
          </div>
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>

          <TableContainer sx={{ maxHeight: 550 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow  >

                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, background: '#2196f3', color: 'white' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    return (
                      <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <StyledTableCell >
                         #{row.student_school_side_code}
                        </StyledTableCell>
                        <StyledTableCell align='center' >
                          {row.student_name}
                        </StyledTableCell>
                        <StyledTableCell >
                          {row.student_class}
                        </StyledTableCell>

                        <StyledTableCell

                          style={{ cursor: 'pointer' }}  >
                          <Popover placement="bottom" open={openPopover==row.id} handler={()=>handlePopOpen(row.id)} >

                            <PopoverHandler   >
                              <Button  variant="text" color='green' className='text-1xl'>₹ {row.total_amount}</Button>
                            </PopoverHandler>



                            <PopoverContent onMouseLeave={()=>setOpenPopover(-1)} className="z-50 max-w-[45rem] w-[300px]">
                              {amountsload ? <Spinner color="blue" className='m-auto' /> : (
                                <table className="w-full min-w-max table-auto text-left">
                                  <thead>
                                    <tr>

                                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >
                                          Particulars
                                        </Typography>

                                      </th>
                                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70 text-center"
                                        >
                                          Amount
                                        </Typography>

                                      </th>

                                    </tr>
                                  </thead>
                                  <tbody>



                                    {amounts.map(({ tuition_amount }, index) => (
                                      <tr key={index} className='w-full bg-white'>

                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-normal">
                                            Tuition Amount
                                          </Typography>
                                        </td>
                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-normal">
                                            {tuition_amount}
                                          </Typography>
                                        </td>

                                      </tr>
                                    ))}
                                    {amounts.map(({ exam_amount }, index) => (
                                      <tr key={index} className='w-full bg-gray'>

                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-normal">
                                            Exam Amount
                                          </Typography>
                                        </td>
                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-normal">
                                            {exam_amount}
                                          </Typography>
                                        </td>

                                      </tr>
                                    ))}
                                    {amounts.map(({ transport_amount }, index) => (
                                      <tr key={index} className='w-full bg-white'>

                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-normal">
                                            Transport Amount
                                          </Typography>
                                        </td>
                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-normal">
                                            {transport_amount}
                                          </Typography>
                                        </td>
                                      </tr>
                                    ))}
                                    {amounts.map(({ sports_amount }, index) => (
                                      <tr key={index} className='w-full bg-gray'>

                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-normal">
                                            Sports Amount
                                          </Typography>
                                        </td>
                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-normal">
                                            {sports_amount}
                                          </Typography>
                                        </td>
                                      </tr>
                                    ))}
                                    {amounts.map(({ admission_amount }, index) => (
                                      <tr key={index} className='w-full bg-white'>

                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-normal">
                                            Admission Amount
                                          </Typography>
                                        </td>
                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-normal">
                                            {admission_amount}
                                          </Typography>
                                        </td>
                                      </tr>
                                    ))}
                                    {amounts.map(({ total_amount }, index) => (
                                      <tr key={index} className='w-full bg-gray'>

                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-bold">
                                            Total Amount Paid
                                          </Typography>
                                        </td>
                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-bold">
                                            {total_amount}
                                          </Typography>
                                        </td>
                                      </tr>
                                    ))}

                                    {amounts.map(({ remain_amount }, index) => (
                                      <tr key={index} className='w-full bg-white'>

                                        <td className="p-2">
                                          <Typography variant="small" color="blue-gray" className="font-normal">
                                            Balance
                                          </Typography>
                                        </td>
                                        <td className="p-2">
                                          <Typography variant="small" color="red" className="font-normal">
                                            {remain_amount}
                                          </Typography>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>


                              )}
                            </PopoverContent>

                          </Popover>



                        </StyledTableCell>
                        <StyledTableCell >

                          {row.status === '' ? (
                            <Chip color="error" label="Unpaid" />
                          ) : row.status == 'Balance Remain' ? (
                            <Chip color="warning" label="Balance Remain" />
                          ) : row.status === 'Balance Clear' ? (
                            <Chip color="success" label="Balance Clear" />
                          ) : (
                            'error'
                          )}
                        </StyledTableCell>
                        <StyledTableCell >
                          {row.months}
                        </StyledTableCell>

                        <StyledTableCell >
                          {row.date}
                        </StyledTableCell>
                        <StyledTableCell >
                          {row.payment_method}
                        </StyledTableCell>
                        <StyledTableCell >
                          {row.year}
                        </StyledTableCell>
                        <StyledTableCell >
                         <Button onClick={()=>handleOpen(row.id)} color='green' variant='text' className='text-1xl'>Download</Button>
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
      <Dialog
        open={open}
        size='lg'
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        {/* <DialogHeader></DialogHeader> */}
        <DialogBody className="h-[30rem] overflow-scroll p-5">
        {amountsload?(
             <Spinner className='w-15 h-15 m-auto' color='blue' />
        ):(
        <FeeReceipt data={reciptdata} covertpdf={coverttopdf}  />
        )}

        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={generatepdf}>
           <span>Print <PrintIcon /></span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

