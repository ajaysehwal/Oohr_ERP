import React, { useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import { Chip, Input } from '@material-tailwind/react';
import { Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useParams } from 'react-router-dom';
const url = String(import.meta.env.VITE_REACT_API_URL);

import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from 'axios';
import Cookies from 'universal-cookie';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Studentedit from './studentedit';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from '@material-tailwind/react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import EditNoteIcon from '@mui/icons-material/EditNote';
import IconButton from '@mui/material/IconButton';
const ExamReport = () => {
  interface Column {
    id: 'subject' | 'outof' | 'marks' | 'status' | 'grade';
    label: string;
    minWidth?: number;
    align?: string;
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: 'subject', label: 'Subject', minWidth: 110 },
    { id: 'outof', label: 'Total Marks', minWidth: 110 },
    {
      id: 'marks',
      label: 'Marks Obtained',
      minWidth: 110,
      align: 'center',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 110,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
  ];

  interface Data {
    subject: string;
    outof: string;
    marks: string;
    status: string;
  }

  function createData(
    subject: string,
    outof: string,
    marks: string,
    status: string,
  ): Data {
    return { subject, outof, marks, status };
  }
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const [marksdata, setmarksdata] = useState<any>({});
  interface RouteParams {
    id: string;
  }
  const { id } = useParams<RouteParams>();
  const [student_id, setstudent_id] = useState('');
  const [student_name, setstudentname] = useState('');
  const [load, setload] = useState(false);
  const getstudent = async (id: any) => {
    setload(true);
    try {
      const res = await axios.get(`${url}/studentdetails/${id}`);
      setstudent_id(res.data[0].student_school_side_code);
      setstudentname(res.data[0].student_name);
      setload(false);
    } catch (err) {
      setload(true);
      return err;
    }
  };
  useEffect(() => {
    getstudent(id);
  }, []);
  const successnotify = (text: string) =>
    toast.success(text, {
      position: 'bottom-center',
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
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const [totalmarks, settotalmarks] = useState('');
  const [marksstatus, setmarksstatus] = useState('');
  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  const [exam, setexam] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
     if(event.target.value===''){
      getmarksData(student_id, exam);
      setexam(exam)

     }else{
      setexam(event.target.value);
      getmarksData(student_id, event.target.value);

     }
  };
  const getmarksData = async (id: any, exam: any) => {
    try {
      const res = await axios.get(`${url}/student-marks-api/${id}/${exam}`);
      const R = res.data.response[res.data.response.length - 1];
      const Marksdata = JSON.parse(R.marksdata);
      const dataBetweenNameAndGrade: any = {};
      let isBetweenNameAndGrade = false;

      for (const key in Marksdata) {
        if (key === 'Total Marks') {
          isBetweenNameAndGrade = true;
          continue; // Skip "Student Name" itself
        }

        if (key === 'Status') {
          isBetweenNameAndGrade = false;
          break; // Stop when "Grade" is encountered
        }

        if (isBetweenNameAndGrade) {
          dataBetweenNameAndGrade[key] = Marksdata[key];
        }
      }
      setmarksdata(dataBetweenNameAndGrade);
      settotalmarks(Marksdata['Total Marks']);
      setmarksstatus(Marksdata['Status']);
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    getmarksData(student_id, exam);
  }, [student_id,exam]);


  const rows: Data[] = [];
  let totalmarkobtained = 0;
  let subjectcount = 0;
  for (let key in marksdata) {
    rows.push(createData(key, totalmarks, marksdata[key], marksstatus));
    totalmarkobtained += Number(marksdata[key]);
    subjectcount++;
  }

  let totalpercentage =
    Math.floor(
      (totalmarkobtained / (Number(totalmarks) * subjectcount)) * 100,
    ) || 0;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
    sendDataToBox();
  };
  const [updatemarks, setupdatemarks] = useState<Data[]>([]);
  const sendDataToBox = () => {
    setupdatemarks([...rows]);
  };
  const handleSubjectChange = (index: number, newValue: string) => {
    const updatedSubjectsData = [...updatemarks];
    updatedSubjectsData[index].subject = newValue;
    setupdatemarks(updatedSubjectsData);
  };

  const handleMarksChange = (index: number, newValue: any) => {
    const updatedSubjectsData = [...updatemarks];
    updatedSubjectsData[index].marks = newValue;
    setupdatemarks(updatedSubjectsData);
  };
  const UpdatePostMarks = async () => {
    const Data: any = {
      'Student ID': student_id,
      'Student Name': student_name,
      'Total Marks': Number(totalmarks),
    };
    updatemarks.forEach((subjectData) => {
      const subjectName = subjectData.subject;
      const marks = subjectData.marks;
      Data[subjectName] = marks;
    });
    Data.Status = 'Pass';
    const SendData = {
      marks: Data,
      exam:exam,
    };
    try {
      const res = await axios.put(
        `${url}/student-marks-api/${auth}/${student_id}`,
        SendData,
      );
      if (res.data.Response == true) {
        handleOpen();
        successnotify('Marks Successfully Updated');
        getmarksData(student_id, exam);
      } else {
        notify('Something went wrong please try again later');
      }
    } catch (err) {
      notify('Something went wrong please try again later');

      return err;
    }
  };
  const [AllExam, setAllExam] = useState([]);
  const GetAllExam = async () => {
    try {
      const res = await axios.get(`${url}/schoolexams/${auth}`);
      setAllExam(res.data.response);
      const R: any = res.data.response[res.data.response.length - 1];
      setexam(`${R.exam_name}-${R.session}`);
      getmarksData(student_id,exam);
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    GetAllExam();
  },[]);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        <div className="flex align-middle gap-1 justify-between">
            <div className='w-full'>
              <select
                value={exam}
                onChange={handleChange}
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select Examination</option>
                {AllExam.map((el: { exam_name: string; session: string }) => (
                  <option
                    value={`${el.exam_name}-${el.session}`}
                  >{`${el.exam_name} - ${el.session}`}</option>
                ))}
              </select>
            </div>
          

          <Tooltip content="Edit Marks">
            <Button onClick={handleOpen} variant="text">
              <EditNoteIcon style={{ width: '30px', height: '30px' }} />
            </Button>
          </Tooltip>
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 460 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        background: '#2196f3',
                        color: 'white',
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, i) => {
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={i}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                            >
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </StyledTableCell>
                          );
                        })}
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <div className="flex align-middle gap-5 justify-around w-full">
              <div className="">
                <p className="font-bold text-blue-900">Total Marks</p>
                <p className="font-semibold text-center">
                  {Number(totalmarks) * subjectcount}
                </p>
              </div>
              <div className="">
                <p className="font-bold text-blue-900">Total Marks Obtained</p>
                <p className="font-semibold text-center">{totalmarkobtained}</p>
              </div>
              <div className="">
                <p className="font-bold text-blue-900">Total Percent (%)</p>
                <p className="font-semibold text-center">{totalpercentage}%</p>
              </div>
            </div>
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
      <ToastContainer></ToastContainer>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="bg-blue-800 text-white">Update {exam} Marks</DialogHeader>
        <DialogBody>
          {updatemarks.map((el, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 m-auto"
            >
              <div className="mt-5">
                <Input
                  label="Subject"
                  value={el.subject}
                  onChange={(e) => handleSubjectChange(i, e.target.value)}
                />
              </div>
              <div className="mt-5">
                <Input
                  label="Obtained Marks"
                  value={el.marks}
                  onChange={(e) => handleMarksChange(i, Number(e.target.value))}
                />
              </div>
            </div>
          ))}
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
          <Button variant="gradient" color="green" onClick={UpdatePostMarks}>
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
const EditToolBar = () => {
  const cookies = new Cookies();
  const auth = cookies.get('_UID');

  interface RouteParams {
    id: string;
  }
  const { id } = useParams<RouteParams>();

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        <Studentedit id={id} />
      </div>
    </>
  );
};
const SettingToolBar = () => {
  return (
    <>
      <div>
        <p className="font-bold text-2xl text-green-500 text-center">
          Coming Soon...
        </p>
      </div>
    </>
  );
};

