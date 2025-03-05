import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

const RouterConfig = () => (
  <Router>
    <Header /> {/* ✅ 모든 페이지에서 공통으로 보이게 추가 */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    <Footer /> {/* ✅ 모든 페이지에서 공통으로 보이게 추가 */}
  </Router>
);

export default RouterConfig;
