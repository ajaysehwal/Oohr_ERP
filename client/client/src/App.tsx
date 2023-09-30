
import {coreRoutes} from "./routes/index";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/ECommerce';

import SignUp from './pages/Authentication/SignUp';

import Loader from './common/Loader';
import PageNotfound from "./pages/404notfound";
import Schooldetails from './pages/Authentication/signupsteps/register_school';
import AddressDetails from './pages/Authentication/signupsteps/register_address';
import Admindata from './pages/Authentication/signupsteps/finalstep';
import axios from "axios";
import { Fetchdata } from "./common/Loader";
import FeeReceipt from "./components/FeeReceipt";
const url = String(import.meta.env.VITE_REACT_API_URL);

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [Apiload,setApiload]=useState(false);
  const API_TEST=async()=>{
    setApiload(true);
    try{
   const Response=await axios.get(`${url}`);
    if(Response.status===200){
      setApiload(false);

    }
    setApiload(false);


    }catch(err){
      setApiload(true);

      return err;
    }
  }
  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    API_TEST();
  }, []);
  
  return loading ? (
    <Loader />
  )  :Apiload?(
    <Fetchdata/>
  ):(
    <> 
     
    
    <Routes>
      <Route index element={<Home/>} />
      <Route path="*" element={<PageNotfound/>}/>
        <Route path='/admin_account' element={<Admindata/>}/>
    {/* <Route path='/fee_r' element={<FeeReceipt/>}/> */}
       <Route path='/register_address' element={<AddressDetails/>}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/register" element={<Schooldetails/> }/>
        <Route element={<DefaultLayout />}>
           <Route path='/dashboard' element={<ECommerce />} />
           {coreRoutes.map(({path,component:Component})=>(
              <Route
             path={path}
              element={
                <Suspense fallback={<Loader />}>
                 <Component mydata={undefined}/>
                </Suspense>
              }
              />
           ))}
         </Route>
     </Routes>
    
   

    </>
  );
}

export default App;

