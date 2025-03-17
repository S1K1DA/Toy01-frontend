import React, { useState } from 'react';
import api from '../../services/authService';
import '../../styles/auth/register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(password);
  const validateName = (name) => /^[가-힣]{2,5}$/.test(name);
  const validateNickname = (nickname) => /^[a-zA-Z0-9가-힣]{2,15}$/.test(nickname);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) return setError('이메일 형식이 올바르지 않습니다.');
    if (!validatePassword(password)) return setError('비밀번호는 영문, 숫자, 기호를 포함해야 하며, 8자 이상이어야 합니다.');
    if (password !== confirmPassword) return setError('비밀번호가 일치하지 않습니다!');
    if (!validateName(name)) return setError('이름은 한글로만 입력 가능합니다.');
    if (!validateNickname(nickname)) return setError('닉네임은 한글,영어,숫자만 가능합니다.');

  const userData = { email, password, name, nickname, confirmPassword };
    setLoading(true);

try {
    const response = await api.post("/register", userData, {
        headers: {
            'Content-Type': 'application/json',  // CORS 헤더 추가
        },
    });
    console.log('회원가입 성공:', response);
    window.location.href = '/login';  // 성공 시 이동
} catch (err) {
    console.error('회원가입 실패:', err);
    if (err.response) {
        setError(err.response.data?.message || '서버에서 오류 응답을 받았습니다.');
    } else if (err.request) {
        setError('서버에 요청을 보냈지만 응답이 없습니다.');
    } else {
        setError('회원가입 요청 중 알 수 없는 오류가 발생했습니다.');
    }
} finally {
    setLoading(false);
}
};

  return (
    <div className="container">
      <div className="register-card">
        <h2>회원가입</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호 확인" required />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" required />
          <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" required />
          <button type="submit" disabled={loading}>{loading ? '로딩 중...' : '회원가입'}</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        <div className="additional-links">
          <a href="/login">이미 계정이 있으신가요? 로그인</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
