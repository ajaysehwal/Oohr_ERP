// import React from 'react';
// import Hero from '../components/hero'
import Hero from '../components/hero';
import AppNav from '../components/Navbar';
import Features from '../components/features';
import Stats from '../components/stats';
import Footer from "../components/footer";
import Howitsworks from '../components/howitsworks';

export default function Home() {
  console.log(import.meta.env.VITE_REACT_API_URL)
  return (
    <body style={{background:"white"}}>

      <AppNav />
      <Hero />

      <Features />
   <Howitsworks/>
      <Stats />
      
      <Footer/>
    </body>
  );
}
