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
    const { value } = e.target;

    if (value) {
      newCode[index] = value;
      setCode(newCode);
      if (index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    } else {
      if (newCode[index]) {
        newCode[index] = '';
        setCode(newCode);
        if (index < 5 && newCode[index + 1]) {
          document.getElementById(`code-input-${index + 1}`).focus();
        }
      } else {
        newCode[index] = '';
        setCode(newCode);
        if (index > 0) {
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
        {Array(6).fill().map((_, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="text"
            maxLength="1"
            className="code-input"
            value={code[index]}
            onChange={(e) => handleCodeChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
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
