import React from 'react';

const Step3 = ({ email, name, onNext }) => {
  return (
    <div>
      <h2>입력 정보 확인</h2>
      <p>이메일: {email}</p>
      <p>이름: {name}</p>
      <button type="button" className="login-button" onClick={onNext}>
        가입 완료
      </button>
    </div>
  );
};

export default Step3;
