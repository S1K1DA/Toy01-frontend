import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";  // AuthContext 가져오기

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Home from "../../pages/Home";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import MyPage from "../../pages/auth/MyPage";
import BoardRouter from "../community/BoardRouter";

const RouterConfig = () => (
  <AuthProvider> {/* AuthContext로 앱을 감싸 로그인 상태 관리 */}
    <Router>
      <Header /> {/* 모든 페이지에서 공통으로 보이게 추가 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/community/*" element={<BoardRouter />} />

      </Routes>
      <Footer /> {/* 모든 페이지에서 공통으로 보이게 추가 */}
    </Router>
  </AuthProvider>
);

export default RouterConfig;
