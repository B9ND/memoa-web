// src/components/Login.jsx
import { useState } from 'react';
import '../styles/Login.css';
import DelIcon from '../assets/Del.png';  // 삭제 아이콘
import EyeOpenIcon from '../assets/eye_1.png';  // eye_1 아이콘
import EyeClosedIcon from '../assets/eye_2.png';  // eye_2 아이콘

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClearEmail = () => {
    setEmail('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="login-box">
        <div className="logo-placeholder" />
        <h2>로그인</h2>
        <p><span className="project">프로젝트</span> 계정으로 계속하기</p>
        <form>
          <div className="inputWrap">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="button" className="Delbutton" onClick={handleClearEmail}>
              <img src={DelIcon} alt="Clear Email" />
            </button>
          </div>
          <div className="inputWrap">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="eyebutton" onClick={toggleShowPassword}>
              <img src={showPassword ? EyeOpenIcon : EyeClosedIcon} alt="Toggle Password Visibility" />
            </button>
          </div>
          <button type="submit" className="login-button">로그인</button>
        </form>
        <p className="signup">계정이 없다면? <a href="/signup">가입하기</a></p>
      </div>
    </div>
  );
};

export default Login;
