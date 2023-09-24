import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { useForm, Resolver } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import { Input } from "@material-tailwind/react";
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import PaymentIcon from '@mui/icons-material/Payment';
import Switch from '@mui/material/Switch';
import EastIcon from '@mui/icons-material/East';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import Select from 'react-select';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Cookies from 'universal-cookie';
import { Button } from '@material-tailwind/react';
import Lottie from 'lottie-react';

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from '@material-tailwind/react';
const url = String(import.meta.env.VITE_REACT_API_URL);
import { Chip } from '@mui/material';

interface Data {
  admission_no: string;
  student_name: string;
  father_name: string;
  mother_name: string;
  student_class: string;
  section: string;
  phone: string;
  student_id: string;
  payment_status: string;
  view_history: string;
  student_school_side_code:string;
}

function createData(
  admission_no: string,
  student_name: string,
  father_name: string,
  mother_name: string,
  student_class: string,
  section: string,
  phone: string,
  student_id: string,
  payment_status: string,
  view_history: string,
  student_school_side_code:string,

): Data {
  return {
    admission_no,
    student_name,
    father_name,
    mother_name,
    student_class,
    section,
    phone,
    student_id,
    payment_status,
    view_history,
    student_school_side_code,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
//   function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
//     const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//     stabilizedThis.sort((a, b) => {
//       const order = comparator(a[0], b[0]);
//       if (order !== 0) {
//         return order;
//       }
//       return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
//   }

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'admission_no',
    numeric: false,
    disablePadding: true,
    label: 'Student ID',
  },
  {
    id: 'student_name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'father_name',
    numeric: true,
    disablePadding: false,
    label: 'Father Name',
  },
  {
    id: 'mother_name',
    numeric: true,
    disablePadding: false,
    label: 'Mother Name',
  },
  {
    id: 'student_class',
    numeric: true,
    disablePadding: false,
    label: 'Class',
  },
  {
    id: 'section',
    numeric: false,
    disablePadding: false,
    label: 'Section',
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone No.',
  },
  {
    id: 'payment_status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'view_history',
    numeric: true,
    disablePadding: false,
    label: 'View History',
  },

];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead >
      <TableRow >
        <TableCell padding="checkbox" style={{background:'#2196f3',color:'white'}}></TableCell>
        {headCells.map((headCell) => (
          <TableCell
          style={{background:'#2196f3',color:'white'}}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

import Menu from '@mui/material/Menu';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import writinganimation from "./animations/writing.json";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from '@mui/icons-material/Search';
interface EnhancedTableToolbarProps {
  numSelected: number;
  selecteddata: any;
  updatetable: any;
  successBox: any;
  selectstatus: any;
  searchTerm: any;
  handleSearch: any;
  ClassFilterTerm: any;
  handleClassfilter: any;
}
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const coverttopdf: any = useRef();
  const generatepdf = useReactToPrint({
    content: () => coverttopdf.current,
    documentTitle: 'Fees Receipt',
  });
  const { numSelected, selecteddata, updatetable, successBox, selectstatus, searchTerm, handleSearch, handleClassfilter, ClassFilterTerm } = props;
  const [open, setOpen] = React.useState(false);
  const PaymenthandleOpen = () => setOpen(!open);
  const feesType = [
    'Tuition Fee',
    'Admission Fee',
    'Exam Fee',
    'Sports Fee',
    'Transport Fee',
  ];
  console.log(selecteddata)

  const monthsArray = [
    {
      value: 1,
      label: 'January',
    },
    {
      value: 2,
      label: 'February',
    },
    {
      value: 3,
      label: 'March',
    },
    {
      value: 4,
      label: 'April',
    },
    {
      value: 5,
      label: 'May',
    },
    {
      value: 6,
      label: 'June',
    },
    {
      value: 6,
      label: 'July',
    },
    {
      value: 6,
      label: 'August',
    },
    {
      value: 6,
      label: 'September',
    },
    {
      value: 6,
      label: 'October',
    },
    {
      value: 6,
      label: 'November',
    },
    {
      value: 6,
      label: 'December',
    },
  ];
  const cookies = new Cookies();
  const auth = cookies.get('_UID');

  const paymentstatus = ['Balance Remain', 'Balance Clear'];
  const paymentmethods = ['Cash Payment', 'Cheque Payment', 'Online Payment'];

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const setHandle = (e: any) => {
    setSelectedOptions(Array.isArray(e) ? e.map((el) => el.label) : []);
  };

  // Function to generate a random 4-digit token
  const generateRandomToken = () => {
    const min = 1000;
    const max = 9999;
    const randomToken = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomToken;

  };
  const currentYear = new Date().getFullYear();

  const { register, handleSubmit, reset } = useForm();
  //  ----------------- Main form -----------------------
  const onSubmit = (data: any) => {
   const token=generateRandomToken();

    let months: string = '';
    for (let i = 0; i <= selectedOptions.length - 1; i++) {
      months += selectedOptions[i] + ',';
    }
    data.months = months;
    data.monthsArray = selectedOptions;
    data.student_name = selecteddata[0].student_name;
    data.student_class = selecteddata[0].student_class;
    data.father_name = selecteddata[0].father_name;
    data.student_school_side_code=selecteddata[0].student_school_side_code;
    const studentData = selecteddata[0];
    const student_id = studentData.student_id;
    const currentDate = new Date();

  const options:object = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const formattedDate = currentDate.toLocaleString('en-US', options);
  data.reciept_no = token;

  data.date=formattedDate;
    if (data.tuition_amount === '') {
      notify('Please enter fees amount');
    } else {
      if (data.status === '') {
        notify('Please update payment status');
      } else {
        if (selectedOptions.length === 0) {
          notify('Please add fees payment months');
        } else {
          if (data.method === '') {
            notify('Please select method of payment');
          } else {
            
            if (data.months.endsWith(',')) {
              data.months = data.months.slice(0, -1);
            }
            HandlePostPayment(data, auth, student_id, reset);
          }
        }
      }
    }
  };
  const [opneotherfeetype, setopneotherfeetype] = React.useState(0);
  const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };
  const handleOpen = (value: any) =>
    setopneotherfeetype(opneotherfeetype === value ? 0 : value);
  const [status, setstatus] = React.useState('');
  const [reciptdata, setrecipt] = useState([]);
  const [remainchange, setremainchange] = React.useState('');
  const HandlePostPayment = async (
    data: object,
    school_id: any,
    student_id: any,
    reset: any,
  ) => {
    try {
      const response = await axios.put(
        `${url}/feeapi/${school_id}/${student_id}`,
        data,
      );
      if (response.data.Response === 'Updated') {

        setrecipt([data]);
        reset();
        setremainchange('');
        PaymenthandleOpen();
        setTimeout(() => {
          successBox();
        }, 500);
        setTimeout(() => {
          successBox();
          handlewriting(true);
        }, 3000)

        setTimeout(() => {
          handlewritingclose();
          if (!writing) {
            handleRecipt();
          }

        }, 7000)
        updatetable(school_id);

      } else {
        notify('Something went wrong please try again later');
      }
    } catch (err) {
      return err;
    }
  };
  const [Recipt, setRecipt] = React.useState(false);

  const handleRecipt = () => setRecipt(!Recipt);
  const [laststatus, setlaststatus] = React.useState(false);

  const handlelaststatus = () => setlaststatus(!laststatus);
  const handleotherfee = (data: any) => {
    const currentDate = new Date();

    const currentMonth = currentDate.getMonth();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentMonthName = monthNames[currentMonth];
    const studentData = selecteddata[0];
    const student_id = studentData.student_id;
    data.otherfeemonth = currentMonthName;
    postotherfee(data, auth, student_id, reset);

  }
  const postotherfee = async (data: any, school_id: any, student_id: any, reset: any) => {
    try {
      const response = await axios.post(`${url}/otherfeeapi/${school_id}/${student_id}`, data);
      if (response.data.Response === 'Updated') {

        handlewritingclose();
        setTimeout(() => {
          successBox();
        }, 500);
      }
    } catch (err) {
      return err;
    }
  }
  const [writing, setwriting] = React.useState(false);

  const handlewriting = (value: boolean) => {
    setwriting(value)
  }
  const handlewritingclose = () => {
    setwriting(false)
  }

  return (
    <>
      {/* ---------- Fee Receipt ----------- */}
      <Dialog
        open={Recipt}
        size="lg"
        handler={handleRecipt}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        {/* <DialogHeader></DialogHeader> */}
        <DialogBody className="h-[30rem] overflow-scroll p-5">
          <FeeReceipt data={reciptdata} covertpdf={coverttopdf} />
        </DialogBody>
        <DialogFooter>

          <Button variant="gradient" color="green" onClick={generatepdf}>
            <span>Print <PrintIcon /></span>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* ----------- Payment Box ------------ */}
      <Dialog size="lg" open={open} handler={PaymenthandleOpen}>
        <ToastContainer></ToastContainer>

        <DialogHeader className="bg-blue-800 text-white">
          {selecteddata.map((el: any) => (
            <div>
              {el.section === '' ? (
                <p>
                  {el.student_name}-{el.student_class} Payment{' '}
                </p>
              ) : (
                <p>
                  {' '}
                  {el.student_name}-{el.student_class} ({el.section}) Payment{' '}
                </p>
              )}
            </div>
          ))}
        </DialogHeader>
        <DialogBody className="h-[30rem] overflow-scroll p-5">
          <form method="post" id="paymentform">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tuition Fees
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <CurrencyRupeeIcon />
                </div>
                <input
                  {...register('tuition_amount')}
                  type="number"
                  id="email-address-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Amount"
                />
              </div>
            </div>
            <div className="ml-auto flex align-middle justify-end w-40">
              <Chip
                onClick={() => handleOpen(1)}
                label="Other fees types"
                color="info"
                icon={
                  opneotherfeetype === 1 ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
              />
            </div>
            <Accordion
              className="m-auto"
              open={opneotherfeetype === 1}
              animate={CUSTOM_ANIMATION}
            >
              <AccordionBody>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Exam fees
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <CurrencyRupeeIcon />
                    </div>
                    <input
                      {...register('exam_amount')}
                      type="number"
                      id="email-address-icon"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Amount"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Admission fees
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <CurrencyRupeeIcon />
                    </div>
                    <input
                      {...register('admission_amount')}
                      type="number"
                      id="email-address-icon"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Amount"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Transport fees
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <CurrencyRupeeIcon />
                    </div>
                    <input
                      {...register('transport_amount')}
                      type="number"
                      id="email-address-icon"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Amount"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Sports fees
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <CurrencyRupeeIcon />
                    </div>
                    <input
                      {...register('sports_amount')}
                      type="number"
                      id="email-address-icon"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Amount"
                    />
                  </div>
                </div>
              </AccordionBody>
            </Accordion>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Current Year
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <CalendarMonthIcon />
                </div>
                <input
                  {...register('year')}
                  type="text"
                  value={currentYear}
                  id="email-address-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Months
              </label>
              <Select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                options={monthsArray}
                onChange={setHandle}
                isMulti={true}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select fees status
              </label>
              <select
                {...register('status', {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setstatus(e.target.value);
                    status === '' ? setremainchange('') : '';
                    status === 'Balance Clear' ? setremainchange('') : '';
                  },
                })}
                id="months"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select</option>
                {paymentstatus.map((el) => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </div>
            <div
              className="mb-5"
              style={{ display: status == 'Balance Remain' ? 'block' : 'none' }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Remain Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <CurrencyRupeeIcon />
                </div>
                <input
                  {...register('remain_amount', {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      setremainchange(e.target.value);
                    },
                  })}
                  type="number"
                  value={remainchange}
                  id="email-address-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Amount"
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Payment Method
              </label>
              <select
                {...register('method')}
                id="months"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select</option>
                {paymentmethods.map((el) => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={PaymenthandleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="gradient"
            color="green"
            type="submit"
          >
            <span>Paid</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Toolbar
        className='flex w-full justify-between'
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Student selected
          </Typography>
        ) : (
          <div className='flex align-middle w-[60%] gap-5'>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input value={searchTerm} onChange={handleSearch} type="search" id="default-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Students..." required />
            </div>
            <select value={ClassFilterTerm} onChange={handleClassfilter} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value=''>filter by Class</option>
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


        )}
        {numSelected > 0 ? (
          <Tooltip title="Next">
            <IconButton onClick={selectstatus === "Balance Clear" ? handlelaststatus : PaymenthandleOpen}>
              <EastIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      {/* ------------ Extra Fees-------------- */}
      <Dialog

        open={laststatus}
        handler={handlelaststatus}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="bg-blue-800 text-white">Extra Fee Chargers</DialogHeader>
        <DialogBody divider>
          <Input {...register('feereason')} label='Enter Reason for this fees' color='blue' />
          <br />
          <Input {...register('amountpaid')} label='Enter Total Amount' color='blue' />
          <br />

        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handlelaststatus}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit(handleotherfee)}>
            <span>Paid</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* ------------------ Printing Loading ------------------ */}
      <Dialog size='sm' className='bg-white' open={writing} handler={() => handlewriting(true)}>
        <DialogBody className='bg-transparent'>
          <div style={{ width: '50%', margin: 'auto' }}>
            <Lottie animationData={writinganimation} loop={true} autoplay={true} />

          </div>

          <p className='font-bold text-center text-[20px]'>Please Wait Generating Fees Receipt ...</p>
        </DialogBody>
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handlewriting}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handlewriting}>
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
}
import success from './animations/animation_lmg0sv1v.json';
import FeeReceipt from './FeeReceipt';

export default function ManageFees() {
  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  const [feedata, setfeedata] = React.useState([]);
  const [feedataload, setfeedataload] = React.useState(false);
  const [finalsearchdata, setfinalsearchdata] = useState([]);
  const [finalfilterdata, setfinalfilterdata] = useState([]);
  const getdata = async (school_id: any) => {
    setfeedataload(true);
    try {
      const res = await axios.get(`${url}/feesapi/${school_id}`);
      setfeedata(res.data);
      setfinalsearchdata(res.data);
      setfinalfilterdata(res.data);
      setfeedataload(false);
    } catch (err) {
      setfeedataload(false);

      return err;
    }
  };
  useEffect(() => {
    getdata(auth);
  }, [auth]);
  const rows: any = [];
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [ClassFilterTerm, setClassFilteredTerm] = useState<string>('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    if (searchValue === '') {
      setfinalsearchdata(feedata);
      setClassFilteredTerm('')
    } else {
      if (ClassFilterTerm == '') {
        const filteredData = feedata.filter((el: any) => el.student_name.toLowerCase().includes(searchValue));
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
      setfinalsearchdata(feedata);
    } else {
      const filteredData: any = finalfilterdata.filter((el: any) => el.student_class === value);
      setfinalfilterdata(filteredData);
      setfinalsearchdata(filteredData);

    }
  }
  finalsearchdata.map(
    ({
      admission_no,
      student_name,
      father_name,
      mother_name,
      student_class,
      section,
      phone,
      student_id,
      payment_status,
      student_school_side_code,
    }: Data) =>
      rows.push(
        createData(
          admission_no,
          student_name,
          father_name,
          mother_name,
          student_class,
          section,
          phone,
          student_id,
          payment_status,
          "View_history",
          student_school_side_code,
        ),
      ),
  );

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('student_name');
  // const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [selectid, setselectid] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [selectedRows, setSelectedRows] = React.useState('');
  const [selectstatus, setselectedstatus] = useState('');
  const isSelected = (studentId: any) => selectedRows.includes(studentId);

  const handleRowClick = (event: React.MouseEvent<unknown>, studentId: any) => {
    if (selectedRows == studentId) {
      setSelectedRows('');
      setselectid([]);
    } else {
      setSelectedRows(studentId);
      const paymentdata = rows.filter((el: any) => el.student_id == studentId);
      setselectid(paymentdata);
      setselectedstatus(paymentdata[0].payment_status);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const successok = () => {
    handleOpen();
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const PaymentHistoryopen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, student_id: any) => {
    setAnchorEl(event.currentTarget);
    setpaymenthistory([]);
    getpaymenthistory(student_id)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [paymenthistoryload, setpaymenthistoryload] = useState(false);
  const [paymenthistory, setpaymenthistory] = useState([]);
  const getpaymenthistory = async (student_id: any) => {
    setpaymenthistoryload(true);
    try {
      const res = await axios.get(`${url}/paymenthistory_api/${auth}/${student_id}`);
      setpaymenthistory(res.data);
    } catch (err) {
      setpaymenthistoryload(false);
      return err;
    }
  }
  return (
    <>

      {/* ----------- Success Box --------------------- */}
      <Dialog size="sm" open={open} handler={handleOpen}>
        <DialogBody>
          <div className="w-[200px] m-auto">
            <Lottie animationData={success} loop={false} autoplay={true} />
          </div>
          <div className="m-auto grid grid-cols-1 gap-2">
            <p className="font-bold text-center text-2xl">
              Payment successfully updated
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
      {/* ------------------ main page ----------------------- */}
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selectid.length}
            selecteddata={selectid}
            updatetable={getdata}
            successBox={handleOpen}
            selectstatus={selectstatus}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            ClassFilterTerm={ClassFilterTerm}
            handleClassfilter={handleClassfilter}

          />
          <TableContainer>
            <Table
              stickyHeader aria-label="sticky table"
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {feedataload ? (
                  <Spinner className="ml-[50%] w-10 h-10" color="blue" />
                ) : (
                  rows.map((row: any, index: number) => {
                    const isItemSelected = isSelected(row.student_id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleRowClick(event, row.student_id)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.student_id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                        className="even:bg-blue-gray-50/50"
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          #{row.student_school_side_code}
                        </TableCell>
                        <TableCell align="right">{row.student_name}</TableCell>
                        <TableCell align="right">{row.father_name}</TableCell>
                        <TableCell align="right">{row.mother_name}</TableCell>
                        <TableCell align="right">{row.student_class}</TableCell>
                        <TableCell align="right">{row.section}</TableCell>
                        <TableCell align="right">{row.phone}</TableCell>
                        <TableCell align="right">
                          {row.payment_status === '' ? (
                            <Chip color="error" label="Unpaid" />
                          ) : row.payment_status == 'Balance Remain' ? (
                            <Chip color="warning" label="Balance Remain" />
                          ) : row.payment_status === 'Balance Clear' ? (
                            <Chip color="success" label="Balance Clear" />
                          ) : (
                            'error'
                          )}
                        </TableCell>
                        <TableCell aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={PaymentHistoryopen ? 'true' : undefined}
                           align="right">

<Button   onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e, row.student_id)} variant='text' color='blue'>View</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={PaymentHistoryopen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
         <div className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
          
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
               
                
                  className="font-normal leading-none opacity-70"
                >
                ID
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
               
                
                  className="font-normal leading-none opacity-70"
                >
                Date
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
               
                
                  className="font-normal leading-none opacity-70"
                >
              Total Amount Paid
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
               
                
                  className="font-normal leading-none opacity-70"
                >
                Month
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
               
                
                  className="font-normal leading-none opacity-70"
                >
                status
                </Typography>
              </th>
          
          </tr>
        </thead>
        <tbody>
          {paymenthistory.map(({ student_id, date,total_amount,months,status,student_school_side_code}, i) => (
            <tr key={student_id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography   className="font-normal">
                  #{student_school_side_code}
                </Typography>
              </td>
              <td className="p-4">
                <Typography   className="font-normal">
                  {date}
                </Typography>
              </td>
              <td className="p-4">
                <Typography   className="font-normal">
                  {total_amount}
                </Typography>
              </td>
              <td className="p-4">
                <Typography  className="font-medium">
                  {months}
                </Typography>
              </td>
              <td className="p-4">
                <Typography  className="font-medium">
               
                  {status === '' ? (
                            <Chip color="error" label="Unpaid" />
                          ) : status == 'Balance Remain' ? (
                            <Chip color="warning" label="Balance Remain" />
                          ) : status === 'Balance Clear' ? (
                            <Chip color="success" label="Balance Clear" />
                          ) : (
                            'error'
                          )}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='text-center absolute cursor-pointer flex justify-center m-auto p-1 bg-blue-500 w-[100%] text-white hover:bg-white hover:text-blue-500 duration-5'>View All</p>

    </div>
      </Menu>
    </>
  );
}
