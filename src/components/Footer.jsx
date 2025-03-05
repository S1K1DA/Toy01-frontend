import React from 'react';
import '../styles/global.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/about">스팡 소개</a>
        <a href="/terms">이용약관</a>
        <a href="/privacy">개인정보처리방침</a>
      </div>
      <p className="copyright">© 2025 StudyPang. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
