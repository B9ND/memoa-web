import React, { useState } from 'react';
import del from '../../assets/del.svg';
import inputIcon from '../../assets/input-icon.svg';

const EmailVerificationForm = ({ email, setEmail, handleSendCode }) => {
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
      // 값을 입력하면 현재 칸에 저장하고 다음 빈 칸으로 이동
      newCode[index] = e.target.value;
      setCode(newCode);
  
      const nextEmptyIndex = newCode.findIndex((value) => value === '');
      if (nextEmptyIndex !== -1) {
        document.getElementById(`code-input-${nextEmptyIndex}`).focus();
      } else if (index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    } else {
      // 값을 지우는 경우
      if (newCode[index]) {
        // 현재 칸에 값이 있으면 삭제하고 다음 칸으로 이동
        newCode[index] = '';
        setCode(newCode);
        if (index < 5) {
          document.getElementById(`code-input-${index + 1}`).focus();
        }
      } else {
        // 현재 칸이 비어있을 경우 이전 칸으로 이동
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
      // 현재 칸이 비어있을 때 이전 칸의 값 삭제
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
        <img src={inputIcon} className="input-icon" />
        <label className={`floating-label ${email ? 'active' : ''}`}>이메일</label>
        <input
          className='short-input'
          type="email"
          name='email'
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
            value={code[index]}
            onChange={(e) => handleCodeChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => focusOnFirstEmptyIndex}
            // onFocus={() => handleInputClick}
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
