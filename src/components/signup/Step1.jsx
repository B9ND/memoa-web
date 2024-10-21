import React from 'react';
import del from '../../assets/del.svg';
import eyeOpen from '../../assets/eye_1.svg';
import eyeClosed from '../../assets/eye_2.svg';
import inputIcon from '../../assets/input-icon.svg';

const Step1 = ({ email, setEmail, password, setPassword, showPassword, toggleShowPassword, handleClearEmail, onNext }) => {
  return (
    <div>
      <h2>이메일과 비밀번호 입력</h2>
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" />
        <label className={`floating-label ${email ? 'active' : ''}`}>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <button type="button" className="Delbutton" onClick={handleClearEmail}>
          <img src={del} alt="Clear Email" />
        </button>
      </div>
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" />
        <label className={`floating-label ${password ? 'active' : ''}`}>비밀번호</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type="button" className="eyebutton" onClick={toggleShowPassword}>
          <img src={showPassword ? eyeOpen : eyeClosed} alt="Toggle Password Visibility" />
        </button>
      </div>
      <button type="button" className="login-button" onClick={onNext}>
        다음으로
      </button>
    </div>
  );
};

export default Step1;
