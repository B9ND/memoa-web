import React, { useState } from 'react';
import del from '../../assets/del.svg';
import inputIcon from '../../assets/input-icon.svg';

const EmailVerificationForm = ({ email, setEmail, verificationCode, setVerificationCode, handleSendCode }) => {
  const [code, setCode] = useState(Array(6).fill(''));
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendEmailCode = (e) => {
    e.preventDefault();
    handleSendCode();
    setIsCodeSent(true);
    focusOnFirstEmptyIndex();
  };

  const handleCodeChange = (e, index) => {
    const newCode = [...code];
    if (e.target.value) {
      newCode[index] = e.target.value;
      setCode(newCode);
      const nextEmptyIndex = newCode.findIndex((value) => value === '');
      if (nextEmptyIndex !== -1) {
        document.getElementById(`code-input-${nextEmptyIndex}`).focus();
      }
    } else {
      newCode[index] = '';
      setCode(newCode);
      if (index > 0) {
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

  return (
    <>
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" alt="input-icon" />
        <label className={`floating-label ${email ? 'active' : ''}`}>이메일</label>
        <input
          className='short-input'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" className="short-Delbutton" onClick={() => setEmail('')}>
          <img src={del} alt="Clear Email" />
        </button>
        <button type="button" className="send-code-button" onClick={handleSendEmailCode}>
          이메일 인증
        </button>
      </div>
      <div className="code-input-wrap">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="text"
            maxLength="1"
            className="code-input"
            onChange={(e) => handleCodeChange(e, index)}
            onClick={focusOnFirstEmptyIndex}
          />
        ))}
      </div>
      <button type="button" className="resend-code-button" onClick={handleResendCode}>
        인증코드 재발송
      </button>
    </>
  );
};

export default EmailVerificationForm;
