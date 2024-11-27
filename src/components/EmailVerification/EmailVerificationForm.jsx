import React, { useState, useEffect } from 'react';
import del from '../../assets/del.svg';
import inputIcon from '../../assets/input-icon.svg';
import instance from '../../libs/axios/instance';

const EmailVerificationForm = ({ signupData, setSignupData, handleNextStep }) => { 
  const [code, setCode] = useState(Array(6).fill(''));
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSendEmailCode = async (e) => { 
    e.preventDefault();
    if (!signupData.email) { 
      console.log('이메일을 입력하세요.');
      return; 
    } 
    try { 
      const res = await instance.get(`/auth/send-code`, { params: { email: signupData.email } }); 
      if (res) { 
        console.log('인증코드 전송 성공:', res.data); 
        setIsCodeSent(true); 
        focusOnFirstEmptyIndex(); 
      } 
    } catch (err) { 
      console.log('인증코드 전송 실패:', err); 
    } 
  }; 

  const certification = async () => { 
    try { 
      const res = await instance.post('/auth/verify-code', null, { params: { email: signupData.email, code: code.join('') }}); 
      if (res) { 
        console.log('인증 성공:', res.data); 
        setIsVerified(true);
      } 
    } catch (err) { 
      console.log('인증 실패:', err); 
      setIsVerified(false);
    } 
  }; 

  const handleCodeChange = (e, index) => { 
    const value = e.target.value; 
    if (value < 0 || value > 9) { 
      return; 
    } 
    const newCode = [...code]; 
    if (value) { 
      newCode[index] = value; 
      setCode(newCode); 
      const nextEmptyIndex = newCode.findIndex((value) => value === ''); 
      if (nextEmptyIndex !== -1) { 
        document.getElementById(`code-input-${nextEmptyIndex}`).focus(); 
      } else if (index < 5) { 
        document.getElementById(`code-input-${index + 1}`).focus(); 
      } 
    } else { 
      if (newCode[index]) { 
        newCode[index] = ''; 
        setCode(newCode); 
        if (index < 5) { 
          document.getElementById(`code-input-${index + 1}`).focus(); 
        } 
      } else { 
        if (index > 0) { 
          newCode[index - 1] = ''; 
          setCode(newCode); 
          document.getElementById(`code-input-${index - 1}`).focus(); 
        } 
      } 
    } 
  }; 

  const handleKeyDown = (e, index) => { 
    if (e.key === 'Backspace' && !code[index]) { 
      const newCode = [...code]; 
      if (index > 0) { 
        newCode[index - 1] = ''; 
        setCode(newCode); 
        document.getElementById(`code-input-${index - 1}`).focus(); 
      } 
    } 
  }; 

  const focusOnFirstEmptyIndex = () => { 
    const firstEmptyIndex = code.findIndex((value) => value === ''); 
    if (firstEmptyIndex !== -1) { 
      document.getElementById(`code-input-${firstEmptyIndex}`).focus(); 
    } 
  }; 

  const handleResendCode = () => { 
    console.log('인증코드 재발송'); 
  }; 

  const handleNextStepWithCertification = async (e) => { 
    e.preventDefault(); 
    await certification(); 
  };

  useEffect(() => {
    if (isVerified) {
      handleNextStep(); // 인증이 완료되면 자동으로 다음 단계로 이동
    }
  }, [isVerified, handleNextStep]);

  return (
    <> 
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" alt="Input Icon" /> 
        <label className={`floating-label ${signupData.email ? 'active' : ''}`}>이메일</label> 
        <input 
          className='short-input' 
          type="email" 
          name='email' 
          value={signupData.email} 
          onChange={(e) => setSignupData((prev) => ({ ...prev, email: e.target.value }))} 
          autoComplete='off' 
        /> 
        <button 
          type="button" 
          className="short-Delbutton" 
          onClick={() => setSignupData((prev) => ({ ...prev, email: '' }))}
        > 
          <img src={del} alt="Clear Email" /> 
        </button> 
        <button 
          type="button" 
          className="send-code-button" 
          onClick={handleSendEmailCode}
        > 
          이메일 인증 
        </button> 
      </div> 
      <div className="code-input-wrap"> 
        {Array(6).fill().map((_, index) => ( 
          <input 
            key={index} 
            id={`code-input-${index}`} 
            type="number" 
            inputMode="numeric" 
            pattern="[0-9]*" 
            maxLength="1" 
            className="code-input" 
            value={code[index]} 
            onChange={(e) => handleCodeChange(e, index)} 
            onKeyDown={(e) => handleKeyDown(e, index)} 
            onClick={() => focusOnFirstEmptyIndex()} 
            autoComplete='off' 
          /> 
        ))} 
      </div> 
      <button 
        type="button" 
        className="resend-code-button" 
        onClick={handleResendCode}
      > 
        인증코드 재발송 
      </button> 
      <button 
        type="button" 
        className="login-button" 
        onClick={handleNextStepWithCertification}
        // disabled={!isCodeSent || code.includes('')} // 인증 코드가 전송되고 모든 입력칸이 채워진 경우에만 버튼 활성화
      > 
        다음으로 
      </button> 
    </>
  ); 
};

export default EmailVerificationForm;
