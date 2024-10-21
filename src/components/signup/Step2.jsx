import React from 'react';

const Step2 = ({ name, setName, onNext }) => {
  return (
    <div>
      <h2>추가 정보 입력</h2>
      <div className="inputWrap">
        <label className={`floating-label ${name ? 'active' : ''}`}>이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} />
      </div>
      <button type="button" className="login-button" onClick={onNext}>
        다음으로
      </button>
    </div>
  );
};

export default Step2;
