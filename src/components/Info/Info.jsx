import { useState } from 'react';
import './Login.css';
import del from '../../assets/del.svg';
import eyeOpen from '../../assets/eye_1.svg';
import eyeClosed from '../../assets/eye_2.svg';
import inputIcon from '../../assets/input-icon.svg';
import signup_1 from '../signup/signup_1.jsx';

const Info = ({ isLogin }) => {
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
    <>
      {isLogin ? (
        <div className="login">
          <div className="login-box">
            <div className="login-logo" />
            <h2>로그인</h2>
            <p className="login-Cont">
              <span className="login-project">프로젝트</span> 계정으로 계속하기
            </p>
            <form>
            <div className="inputWrap">
              <img src={inputIcon} className="input-icon" />
              <label className={`floating-label ${email ? 'active' : ''}`}>이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
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
                onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="eyebutton" onClick={toggleShowPassword}>
                <img src={showPassword ? eyeOpen : eyeClosed} alt="Toggle Password Visibility" />
              </button>
            </div>
              <button type="submit" className="login-button">로그인</button>
            </form>
            <p className="login-signup-link">
              계정이 없다면? <a href="/signup">가입하기</a>
            </p>
          </div>
        </div>
      ) : (
        <div className="signup">
          <div className="signup-box">
            <div className="login-logo" />
            <h2>회원가입</h2>
            <p className="signup-Cont">
              가입해서 노트 정리 시작하기!
            </p>
            <form>
            <div className="inputWrap">
              <img src={inputIcon} className="input-icon" />
              <label className={`floating-label ${email ? 'active' : ''}`}>이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
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
                onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="eyebutton" onClick={toggleShowPassword}>
                <img src={showPassword ? eyeOpen : eyeClosed} alt="Toggle Password Visibility" />
              </button>
            </div>
              <button type="submit" className="login-button">다음으로</button>
              <div className='tc'>
                계정을 생성함으로써, <span className='TU-highlights'>이용약관</span>과
                <span className='PI-highlights'>개인정보처리약관</span>에<br />동의하였음을 확인합니다.
              </div>
            </form>
            <p className="login-signup-link">
              이미 계정이 있다면? <a href="/login">로그인</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Info;
