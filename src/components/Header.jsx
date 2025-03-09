import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // 경로 수정
import '../styles/global.css';

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  // 로그아웃 후 강제로 리렌더링
  useEffect(() => {
    // 상태가 바뀌면 UI 리렌더링
  }, [isLoggedIn]);  // isLoggedIn 상태가 바뀔 때마다 실행

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
