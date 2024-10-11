import { useState, useEffect } from 'react';
import { postCheckToken } from '../api/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || "";
    let isTokenValid:boolean = false

    postCheckToken(token)
      .then(result=>{
        if(result.status === 200){
          isTokenValid = true
        }else{
          isTokenValid = false
        }
      })
      .catch(()=>{
        isTokenValid = false
      })

    if (token && isTokenValid) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
};