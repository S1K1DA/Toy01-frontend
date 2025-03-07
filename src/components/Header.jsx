import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/global.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 로그인 상태를 확인하는 useEffect
  useEffect(() => {
    // 페이지 로드 시 세션 스토리지에서 이메일을 가져옴
    const email = sessionStorage.getItem('email');
    if (email) {
      setIsLoggedIn(true);  // 이메일이 있으면 로그인 상태로 설정
    }

    // 세션 스토리지에 저장된 값이 변경될 때 상태를 갱신
    const handleStorageChange = () => {
      const email = sessionStorage.getItem('email');
      setIsLoggedIn(!!email); // 이메일이 있으면 true, 없으면 false
    };

    window.addEventListener('storage', handleStorageChange);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const handleLogout = () => {
    sessionStorage.removeItem('email');  // 세션에서 이메일 정보 삭제
    setIsLoggedIn(false);  // 상태를 로그아웃 상태로 설정
    navigate('/login');  // 로그인 페이지로 리디렉션
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">StudyPang</Link>
      </div>
      <nav className="nav">
        <Link to="/">홈</Link>
        <Link to="/projects">프로젝트 찾기</Link>
        <Link to="/create">모집 만들기</Link>
        <Link to="/mypage">마이페이지</Link>
      </nav>
      <div className="auth">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-btn">로그아웃</button> // 로그인 상태일 때 로그아웃 버튼
        ) : (
          <Link to="/login" className="login-btn">로그인</Link> // 로그인 안 되었을 때 로그인 버튼
        )}
      </div>
    </header>
  );
}

export default Header;
