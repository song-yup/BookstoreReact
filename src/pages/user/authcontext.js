import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);

  const logout = async () => {
    try {
        await axios.post(`/logout`);
        alert('로그아웃 되었습니다.');
        setIsLoggedIn(false);
        // navigate("/login"); 
    } catch (error) {
        console.error("로그아웃에 실패했습니다:", error);
        alert('로그아웃에 실패했습니다.');
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
