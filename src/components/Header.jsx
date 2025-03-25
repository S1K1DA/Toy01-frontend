import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/global.css";

function Header() {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();       
    navigate("/");   
  };

  const roleToLabel = {
    NORMAL: "👤 일반",
    PREMIUM: "⭐ 프리미엄",
    FREE: "🌟 무제한"
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">StudyPang</Link>
      </div>

      <nav className="nav">
        <Link to="/">홈</Link>
        <div 
          className="nav-item"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className="nav-link">커뮤니티</span>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/community/study" className="dropdown-item">구인/구직</Link>
              <Link to="/community/free" className="dropdown-item">자유게시판</Link>
            </div>
          )}
        </div>
        <Link to="/create">모집 만들기</Link>
        {isLoggedIn && <Link to="/mypage">마이페이지</Link>}
      </nav>

      <div className="auth">
        {isLoggedIn && user && (
          <div className="user-info">
            <span className="user-role">
              {roleToLabel[user.userRole] || "등급 없음"}
            </span>
            <button
              className="upgrade-btn"
              onClick={() => alert("🎉 등급 업그레이드 팝업 띄우기 (예정)")}
            >
              결제
            </button>
          </div>
        )}
        
        {isLoggedIn ? (
          <button onClick={handleLogout} className="login-btn">
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
