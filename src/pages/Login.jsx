import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/authService';
import '../styles/login.css';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();  // 로그인 후 리디렉션을 위한 useNavigate
  const {login} =useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // 에러 초기화
    setLoading(true);  // 로딩 시작

    try {
      const userData = { email, password };
      const response = await api.post("/login", userData);  // 로그인 API 호출
      console.log('로그인 성공:', response);

      sessionStorage.setItem('email', email);  // 이메일을 세션에 저장
      login(email);
      navigate('/');

    } catch (err) {
      console.error('로그인 실패:', err);
      if (err.response) {
        setError(err.response.data?.message || '서버에서 오류 응답을 받았습니다.');
      } else if (err.request) {
        setError('서버에 요청을 보냈지만 응답이 없습니다.');
      } else {
        setError('로그인 요청 중 알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);  // 로딩 끝
    }
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
          <button type="submit" disabled={loading}>
            {loading ? '로딩 중...' : '로그인'}
          </button>
          {error && <div className="error-message">{error}</div>} {/* 에러 메시지 */}
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
