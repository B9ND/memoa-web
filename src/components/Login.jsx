// src/components/Login.jsx
import React from 'react';
import '../styles/Login.css';  // styles 폴더에서 CSS 파일을 불러옴

const Login = () => {
  return (
    <div className="login">
      <div className="login-box">
        <div className="logo-placeholder" />
        <h2>로그인</h2>
        <p><span className="project">프로젝트</span> 계정으로 계속하기</p>
        <form>
          <input type="email" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />
          <button type="submit" className="login-button">로그인</button>
        </form>
        <p className="signup">계정이 없다면? <a href="/signup">가입하기</a></p>
      </div>
    </div>
  );
};

export default Login;
