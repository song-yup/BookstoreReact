import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' ? true : false);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = async () => {
    try {
        await axios.post(`/logout`);
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
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
