import { Password } from '@mui/icons-material';
import React from 'react'

 export default function Loginvalidate(data) {
 let error={
  email:'',
  password:'' 
}

 const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
 const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

 if(data.email===""){
  error.email="Name Should not be empty";

 }else if(!email_pattern.test(data.email)){
  error.email="Email Didn't match";
 }else{
  error.email='';
 }
 if(data.password===''){
  error.password="Password should not be empty"
 }else if(!password_pattern.test(data.password)){
  error.password="password didn't match";
 }else{
  error.password="";
 }
return error;
  
}
