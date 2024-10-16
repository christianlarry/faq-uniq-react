import React, { createContext, useContext, useEffect, useState } from "react";
import { postCheckToken } from "../api/api";

interface AuthContextModel{
  isAuthenticated: boolean,
  logout: ()=>void
}

const AuthContext = createContext<AuthContextModel | undefined>(undefined)

export const AuthProvider = ({
  children
}:{children:React.ReactNode})=>{
  
  // STATE & NAVIGATE
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem("token")
  
    if(!token){ 
      setIsAuthenticated(false)
    }else{
      (async ()=>{
        try {
          const result = await postCheckToken(token)
          
          if(result.status === 200){
            setIsAuthenticated(true)
          }else{
            setIsAuthenticated(false)
            localStorage.removeItem("token")
          }
    
        } catch (err) {
          setIsAuthenticated(false)
          localStorage.removeItem("token")
        }
      })()
    }
  },[])
  
  const logout = () => {
    localStorage.removeItem('token');

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{isAuthenticated,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = ()=>{
  const context = useContext(AuthContext)
  if(!context) throw new Error("useAuth must be used within AuthContextProvider!")
  return context
}