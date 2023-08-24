// import { Suspense, lazy, useEffect, useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';

// import ECommerce from './pages/Dashboard/ECommerce';
// import SignIn from './pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
// import Loader from './common/Loader';
import {coreRoutes} from "./routes/index";
// const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

// function App() {
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//     <Toaster position='top-right' reverseOrder={false} containerClassName='overflow-auto'/>
  
//       <Routes>
//         <Route path="/auth/signin" element={<SignIn />} />
//         <Route path="/auth/signup" element={<SignUp />} />
//         <Route element={<DefaultLayout />}>
//           <Route index element={<ECommerce />} />
//           {routes.map(({ path, component: Component }) => (
//             <Route
//               path={path}
//               element={
//                 <Suspense fallback={<Loader />}>
//                   <Component />
//                 </Suspense>
//               }
//             />
//           ))}
//         </Route>
//       </Routes>
//     </>
//   );
// }

// export default App;
import React from "react";
import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import PageNotfound from "./pages/404notfound";
import Schooldetails from './pages/Authentication/signupsteps/register_school';
import AddressDetails from './pages/Authentication/signupsteps/register_address';
import Admindata from './pages/Authentication/signupsteps/finalstep';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
<Routes>
      <Route index element={<Home/>} />
      <Route path="*" element={<PageNotfound/>}/>
        <Route path='/admin_account' element={<Admindata/>}/>
    
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
                 <Component/>
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

