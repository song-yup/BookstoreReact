import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  // 초기 로그인 상태를 localStorage에서 읽어와 설정
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' ? true : false);
  // const navigate = useNavigate();

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태를 localStorage에 저장
  };

  const logout = async () => {
    try {
        await axios.post(`/logout`);
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn'); // 로그아웃 시 localStorage에서 로그인 상태 제거
        // navigate("/login"); // 로그아웃 후 로그인 페이지로 이동하길 원한다면 주석 해제
    } catch (error) {
        console.error("로그아웃에 실패했습니다:", error);
        alert('로그아웃에 실패했습니다.');
    }
  }

  // 컴포넌트가 마운트될 때, localStorage에서 로그인 상태를 읽어와 상태를 업데이트하는 부분은
  // 이미 isLoggedIn 상태 초기값 설정 시에 처리함

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
