import React, { useState } from 'react';
import './Login.css';
import EmailPasswordForm from './EmailPasswordForm';

const Info = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 현재 단계(컴포넌트 변경용)

  const handleClearEmail = () => {
    setEmail('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2); // 다음 단계로 이동
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
              <EmailPasswordForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
                handleClearEmail={handleClearEmail}
              />
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
            <p className="signup-Cont">가입해서 노트 정리 시작하기!</p>
            <form>
              {step === 1 ? (
                <>
                  <EmailPasswordForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    showPassword={showPassword}
                    toggleShowPassword={toggleShowPassword}
                    handleClearEmail={handleClearEmail}
                  />
                  <button type="button" className="login-button" onClick={handleNextStep}>
                    다음으로
                  </button>
                  <div className='tc'>
                    계정을 생성함으로써, <span className='TU-highlights'>이용약관</span>과
                    <span className='PI-highlights'>개인정보처리약관</span>에<br />동의하였음을 확인합니다.
                  </div>
                </>
              ) : (
                <div>
                  <h3>박재민 멍청이</h3>
                  <p>여승원 채고</p>
                  {/* 여기에 다른 폼 필드를 추가할 수 있음 */}
                </div>
              )}
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
