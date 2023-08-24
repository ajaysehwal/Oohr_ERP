
import {createContext,useState} from "react";

export const AuthContext=createContext();
 import { useRef } from "react";
export default function AuthContextProvider({children}){
const howitsworksRef = useRef(null);

  const [verify,verified]=useState(false);;
const verifing=()=>{
 verified(false);
    
}
const verified_complete=()=>{
  verified(true);
}
  return(
    <AuthContext.Provider value={{verified,verified_complete,verify,howitsworksRef}}>
        {children}
    </AuthContext.Provider>
  )
}