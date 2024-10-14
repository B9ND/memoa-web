import React, { useState } from 'react';
import './Login.css';
import EmailPasswordForm from '../EmailPassword/EmailPasswordForm';
import EmailVerificationForm from '../EmailVerification/EmailVerificationForm';
import PasswordForm from '../Password/PasswordForm';
import SchoolForm from '../School/SchoolForm';
import NicknameForm from '../Nickname/NicknameForm';

const Info = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [school, setSchool] = useState('');
  const [step, setStep] = useState(1);
  const [nickname, setnickname] = useState('');

  const handleClearEmail = () => setEmail('');
  
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  
  const handleSendCode = () => {
    console.log("인증번호를 전송합니다.");
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
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
              {step === 1 && (
                <div>
                  <EmailVerificationForm
                    email={email}
                    setEmail={setEmail}
                    verificationCode={verificationCode}
                    setVerificationCode={setVerificationCode}
                    handleSendCode={handleSendCode}
                  />
                  <button type="button" className="login-button" onClick={handleNextStep}>
                    다음으로
                  </button>
                  <div className='tc'>
                    계정을 생성함으로써, <span className='TU-highlights'>이용약관</span>과<span className='PI-highlights'>개인정보처리약관</span>에<br />동의하였음을 확인합니다.
                  </div>
                </div>
              )}
              {step === 2 && (
                <>
                  <PasswordForm
                    password={password}
                    setPassword={setPassword}
                    showPassword={showPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    showConfirmPassword={showConfirmPassword}
                    toggleShowPassword={() => setShowPassword(!showPassword)}
                    toggleShowConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                  <button type="button" className="login-button" onClick={handleNextStep}>
                    다음으로
                  </button>
                  <div className='tc'>
                    계정을 생성함으로써, <span className='TU-highlights'>이용약관</span>과<span className='PI-highlights'>개인정보처리약관</span>에<br />동의하였음을 확인합니다.
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <SchoolForm
                    school={school}
                    setSchool={setSchool}
                  />
                  <button type="button" className="login-button" onClick={handleNextStep}>
                    다음으로
                  </button>
                  <div className='tc'>
                    계정을 생성함으로써, <span className='TU-highlights'>이용약관</span>과<span className='PI-highlights'>개인정보처리약관</span>에<br />동의하였음을 확인합니다.
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <NicknameForm
                    nickname={school}
                    setnickname={setSchool}
                  />
                  <button type="button" className="login-button" onClick={handleNextStep}>
                    다음으로
                  </button>
                  <div className='tc'>
                    계정을 생성함으로써, <span className='TU-highlights'>이용약관</span>과<span className='PI-highlights'>개인정보처리약관</span>에<br />동의하였음을 확인합니다.
                  </div>
                </>
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