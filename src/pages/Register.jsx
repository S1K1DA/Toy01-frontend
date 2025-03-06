import React, { useState } from 'react';
import '../styles/register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  // 이메일 형식 검사
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // 비밀번호 형식 검사 (영문+숫자+기호)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    return passwordRegex.test(password);
  };

  // 이름이 한글인지 검사
  const validateName = (name) => {
    const nameRegex = /^[가-힣]{2,5}$/;
    return nameRegex.test(name);
  };

  // 회원가입 버튼 클릭 시 유효성 검사
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    if (!validatePassword(password)) {
      alert('비밀번호는 영문, 숫자, 기호를 포함해야 하며, 8자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다!');
      return;
    }

    if (!validateName(name)) {
      alert('이름은 한글로만 입력 가능합니다.');
      return;
    }

    // 이메일, 비밀번호, 이름, 닉네임이 모두 유효하면 폼 제출
    console.log('Register with:', { email, password, name, nickname });
  };

  return (
    <div className="container">
      <div className="register-card">
        <h2>회원가입</h2>
        <form className="register-form" onSubmit={handleSubmit}>
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
            required
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            required
          />
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
            required
          />
          <button type="submit">회원가입</button>
        </form>

        {/* 로그인 페이지로 가는 링크 추가 */}
        <div className="additional-links">
          <a href="/login">이미 계정이 있으신가요? 로그인</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
