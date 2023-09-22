import LMS from "./images/LMS.png";
import Security from "./images/Security.png";
import staffinfo from "./images/staffinfo.png"
import sessionmanagement from "./images/SessionManagement.png";
import streaming from "./images/streming.png";
import managementandassignment from "./images/managementandassignment.png";
import moraltalk from "./images/moraltalk.png"
import schoolclubmanagement from "./images/schoolclubmanagement.png";
import gradesystem from "./images/gradesystem.png"
import schoolwebsite from "./images/schoolwebsite.png";
import score from "./images/score.png";
import payment from './images/payment.png';
import studentwallets from "./images/studentwallets.png";
import email from "./images/emailandsms.png"
import assignmentmanagement from "./images/assignmentmanagement.png";
import cloud_sever from "./images/cloud_server.png";
import libery from "./images/liberaymanagement.png"
import transport from "./images/transportmanagement.png";
import studentidqr from "./images/studentIDqr.png";
import hostelmanagement from "./images/hostelmanagement.png"
import studentpromotion from "./images/studentpromotion.png";
import mediashare from "./images/mediashare.png";
import eventmanagement from "./images/eventmanagement.png";
import noticeboard from "./images/noticeboradmanagement.png";
import multilinqualapp from "./images/MultilinqualApp.png"
import academicmanagement from "./images/acdemicmanagement.png";
import standardreport from "./images/StandardReportManagement.png";
import smsgateway from "./images/smsgateway.png";
import school from "./images/DigitalizeYourSchool.png";
import studentmanage from "./images/studentmanage.png";
import board from "./images/board.png";
export default function Features() {


  
  const data=[
    {
      img:school,
      title:"Digitalize Your School",
      text:"Seamlessly transform your educational institution into a digital hub, where administrative tasks, communication, and learning converge for enhanced efficiency and modernization.",
    },
    {
      img: schoolwebsite,
      title:"Manage Your School",
      text:" Empower your institution with a comprehensive and intuitive management system that simplifies daily operations, enabling you to focus on fostering a thriving educational environment.",
    },
    {
      img: studentmanage,
      title:' Student Management',
      text:"Effortlessly streamline student records, attendance tracking, and academic progress with our user-friendly platform, ensuring a holistic approach to student management.",
    },
    {
      img: staffinfo,
      title:"Staff Management",
       text:"From recruitment to performance evaluation, our software provides a robust solution to efficiently oversee and optimize your staff's roles, responsibilities, and professional growth",
     },
     {
       img:board,
       title:"Noticeboard Management",
       text:"Keep your school community informed and engaged with a dynamic digital noticeboard, facilitating swift communication of announcements, events, and important information",

     }
   ]
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <h2 style={{ textAlign: 'center' }} className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
        Why You Need Our Service
      </h2>
      <div id="features">

        <div>
          <div className="md:w-2/3 lg:w-1/2">

          </div>
          <div
            className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4"
          >
            {data?.map((el, i) => (


              <div data-aos='fade-up' className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                <div className="relative space-y-8 py-12 p-8">
                  <img
                    // src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
                    src={el.img}
                    className="w-12"
                    width="512"
                    height="512"
                    alt="burger illustration"
                  />

                  <div className="space-y-2">
                    <h5
                      className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary"
                    >
                      {el.title}
                    </h5>
                    <p className="text-gray-600 dark:text-gray-300">
                      {el.text}
                    </p>
                  </div>
                  {/* <a href={el.link} className="flex items-center justify-between group-hover:text-secondary">
                    <span className="text-sm">Read more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                    </svg>
                  </a> */}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}
