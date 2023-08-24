import React from 'react'

export default function TeacherPerdaydetail() {
  return (
    <div style={{padding:'20px',marginTop:'10px'}} className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
            <p>Total Lectures:- 13</p>
            <p>Total Hours:- 120hr</p>
          </div>
          <div  className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
          <thead>
             <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Subject</th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Date</th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Start Lecture</th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">End Lecture</th>

                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Hours</th>
             </tr>
          </thead>
          <tbody>
            <tr>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                   <p className="text-black dark:text-white"> Hindi</p>
                   
                    </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                    <p className="text-black dark:text-white">10-8-2023</p>
              
                </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                    <p className="text-black dark:text-white">9:00 AM</p>
                    </td>
                    <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                    <p className="text-black dark:text-white">10:00 AM</p>
                    </td><td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                    <p className="text-black dark:text-white">23hr</p>
                    </td>
            </tr>
          </tbody>
       </table>
          </div>
       
    </div>
  )
}
