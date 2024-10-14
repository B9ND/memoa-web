import React, { useState } from 'react';
import './EmailVerification.css'; // 필요한 스타일을 적용하는 CSS 파일
import del from '../../assets/del.svg';
import inputIcon from '../../assets/input-icon.svg';

const EmailVerificationForm = ({ email, setEmail, verificationCode, setVerificationCode, handleSendCode }) => {
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호가 전송되었는지 상태 확인
  const [code, setCode] = useState(''); // 숨겨진 input의 상태 (최종 입력된 코드)

  const handleSendEmailCode = (e) => {
    e.preventDefault();
    handleSendCode(); // 이메일 인증번호 전송 로직 호출
    setIsCodeSent(true); // 인증번호 전송 후 입력 필드 활성화
  };

  // 입력 변경 핸들러: 값은 숨겨진 input에서 관리
  const handleCodeChange = (e) => {
    const newCode = e.target.value.slice(0, 6); // 최대 6자리
    setCode(newCode);
  };

  const handleResendCode = () => {
    console.log("인증코드 재발송");
    // 인증코드 재발송 로직 추가
  };

  // 코드 박스에 개별적으로 입력값을 보여주기 위한 함수
  const getCodeBoxValue = (index) => {
    return code[index] || ''; // 코드가 있으면 해당 인덱스 값, 없으면 빈 값
  };

  return (
    <>
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" alt="input-icon" />
        <label className={`floating-label ${email ? 'active' : ''}`}>이메일</label>
        <input
          className='email-check'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" className="Delbutton" onClick={() => setEmail('')}>
          <img src={del} alt="Clear Email" />
        </button>
        <button type="button" className="send-code-button" onClick={handleSendEmailCode}>
          이메일 인증
        </button>
      </div>

      {isCodeSent && (
        <>
          {/* 숨겨진 input */}
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            maxLength={6}
            style={{ position: 'absolute', left: '-9999px' }} // 화면 밖으로 숨김
          />
          
          {/* 보이는 코드 박스 */}
          <div className="code-input-wrap">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="code-box">
                {getCodeBoxValue(index)}
              </div>
            ))}
          </div>
          <button type="button" className="resend-code-button" onClick={handleResendCode}>
            인증코드 재발송
          </button>
        </>
      )}
    </>
  );
};

export default EmailVerificationForm;
