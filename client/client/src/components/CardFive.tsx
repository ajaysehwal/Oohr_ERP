import { Spinner } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
const url = String(import.meta.env.VITE_REACT_API_URL);

const CardFive = () => {
  const cookies = new Cookies();
  const auth = cookies.get('_UID');
  const [male, setmale] = useState(0);
  const [load, setload] = useState(false);
  const [female, setfemale] = useState(0);
  const [other, setother] = useState(0);

  const getdatacount = async (auth: any) => {
    try {
      const res = await axios.get(`${url}/schoolstudent/${auth}/male`);
      setmale(res.data.length);
    } catch (err) {
      return err;
    }
    try {
      const res = await axios.get(`${url}/schoolstudent/${auth}/female`);
      setfemale(res.data.length);
    } catch (err) {
      return err;
    }
    try {
      const res = await axios.get(`${url}/schoolstudent/${auth}/other`);
      setother(res.data.length);
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    getdatacount(auth);
  }, []);

  return (
    <div data-aos="zoom-in-up" className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <p className="text-title-md font-bold text-black dark:text-white">
        {load ? <Spinner /> : male + female + other}
      </p>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="text-sm font-medium">Total Students</span>
          <p className="text-sm font-medium">
            Shows total number of students by gender
          </p>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          textAlign: 'center',
          marginTop: '10px',
          padding: '15px',
          borderRadius: '10px',
        }}
        className="bg-green-500 text-white dark:text-white"
      >
        <div>
          <p className="text-xl font-medium text-white dark:text-white">
            {load ? <Spinner /> : male}
          </p>
          <p className="text-xl font-medium text-white dark:text-white">Male</p>
        </div>
        <div>
          <p className="text-xl font-medium text-white dark:text-white">
            {load ? <Spinner /> : female}
          </p>
          <p className="text-xl font-medium text-white dark:text-white">
            Female
          </p>
        </div>
        <div>
          <p className="text-xl font-medium text-white dark:text-white">
            {load ? <Spinner /> : other}
          </p>
          <p className="text-xl font-medium text-white dark:text-white">
            Other
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardFive;
