// import React from "react";
import hero from "../assets/images/hero.jpg";
import "../styles/home.css";
import { Button } from "@material-tailwind/react";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
export default function Hero() {
  const cookies = new Cookies();

  const auth = cookies.get('_UID');
  return (
    <div>
      <div
        style={{ margin: "auto", width: "90%" }}
        id="hero"
        className="grid grid-cols-2 gap-4"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <div
            style={{
              margin: "auto",
              width: "80%",
              textAlign:"center"
            }}
          >
            <h1
            
              className="font-bold text-5xl"
              id="headtext"
              style={{ marginBottom: "10px",padding:"10px", }}
            >
              Enterprise Resourse Planning System
            </h1>
            <p
              style={{
                color: "sliver",
                width: "75%",
                margin: "auto",
               
              }}
              id="supporttext"
            >
            Oohr Innovations Private Limited is a company dedicated to furnishing digital platforms for all educational institutions
            </p>
             {!auth?(
  <Link to='/signin'>
  <Button color='blue' id="supporttext" style={{marginTop:"20px"}}>Get Started</Button>
  </Link>  
             ):(
              <p style={{color:'rgb(0,37,67)'}} className="font-bold text-3xl">Welcome back</p>
             )}
                 
          </div>
        </div>
        <div>
          <img
            className="h-full w-full floating"
            width="100%"
            src={hero}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
