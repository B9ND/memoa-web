import React, { useState } from 'react';
import './Login.css';
import EmailPasswordForm from '../EmailPassword/EmailPasswordForm';
import EmailVerificationForm from '../EmailVerification/EmailVerificationForm';
import PasswordForm from '../Password/PasswordForm';
import SchoolForm from '../School/SchoolForm';
import NicknameForm from '../Nickname/NicknameForm';
import instance from '../../libs/axios/instance';

const Info = ({ isLogin }) => {
  const [ loginData, setLoginData ] = useState({email: '', password: '' });
  const [ signUpData, setSignUpData ] = useState({email: '', password: '' , nickname:''});

  const [verificationCode, setVerificationCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [school, setSchool] = useState('');
  const [step, setStep] = useState(1);

  const handleClearEmail = () => setLoginData({...loginData, email:''});
  
  const toggleShowPassword = () => setShowPassword(!showPassword);
  // const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  
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
            <div className="logo" />
            <h2>로그인</h2>
            <p className="login-Cont">
              <span className="login-project">프로젝트</span> 계정으로 계속하기
            </p>

              <EmailPasswordForm
                loginData={loginData}
                setLoginData={setLoginData}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
                handleClearEmail={handleClearEmail}/>

            <p className="login-signup-link">
              계정이 없다면? <a href="/signup">가입하기</a>
            </p>
          </div>
        </div>
      ) : (
        <div className="signup">
          <div className="signup-box">
            <div className="logo" />
            <h2>회원가입</h2>
            <p className="signup-Cont">가입해서 노트 정리 시작하기!</p>
              {step === 1 && (
                <div>
                  <EmailVerificationForm
                    signUpData={signUpData}
                    setSignUpData={setSignUpData}
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
                    signupData={signUpData}
                    setSignupData={setSignUpData}
                    showPassword={showPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    toggleShowPassword={() => setShowPassword(!showPassword)}
                    toggleShowConfirmPassword={() => setConfirmPassword(!confirmPassword)}
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
                    signupData={signUpData}
                    setSignupData={setSignUpData}
                  />
                  <button type="button" className="login-button" onClick={handleNextStep}>
                    다음으로
                  </button>
                  <div className='tc'>
                    계정을 생성함으로써, <span className='TU-highlights'>이용약관</span>과<span className='PI-highlights'>개인정보처리약관</span>에<br />동의하였음을 확인합니다.
                  </div>
                </>
              )}
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