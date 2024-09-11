import { useState } from 'react';
import './Login.css';
import del from '../../assets/del.svg';
import eyeOpen from '../../assets/eye_1.svg';
import eyeClosed from '../../assets/eye_2.svg';
import inputIcon from '../../assets/input-icon.svg';

const Info = () => {
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
        <p className='Cont'><span className="project">프로젝트</span> 계정으로 계속하기</p>
        <form>
          <div className="inputWrap">
            <img src={inputIcon} className="input-icon" />
            <label className={`floating-label ${email ? 'active' : ''}`}>이메일</label>
            <input  
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="button" className="Delbutton" onClick={handleClearEmail}>
              <img src={del} alt="Clear Email" />
            </button>
          </div>
          <div className="inputWrap">
            <img src={inputIcon} className="input-icon" />
            <label className={`floating-label ${password ? 'active' : ''}`}>비밀번호</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="eyebutton" onClick={toggleShowPassword}>
              <img src={showPassword ? eyeOpen : eyeClosed} alt="Toggle Password Visibility" />
            </button>
          </div>
          <button type="submit" className="login-button">로그인</button>
        </form>
        <p className="signup">계정이 없다면? <a href="/signup">가입하기</a></p>
      </div>
    </div>
  );
};

export default Info;