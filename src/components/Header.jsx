import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/global.css";

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">StudyPang</Link>
      </div>
      <nav className="nav">
        <Link to="/">홈</Link>
        <Link to="/projects">프로젝트 찾기</Link>
        <Link to="/create">모집 만들기</Link>
        {isLoggedIn && <Link to="/mypage">마이페이지</Link>}
      </nav>
      <div className="auth">
        {isLoggedIn ? (
          <button onClick={logout} className="login-btn">
            로그아웃
          </button>
        ) : (
          <Link to="/login" className="login-btn">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
