import React, { useState } from 'react';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login with:', { email, password });
  };

  return (
    <div className="container">
      <div className="login-card">
        <h2>로그인</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
          <button type="submit">로그인</button>
        </form>

        {/* 회원가입 & 비밀번호 찾기 링크 추가 */}
        <div className="additional-links">
          <a href="/register">회원가입</a>
          <a href="/forgot-password">아이디/비밀번호 찾기</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
