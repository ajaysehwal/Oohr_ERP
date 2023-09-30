import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import success from './animations/animation_lmg0sv1v.json';
import Test from './test';
const url = String(import.meta.env.VITE_REACT_API_URL);
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Spinner, Dialog, DialogBody } from '@material-tailwind/react';
import Lottie from 'lottie-react';
import Headcomponent from './headcomponent';
import { ToastContainer, toast } from 'react-toastify';

export default function UploadStudentMarks() {
  const [FileNameURL, setFileNameURL] = useState('');

  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile1(event.target.files[0]);
    }
  };

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
  const [student_class, setstudent_class] = React.useState('');

  const handleChangeClass = (event: SelectChangeEvent) => {
    setstudent_class(event.target.value as string);
  };

  const [examname, setexamname] = React.useState('');

  const handleChangeExam = (event: SelectChangeEvent) => {
    setexamname(event.target.value as string);
  };

  const [examdata, setexamdata] = useState([]);
  const [examdataload, setexamdataload] = useState(false);
  const GetExamData = async () => {
    setexamdataload(true);
    try {
      const res = await axios.get(`${url}/schoolexams/${auth}`);
      setexamdataload(false);

      setexamdata(res.data.response);
    } catch (err) {
      return err;
      setexamdataload(false);
    }
  };
  useEffect(() => {
    GetExamData();
  }, []);

  const HandlePostData = async () => {
    const formdata = new FormData();
    setbtnload(true);

    if (selectedFile1) {
      formdata.append('student_class', student_class);
      formdata.append('exam_name', examname);
      formdata.append('file', selectedFile1);
      formdata.append('school_id', auth);
      if (student_class === '') {
        setbtnload(false);

        notify('Please select a student class');
      } else {
        if (examname === '') {
          setbtnload(false);

          notify('Please select a exam name');
        } else {
          setbtnload(true);

          postdata(formdata);
        }
      }
    } else {
      setbtnload(false);

      notify('Please Upload Excel Sheet');
    }
  };

  const [btnload, setbtnload] = useState(false);

  const postdata = async (data: any) => {
    setbtnload(true);

    try {
      const res = await axios.post(`${url}/student-marks-api`, data);
      console.log(res.data);
      if (res.data.response == true) {
        successok();
        setbtnload(false);

        setexamname('');
        setSelectedFile1(null);
        setstudent_class('');
      } else {
        setbtnload(false);

        notify('Something went wrong please try again');
      }
    } catch (err) {
      setbtnload(false);
      console.log(err);
      notify('Something went wrong please try again');

      return err;
    }
  };

  const successok = () => {
    handleOpen();
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark pb-3">
        <Headcomponent heading={'Upload Student Marks'} />
        <br />
        <div className="w-[90%] m-auto">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Class
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={student_class}
                label="Select Class"
                onChange={handleChangeClass}
              >
                <MenuItem value="">Select Class</MenuItem>
                <MenuItem value="nursery">Nursery</MenuItem>
                <MenuItem value="pre_kg">Pre-Kindergarten</MenuItem>
                <MenuItem value="kg">Kindergarten</MenuItem>
                <MenuItem value="1st">1st Grade</MenuItem>
                <MenuItem value="2nd">2nd Grade</MenuItem>
                <MenuItem value="3rd">3rd Grade</MenuItem>
                <MenuItem value="4th">4th Grade</MenuItem>
                <MenuItem value="5th">5th Grade</MenuItem>
                <MenuItem value="6th">6th Grade</MenuItem>
                <MenuItem value="7th">7th Grade</MenuItem>
                <MenuItem value="8th">8th Grade</MenuItem>
                <MenuItem value="9th">9th Grade</MenuItem>
                <MenuItem value="10th">10th Grade</MenuItem>
                <MenuItem value="11th">11th Grade</MenuItem>
                <MenuItem value="12th">12th Grade</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <br />

          <Box sx={{ minWidth: 125 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Examination
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={examname}
                label="Select Class"
                onChange={handleChangeExam}
              >
                {examdata.map((el: any) => (
                  <MenuItem value={`${el.exam_name}-${el.session}`}>
                    {el.exam_name} - {el.session}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <br />
          <div className="flex items-center justify-center w-[60%] m-auto">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                {selectedFile1 === null ? (
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                ) : (
                  'File Selected'
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Excel file only
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept=".xlsx, .xls"
                name="file"
                onChange={handleFileChange1}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-red-500 dark:text-gray-400 text-center">
            * Please Upload Only Excel File
          </p>
          <p className="text-xs text-red-500 dark:text-gray-400 text-center">
            * Please Follow Correct Excel Sequences
          </p>

          <br />
          <Button
            color="green"
            onClick={HandlePostData}
            className="w-full m-auto text-center "
          >
            {btnload ? <Spinner className="w-6 h-6 m-auto" /> : 'Upload'}
          </Button>
        </div>
      </div>
      <ToastContainer></ToastContainer>
      <Dialog size="sm" open={open} handler={handleOpen}>
        <DialogBody>
          <div className="w-[200px] m-auto">
            <Lottie animationData={success} loop={false} autoplay={true} />
          </div>
          <div className="m-auto grid grid-cols-1 gap-2">
            <p className="font-bold text-center text-2xl">
              Students Marks Successfully Upload
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
    </>
  );
}
