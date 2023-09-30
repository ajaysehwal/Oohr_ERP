import React, { useState } from 'react';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Button, Spinner } from '@material-tailwind/react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Chip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { Dialog } from '@material-tailwind/react';
import Avatar from '@mui/material/Avatar';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import emptyfolder from './images/emptyfolder.png';

import Cookies from 'universal-cookie';
export default function Studentdetailtable() {
  
    
    
  const [active, setActive] = React.useState(1);
  const [data, setdata] = useState([]);
  const {
    register,
    handleSubmit,
  } = useForm();
  const [open0, setOpen0] = React.useState(false);
  
  const handleOpen0 = () => setOpen0(!open0);
  const [open, setOpen] = useState(1);
  const [newvalue, setnewvalue] = useState(1);
  const url = String(import.meta.env.VITE_REACT_API_URL);

  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  const coverttopdf = useRef();
  if (!auth) {
    return <Navigate to="/signin" />;
  }
  const [load, setload] = useState(false);
  const generatepdf = useReactToPrint({
    content: () => coverttopdf.current,
    documentTitle: 'Staff Members',
  });
  const [finaldata, setfinaldata] = useState([]);
  const [btnload, setbtnload] = useState(false);
  const getstudentdata = async (token: any, classes: any, section: any) => {
    setbtnload(true);
    try {
      const res = await axios.get(
        `${url}/studentsdata/${classes}/${section}/${token}`,
      );
      if (res.data.length === 0) {
        handleOpen0();
        setbtnload(false);
      } else {
        setdata(res.data);
        setbtnload(false);

        setfinaldata(res.data);
      }
    } catch (err) {
      setbtnload(false);

      return err;
    }
  };

  const [filterval, setfilterval] = useState('');
  const searchbarchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setdata(finaldata);
    } else {
      const filtered = data.filter((el:any) =>
        el.student_name.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      setdata(filtered);
    }
    setfilterval(e.target.value);
  };

  const [classes, setgetclasses] = useState([]);
  const [section, setsection] = useState([]);

  const getclasses = async (token: any) => {
    setload(true);
    try {
      const res = await axios.get(`${url}/studentclasses/${token}`);
      setgetclasses(res.data);

      setload(false);
    } catch (err) {
      setload(true);
      return err
    }
  };
  const getsectionbyclass = async (value: any, verified_token: any) => {
    try {
      const res = await axios.get(
        `${url}/studentsection/${value}/${verified_token}`,
      );
      setsection(res.data);
    } catch (err) {
      return err
    }
  };
  useEffect(() => {
    getclasses(auth);
  }, []);
  const onSubmit = (data: any) => {
    if (data.class == '' && data.section == '') {
      handleOpen0();
      setdata([]);
    } else {
      setdata([]);

      getstudentdata(auth, data.class, data.section);
    }
  };
 

  
  
  
  interface Column {
    id:
    | 'photo'
    | 'name'
    | 'class'
    | 'section'
    | 'father Name'
    | 'phone'|'studentid';
   
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: 'studentid', label: 'Student ID', minWidth: 170 },

    { id: 'photo', label: 'Photo', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 100 },
    {
      id: 'class',
      label: 'Class',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'section',
      label: 'Section',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'father Name',
      label: 'Father Name',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
    {
      id: 'phone',
      label: 'Phone',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
   
  ];

  interface Data {
    student_image: string;
    student_name: string;
    select_class: string;
    section: string;
    father_name: string;
    phone: string;
    student_code: string;
    student_school_side_code:string;
  }

  function createData(
    student_school_side_code:string,

    student_image: string,
    student_name: string,
    select_class: string,
    section: string,
    father_name: string,
    phone: string,
    student_code: string,

  ): Data {
    return {
      student_school_side_code,
       student_image,
      student_name,
      select_class,
      section,
      father_name,
      phone,
      student_code,
    };
  }
  
  const rows: any = [];
  data.map(
    ({
      student_school_side_code,
      student_image,
      student_name,
      select_class,
      section,
      father_name,
      phone,
      student_code,
    }: Data) =>
      rows.push(
        createData(
          student_school_side_code,
          student_image,
          student_name,
          select_class,
          section,
          father_name,
          phone,
          student_code,
        ),
      ),
  );

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
  
  return (
    <div>
      <div
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        style={{
          width: '100%',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifySelf: 'center',
          gap: '10px',
          padding: '20px',
        }}
        data-aos="fade-down"
      >
        <select
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          {...register('class', {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              getsectionbyclass(e.target.value, auth);
            },
          })}
        >
          <option value="">Select Class</option>

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
        <select
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          color="teal"
          {...register('section')}
        >
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          {section?.map((el:{section:any}) => (
            <option value={el.section}>{el.section}</option>
          ))}
        </select>
        <button
          onClick={handleSubmit(onSubmit)}
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          {btnload ? (
            <Spinner style={{ margin: 'auto' }} />
          ) : (
            <p style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              Get
              <svg
                className="h-4 w-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {' '}
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="10" cy="10" r="7" />
                <line x1="7" y1="10" x2="13" y2="10" />
                <line x1="10" y1="7" x2="10" y2="13" />{' '}
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </p>
          )}
        </button>
      </div>

      <div
        data-aos="fade-up"
        style={{ marginTop: '10px' }}
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
        <div
          style={{
            width: '60%',
            marginBottom: '5px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="text-gray-500 dark:text-gray-400 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              value={filterval}
              onInput={(e:any) => searchbarchange(e)}
              type="text"
              id="simple-search"
              className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border p-2 pl-10 text-sm dark:text-white"
              placeholder="Search student by name"
            />
          </div>

          <Chip onClick={generatepdf} icon={<PrintIcon />} label="Print" />
        </div>
     <Paper ref={coverttopdf}  sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer   sx={{ maxHeight: 440 }}>
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
              {rows.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '20px',
                       right:'1%',
                      width:'100%',
                      position:'absolute',
                    }}
                  >
                    <img
                      style={{ width: '130px', margin: 'auto' }}
                      src={emptyfolder}
                      alt=""
                    />
                    <p
                      className="text-2xl font-bold"
                      style={{ textAlign: 'center', margin: 'auto' }}
                    >
                     Student Not Found
                    </p>
                    <p style={{ textAlign: 'center', margin: 'auto' }}>
                      Select Classes to view Students.
                    </p>
                  </div>
                ) :(
              <TableBody>
             
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      return (
                         <StyledTableRow
                          hover
                           id='tablerow'
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          style={{cursor:'pointer'}}
                        >
                          <StyledTableCell>
                          <Chip label={`#${row.student_school_side_code}`} color="success" />

                          </StyledTableCell>
                          <StyledTableCell>
                        <Link to={`/students/detailtable/${row.student_code}`}>
                        <Avatar
                              sx={{ width: 80, height: 80 }}
                              alt={row.student_name}
                              variant="rounded"
                              src={`${url}/${row.student_image}`}
                            />
                        </Link>
                            
                          </StyledTableCell>
                          <StyledTableCell style={{fontWeight:'700'}}>{row.student_name}</StyledTableCell>
                          <StyledTableCell align="right">
                            {row.select_class}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.section}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.father_name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.phone}
                          </StyledTableCell>

                          {/* <StyledTableCell align="right" style={{ gap: '3px' }}>
                            <Tooltip title="View">
                              <IconButton     onClick={() => handleOpensingle(row.student_code)}>
                                <RemoveRedEyeIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton    onClick={() => edithandleOpen(row.student_code)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell> */}
                        </StyledTableRow>
                         
                      
                      )
                    })}
              </TableBody>
              )}
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
    {/* <Dialog
        size="xl"
        open={opensingle}
        handler={handleOpensingle}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="overflow-scroll"
      >
        {singleload ? (
          <Spinner className="w-10 h-10" style={{ margin: 'auto' }} />
        ) : (
          singlestudent?.map((el: any) => (
            <div style={{ padding: '20px' }}>
              <DialogHeader className="justify-between">
                <Avatar
                  style={{ margin: 'auto' }}
                  sx={{ width: 150, height: 150 }}
                  alt={el.name}
                  src={`${url}/${el.student_image}`}
                />

                <IconButton
                  onClick={closesingle}

                  style={{ marginTop: '-100px' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </IconButton>
              </DialogHeader>
              <DialogBody className="h-[30rem] overflow-scroll">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Student Name</h3>
                    {el.student_name}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Date of birth</h3>
                    {el.date_of_birth}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Father name</h3>
                    {el.father_name}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Mother name</h3>
                    {el.mother_name}
                  </div>

                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Admission no</h3>
                    {el.admission_no}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Full address</h3>
                    {el.address}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Age</h3>
                    {el.age}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Phone</h3>
                    {el.phone}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Other Contact</h3>
                    {el.parents_phone}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Religion</h3>
                    {el.religion}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">City</h3>
                    {el.city}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Previous school name</h3>
                    {el.previous_school_name}
                  </div>

                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Email</h3>
                    {el.email}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Transfer Certificate</h3>
                    {el.transfer_certificate}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Physical handicap</h3>
                    {el.physical_handicap}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">House</h3>
                    {el.house}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Category</h3>
                    {el.student_category}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Class</h3>
                    {el.select_class}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Section</h3>
                    {el.section}
                  </div>

                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">State</h3>
                    {el.state}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Blood group</h3>
                    {el.blood_group}
                  </div>

                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">Identity Document</h3>
                    {el.birth_certificate}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <h3 className="text-1xl font-bold">student document</h3>
                    <a href={`${url}/${el.student_document}`}>Click here</a>
                  </div>
                </div>
              </DialogBody>
            </div>
          ))
        )}
      </Dialog> */}
      <Dialog
        size="sm"
        open={open0}
        handler={handleOpen0}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        style={{
          textAlign: 'center',
          margin: 'auto',
          display: 'grid',
          alignItems: 'center',
          width: '200px',
          padding: '20px',
        }}
      >
        <div>
          <h1 className="text-3xl font-bold">Error Message</h1>
          <p>Student not found</p>
          <Button
            style={{ width: '100px', margin: '10px' }}
            variant="gradient"
            color="green"
            onClick={handleOpen0}
          >
            <span>Ok</span>
          </Button>
        </div>
      </Dialog> 
      {/* <Dialog open={editopen} handler={edithandleOpen} size="xl">
        <DialogHeader style={{ textAlign: 'center', margin: 'auto' }}>
          <img
            style={{ width: '200px', height: '150px', margin: 'auto' }}
            className="rounded-full object-cover object-center"
            src={`${url}/${studentimg}`}
            alt="student img"
          />
        </DialogHeader> */}
        {/* <DialogBody className="h-[30rem] overflow-scroll">
          {singleload ? (
            <Spinner style={{ margin: 'auto' }} className="w-10 h-10" />
          ) : (
            <Studentedit
              data={[
                upadatedstudent,
                singleload,
               ]}
            />
          )}
        </DialogBody> */}
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={edithandleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={edithandleOpen}>
            <span>Save</span>
          </Button>
        </DialogFooter> */}
      {/* </Dialog> */}
    </div>
  );
}
