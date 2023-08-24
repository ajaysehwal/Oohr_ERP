import CardFour from '../../components/CardFour.tsx';
import CardFive from '../../components/CardFive.tsx';
import CardSix from '../../components/CardSix.tsx';
import CardSeven from '../../components/CardSeven.tsx';
import Cookies from 'universal-cookie';
 import Announcementbox from "../../components/complainbox.tsx";
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import MapOne from '../../components/MapOne.tsx';
import TableOne from '../../components/TableOne.tsx';
import { Navigate } from 'react-router-dom';
import Welcomebox from '../../components/welcomebox';
const ECommerce = () => {
  const cookies = new Cookies();
    const auth=cookies.get('_UID');
   if(!auth){
     return <Navigate to='/signin'/>
   }
  return (
    <>
      <div>
        {/* <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour /> */}
        <Welcomebox/>
      </div>
      <div style={{marginTop:"20px"}} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
       <CardFive/>
       <CardSix/>
     
      </div>


      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Announcementbox />
        {/* <ChartTwo />  */}
        {/* <ChartThree />  */}
        {/* <MapOne /> */}
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default ECommerce;
