import { useReactToPrint } from 'react-to-print';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import Teacheredit from './editteacher';
import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';
import Cookies from 'universal-cookie';
import emptyfolder from './images/emptyfolder.png';
import TeacheringStaff from './Addteachers';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PrintIcon from '@mui/icons-material/Print';

export default function Teachertable() {
  const coverttopdf = useRef();
  const generatepdf = useReactToPrint({
    content: () => coverttopdf.current,
    documentTitle: 'Staff Members',
  });
  const url = String(import.meta.env.VITE_REACT_API_URL);
  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  const [open, setOpen] = useState(false);
  const [load, setload] = useState(false);
  const [staff, setstaff] = useState([]);
  const [finalstaff, setfinalstaff] = useState([]);
  const handleOpen = () => setOpen(!open);
  const close = () => {
    setOpen(!open);
  };
  const getstaffdata = async (id: any) => {
    setload(true);
    try {
      const res = await axios.get(`${url}/teacher.api/${id}`);
      setload(false);
      setstaff(res.data);
      setfinalstaff(res.data);
    } catch (err) {
      setload(false);
      return err;
    }
  };
  useEffect(() => {
    getstaffdata(auth);
  }, []);

  const [filterval, setfilterval] = useState('');
  const debounce = (fn: Function, delay: number) => {
    let timerId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  const [singleload, setsingleload] = useState(false);

  const [opensingle, setOpensingle] = useState(false);

  const handleOpensingle = (id: any) => {
    setOpensingle(!opensingle);
    getsinglestaffdata(id, auth);
  };
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const performSearch = async (searchText: string) => {
    if (searchText === '') {
      setstaff(finalstaff);
    } else {
      const filtered = staff.filter((el) =>
        el.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setstaff(filtered);
    }
    setSearchInput(searchText);
  };
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputText = event.target.value;
    setSearchInput(inputText);

    const debouncedSearch = debounce(performSearch, 300);
    debouncedSearch(inputText);
  };
  const [singleataff, setsinglestaff] = useState([]);

  const [filterdeparment, setfilterdepartment] = useState('');

  const searchdepartment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setstaff(finalstaff);
    } else {
      const filtered = staff.filter((el) => el.department == e.target.value);
      setstaff(filtered);
    }
    setfilterdepartment(e.target.value);
  };
  const [name, setname] = useState('');
  const [dob, setdob] = useState('');
  const [address, setaddress] = useState('');
  const [religion, setreligion] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [martial_status, setmartial_status] = useState('');
  const [qualification, setqualification] = useState('');
  const [department, setdepartment] = useState('');
  const [status, setstatus] = useState('');
  const [accountholdername, setaccountname] = useState('');
  const [accountnumber, setaccountnumber] = useState('');
  const [bankname, setbankname] = useState('');
  const [branch, setbranch] = useState('');
  const [teacher_id,setteacher_id]=useState('');

  const [salary, setsalary] = useState('');
  const [updateimg,setupdateimg]=useState('');
  const updatedteacher = {
    name,
    dob,
    address,
    religion,
    phone,
    email,
    martial_status,
    qualification,
    department,
    status,
    teacher_id,
    accountholdername,
    accountnumber,
    bankname,
    salary,
    branch
  };
  const changeupdateteacher = {
    setname,
    setdob,
    setaddress,
    setreligion,
    setphone,
    setemail,
    setmartial_status,
    setqualification,
    setdepartment,
    setstatus,
    setaccountname,
    setaccountnumber,
    setbankname,
    setsalary,
    setbranch
  };
  const getsinglestaffdata = async (id: any, school_id: any) => {
    setsingleload(true);
    try {
      const res = await axios.get(`${url}/apiteacher/${school_id}/${id}`);
      setsingleload(false);
      setsinglestaff(res.data);
      const changedata = res.data[0];
      setname(changedata.name);
      setdob(changedata.dob);
      setreligion(changedata.religion);
      setphone(changedata.phone);
      setemail(changedata.email);
      setaddress(changedata.address);
      setdepartment(changedata.department);
      setqualification(changedata.qualification);
      setmartial_status(changedata.martialstatus);
      setstatus(changedata.status);
      setaccountname(changedata.accountholdername);
      setbankname(changedata.bankname);
      setsalary(changedata.joiningsalary);
      setaccountnumber(changedata.accountnumber);
      setaccountnumber(changedata.accountnumber);
      setbranch(changedata.branch)
      setupdateimg(changedata.img)
      setteacher_id(changedata.id);
      
    } catch (err) {
      setsingleload(false);
      return err;
    }
  };
  const [editopen, editsetOpen] = useState(false);

  const edithandleOpen = (id: any) => {
    editsetOpen(!editopen);
    getsinglestaffdata(id,auth);
  };
  const editclose=()=>{
    editsetOpen(!editopen)
  }

  return (
    <div data-aos="fade-up">
     
      <div
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
        <div  className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 mb-2">
          <div>
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                value={searchInput}
                onChange={handleSearchInputChange}
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                required
              />
            </div>
          </div>
          <div>
            <select
              onChange={searchdepartment}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Filter by Department</option>
              <option value="english">English Department</option>
              <option value="math">Mathematics Department</option>
              <option value="science">Science Department</option>
              <option value="social-studies">Social Studies Department</option>
              <option value="foreign-languages">
                Foreign Languages Department
              </option>
              <option value="physical-ed">Physical Education Department</option>
              <option value="fine-arts">Fine Arts Department</option>
              <option value="performing-arts">
                Performing Arts Department
              </option>
              <option value="music">Music Department</option>
              <option value="visual-arts">Visual Arts Department</option>
              <option value="computer-science">
                Computer Science Department
              </option>
              <option value="technology-ed">
                Technology Education Department
              </option>
              <option value="business-ed">Business Education Department</option>
              <option value="economics">Economics Department</option>
              <option value="home-economics">Home Economics Department</option>
              <option value="industrial-arts">
                Industrial Arts Department
              </option>
              <option value="health-ed">Health Education Department</option>

              <option value="special-ed">Special Education Department</option>
              <option value="other">other</option>
            </select>
          </div>

          <div className='flex gap-2 align-middle'>
          <Chip onClick={generatepdf} icon={<PrintIcon />} label="Print" />
          <Chip onClick={handleOpen} style={{padding:'5px'}}  icon={<PersonAddAlt1Icon />} label="Add Teachers" />

          </div>
          
        </div>
        <div className="max-w-full overflow-x-auto">
          <table ref={coverttopdf} className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Photo
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Department
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Gender
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Phone
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Date of Joining
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {load ? (
                <Spinner
                  color="blue"
                  className="h-10 w-10"
                  style={{ position: 'absolute', left: '47%' }}
                />
              ) : staff.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    margin: 'auto',
                    width: '100%',
                    display: 'grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    padding: '20px',
                  }}
                >
                  <img
                    style={{ width: '140px', margin: 'auto' }}
                    src={emptyfolder}
                    alt=""
                  />
                  <p
                    className="text-2xl font-bold"
                    style={{ textAlign: 'center', margin: 'auto' }}
                  >
                    No Found
                  </p>
                </div>
              ) : (
                staff.map((el,i) => (
                  <tr style={{ borderBottom: '1px silver silver' ,background:i%2?'#f1f5f9':'white' }} >
                    <td
                      onClick={() => handleOpensingle(el.id)}
                      className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                    >
                      {/* <img width="90px" src={`${url}/${el.img}`} alt="" /> */}
                      <Avatar sx={{ width: 80, height: 80 }} alt={el.name} src={`${url}/${el.img}`} />

                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {el.name}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {el.department}
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {el.status}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {el.email}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {el.gender}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {el.phone}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {el.dateofjoining}
                    </td>
                    <td
                      className="flex items-center justify-end px-4 py-3"
                      style={{ textAlign: 'center' }}
                    >
                      <Menu
                        animate={{
                          mount: { y: 0 },
                          unmount: { y: 25 },
                        }}
                      >
                        <MenuHandler>
                          <Button
                          onClick={()=>handleOpensingle(el.id)}
                            variant="text"
                            color="silver"
                            style={{ marginTop: '20px' }}
                          >
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              style={{ color: 'gray' }}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </Button>
                        </MenuHandler>
                        <MenuList>
                          <MenuItem>
                            <button
                              className="hover:text-primary"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                              }}
                            >
                              <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                  fill=""
                                />
                                <path
                                  d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                  fill=""
                                />
                              </svg>
                              <p> Preview</p>
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => edithandleOpen(el.id)}
                              className="hover:text-primary"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                              }}
                            >
                              <svg
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                {' '}
                                <path stroke="none" d="M0 0h24v24H0z" />{' '}
                                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{' '}
                                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{' '}
                                <line x1="16" y1="5" x2="19" y2="8" />
                              </svg>
                              <p> Edit</p>
                            </button>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p className='font-semibold'>Total results  {staff.length}</p>

      </div>
      <Dialog
        className="h-[40rem] w-[40rem]  overflow-scroll  bg-white  dark:bg-boxdark"
        open={open}
        size="xl"
        handler={handleOpen}
      >
        <DialogBody>
          <TeacheringStaff mydata={[getstaffdata, close]} />
        </DialogBody>
      </Dialog>
      <Dialog open={editopen} size='xl' handler={edithandleOpen}>
          <DialogHeader style={{textAlign:'center',margin:'auto'}}>
        <img
                style={{width:'200px',height:"150px",margin:"auto"}}
                className="rounded-full object-cover object-center"
                src={`${url}/${updateimg}`}
                alt="student img"
              />
        </DialogHeader>
        {singleload?<Spinner className="m-auto w-10 h-10"/>:(
   <DialogBody className='h-[30rem] overflow-scroll bg-white  dark:bg-boxdark'>
   <Teacheredit  data={[updatedteacher,changeupdateteacher,editclose,getstaffdata]} />
 </DialogBody>
        )}
      
      </Dialog>
      <Dialog
        size="lg"
        open={opensingle}
        handler={handleOpensingle}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        {singleload ? (
          <Spinner
            className="w-10 h-10"
            color="blue"
            style={{ margin: 'auto' }}
          />
        ) : (
          singleataff?.map((el) => (
            <div key={el.id} style={{ padding: '20px' }}>
              <DialogHeader>
             
        <Avatar style={{margin:'auto'}} sx={{ width: 150, height: 150 }} alt={el.name} src={`${url}/${el.img}`} />

              </DialogHeader>
              <DialogBody className="h-[30rem] overflow-scroll">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Name</p>
                    {el.name}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Date of Birth</p>
                    {el.dob}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Gender</p>

                    {el.gender}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Religion</p>
                    {el.religion}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Email</p>

                    {el.email}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Phone</p>

                    {el.phone}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Qualification</p>
                    {el.qualification}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Martial Status</p>
                    {el.martialstatus}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Address</p>

                    {el.address}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Department</p>
                    {el.department}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Date of Joining</p>
                    {el.dateofjoining}
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Status</p>
                    {el.status}
                  </div>
                  <div
                    style={{
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Identity Document</p>
                    <Link
                      to={`${url}/${el.identifydocument}`}
                      style={{ color: 'blue' }}
                    >
                      Click here
                    </Link>
                  </div>
                  <div
                    style={{
                      borderBottom: '1px solid silver',
                      padding: '10px',
                    }}
                  >
                    <p className="font-semibold">Bank Name</p>
                    {el.bankname}
                  </div>
                </div>
              </DialogBody>
            </div>
          ))
        )}
      </Dialog>
    </div>
  );
}
