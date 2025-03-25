import React, { createContext, useState, useEffect } from 'react';
import api from '../services/authService'; // 🔥 유저 정보 가져올 API

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // 유저 전체 정보

  // 페이지 첫 로딩 시 로그인 여부 + 유저 정보 불러오기
  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email) {
      setIsLoggedIn(true);

      // 유저 정보 가져오기
      api.get("/mypage")
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("유저 정보 로딩 실패:", err);
        });
    }
  }, []);

  const login = (email) => {
    sessionStorage.setItem('email', email);
    setIsLoggedIn(true);

    // 로그인 후 유저 정보 불러오기
    api.get("/mypage")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("로그인 후 유저 정보 로딩 실패:", err);
      });
  };

  const logout = () => {
    sessionStorage.removeItem('email');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