const HandleStudentToolbar = () => {
  const data = [
    {
      label: 'Exam Report',
      value: 'exam report',
      icon: Square3Stack3DIcon,
      desc: <ExamReport />,
    },
    {
      label: 'Edit Profile',
      value: 'profile',
      icon: PencilSquareIcon,
      desc: <EditToolBar />,
    },
    {
      label: 'Settings',
      value: 'settings',
      icon: Cog6ToothIcon,
      desc: <SettingToolBar />,
    },
  ];
  return (
    <>
      <Tabs value="exam report">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: 'w-5 h-5' })}
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
    </>
  );
};
export default function NewStudentDetail() {
  interface RouteParams {
    id: string;
  }
  const { id } = useParams<RouteParams>();

  const [data, setdata] = useState([]);
  const [load, setload] = useState(false);
  const coverttopdf = useRef();

  const getstudent = async (id: any) => {
    setload(true);
    try {
      const res = await axios.get(`${url}/studentdetails/${id}`);
      setdata(res.data);
      setload(false);
    } catch (err) {
      setload(true);
      return err;
    }
  };
  useEffect(() => {
    getstudent(id);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {data?.map((el: any) => (
            <div className="p-5 h-auto">
              <Avatar
                style={{ margin: 'auto' }}
                sx={{ width: 150, height: 150 }}
                variant="rounded"
                alt={el.student_name}
                src={`${url}/${el.student_image}`}
              />
              <p className="text-center font-bold text-2xl mt-3">
                {el.student_name}
              </p>
              <div className="flex align-middle justify-center gap-4">
                <Chip
                  className="w-[100px] text-center  p-2 rounded-full"
                  color="green"
                  value={el.select_class}
                />
                <Chip
                  className="w-[100px] text-center  p-2 rounded-full"
                  color="orange"
                  value={`#${el.student_school_side_code}`}
                />
              </div>
              {/* ---------------Details----------------------- */}
              <div>
                <p className=" text-blue-gray-700 font-semibold text-[20px] p-2 mt-5">
                  Details
                </p>
                <Divider />
                <br />
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex align-middle gap-3">
                    <p className="text-blue-gray-600 font-bold ">
                      Date of birth :
                    </p>
                    <p className="text-blue-500 font-bold">
                      {el.date_of_birth}
                    </p>
                  </div>
                  <div className="flex align-middle gap-3">
                    <p className="text-blue-gray-600 font-bold ">Gender :</p>
                    <p className="text-blue-500 font-bold">{el.gender}</p>
                  </div>
                  <div className="flex align-middle gap-3">
                    <p className="text-blue-gray-600 font-bold ">
                      Father Name :
                    </p>
                    <p className="text-blue-500 font-bold">{el.father_name}</p>
                  </div>
                  <div className="flex align-middle gap-3">
                    <p className="text-blue-gray-600 font-bold ">
                      Mother Name :
                    </p>
                    <p className="text-blue-500 font-bold">{el.mother_name}</p>
                  </div>
                  <div className="flex align-middle gap-3">
                    <p className="text-blue-gray-600 font-bold ">
                      Admission No:
                    </p>
                    <p className="text-blue-500 font-bold">{el.admission_no}</p>
                  </div>
                  <div className="flex align-middle gap-3">
                    <p className="text-blue-gray-600 font-bold ">Age :</p>
                    <p className="text-blue-500 font-bold">{el.age}</p>
                  </div>
                  <div className="flex align-middle gap-3">
                    <p className="text-blue-gray-600 font-bold ">Phone :</p>
                    <p className="text-blue-500 font-bold">{el.phone}</p>
                  </div>
                  <div className="flex align-middle gap-3">
                    <p className="text-blue-gray-600 font-bold ">
                      Parent Phone Number :
                    </p>
                    <p className="text-blue-500 font-bold">
                      {el.parents_phone}
                    </p>
                  </div>
                  <div className="flex align-middle gap-3">
                    <p className="text-blue-gray-600 font-bold ">Email :</p>
                    <p className="text-blue-500 font-bold">{el.email}</p>
                  </div>
                  <div className="flex align-middle gap-3">
                    <p className="text-blue-gray-600 font-bold ">Section :</p>
                    <p className="text-blue-500 font-bold">{el.section}</p>
                  </div>
                  <div className="flex align-middle gap-3">
                    <p className="text-blue-gray-600 font-bold ">House :</p>
                    <p className="text-blue-500 font-bold">{el.house}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2">
          <HandleStudentToolbar />
        </div>
      </div>
    </>
  );
}
