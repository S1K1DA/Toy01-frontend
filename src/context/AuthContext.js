import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 페이지가 처음 로드될 때 sessionStorage를 확인
  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      setIsLoggedIn(true);  // 로그인 상태로 설정
    }
  }, []);

  // 로그인 함수
  const login = (email) => {
    sessionStorage.setItem('email', email);
    setIsLoggedIn(true);
  };

  // 로그아웃 함수
  const logout = () => {
    sessionStorage.removeItem('email');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
