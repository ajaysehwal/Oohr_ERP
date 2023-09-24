

import { Suspense, lazy, useEffect, useState } from 'react';


const SchoolCalendar = lazy(() => import('../pages/Calendar'));
const Studentadmissionform = lazy(() => import('../components/studentadmissionform'));
const AddStudentHouse = lazy(() => import('../components/AddStudentHouse'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const AddClasses = lazy(() => import('../components/addclasses'));
const TearcherAdmissionform = lazy(() => import('../components/Addteachers'));
const Teacherdetailtable = lazy(() => import('../components/teacherstable'));
// const Teacherspage = lazy(() => import('../components/teacherspage'));
const Teachertable=lazy(()=>import('../components/teacherstable'));
const Createtimetable = lazy(() => import('../components/createtimetable'));
const Studentdetailspage = lazy(() => import('../components/studentdetailspage'));
const AddClasses_section = lazy(() => import('../components/addclass_section'))
const Schooltimetable = lazy(() => import('../components/schooltimetable'));
const Createsubject = lazy(() => import('../components/createsubject'));
const Teacherdetailpage = lazy(() => import('../components/teacherdetailpage'));
const AddSchoolHoilday = lazy(() => import('../components/AddSchoolholiday'));
const Teachertimetable = lazy(() => import('../components/teachertimetable'));
const Managestudentfees = lazy(() => import('../components/managestudentfees'));
const Studentfeerecord = lazy(() => import('../components/studentfeerecord'));
const Announcement = lazy(() => import('../components/Announcement'));
const Studentdetailtable= lazy(() => import('../components/studenttable'));
const  Nonteachertable=lazy(()=>import('../components/nonteachertable'));
const ManageFees=lazy(()=>import('../components/Manage_Fees'));
const Paymenthistory=lazy(()=>import('../components/paymenthistory'));
const CreateExam=lazy(()=>import ('../components/create-exam'));
const UploadStudentMarks=lazy(()=>import ('../components/upload-student-marks'));
const PrintReportCard=lazy(()=>import ('../components/PrintReportCard'));

export const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: SchoolCalendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/profile',
    title: 'Forms Elements',
    component: Profile,
  },
  {
    path: '/students/admissionform',
    title: 'Student Addmission',
    component: Studentadmissionform,
  },
  {
    path: '/students/detailtable/student_fee_record/:id',
    title: 'Student Fee Record',
    component: Studentfeerecord,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/operations/announcement',
    title: 'Operations',
    component: Announcement,
  },
 
  {
    path: '/students/detailtable/managestudentfees/:id',
    title: 'Student details',
    component: Managestudentfees,
  },
  {
    path: '/academics/studentclasses',
    title: 'Academics',
    component: AddClasses,
  },
  {
    path: '/academics/createsubjects',
    title: 'Academics',
    component: Createsubject,
  }, {
    path: '/academics/classes_sections',
    title: 'Academics',
    component: AddClasses_section,
  }, {
    path: '/students/studentdetails/:id',
    title: 'Operations',
    component: Studentdetailspage,
  },
   {
    path: '/setting/studenthouses',
    title: 'Operations',
    component: AddStudentHouse,
  },
  {
    path: '/students/detailtable',
    title: 'Operations',
    component: Studentdetailtable,
  }, 
  {
    path: '/human_resoures/add_teachers',
    title: 'setting',
    component: TearcherAdmissionform,
  },
  {
    path: '/human_resoures/non_teaching_staff',
    title: 'setting',
    component: Nonteachertable,
  },
   {
    path: '/human_resoures/teaching-staff/:id',
    title: 'Operations',
    component: Teacherdetailpage,
  },
   {
    path: '/human_resoures/teaching-staff',
    title: 'Operations',
    component:Teachertable,
  },
   {
    path: '/academics/createtimetable',
    title: 'Operations',
    component: Createtimetable,
  },
   {
    path: '/academics/addschoolholiday',
    title: 'Operations',
    component: AddSchoolHoilday,
  },
   {
    path: '/academics/schooltimetable',
    title: 'Operations',
    component: Schooltimetable,
  }, 
   {
    path: '/academics/schooltimetable/:teacher_id',
    title: 'Operations',
    component: Teachertimetable,
  }, 
   {
    path: '/teacherstable',
    title: 'Operations',
    component: Teacherdetailtable,
  },
  {
    path: '/account/managefees',
    title: 'Student Fees Management',
    component: ManageFees,
  },
  {
    path: '/account/payment-history',
    title: 'Payment History',
    component: Paymenthistory,
  },
  {
    path: '/account/payment-history/:id',
    title: 'Payment History',
    component: Paymenthistory,
  },
 
  {
    path: '/exams/create-exams',
    title: 'Create Exams',
    component:CreateExam ,
  },
  {
    path: '/exams/upload-student-marks',
    title: 'Create Exams',
    component:UploadStudentMarks ,
  },
  {
    path: '/exams/print-report-card',
    title: 'Create Exams',
    component:PrintReportCard ,
  },
 

 
];


