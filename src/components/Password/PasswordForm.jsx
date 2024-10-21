import React, { useState } from 'react';
import eyeOpen from '../../assets/eye_1.svg';
import eyeClosed from '../../assets/eye_2.svg';
import inputIcon from '../../assets/input-icon.svg';
import axios from 'axios';

const PasswordForm = ({ password, setPassword, confirmPassword, setConfirmPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" alt="Input Icon" />
        <label className={`floating-label ${password ? 'active' : ''}`}>비밀번호</label>
        <input
          className='long-input'
          type={showPassword ? "text" : "password"} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" className="eyebutton" onClick={toggleShowPassword}>
          <img src={showPassword ? eyeOpen : eyeClosed} alt="Toggle Password Visibility" />
        </button>
      </div>
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" alt="Input Icon" />
        <label className={`floating-label ${confirmPassword ? 'active' : ''}`}>비밀번호 확인</label>
        <input
          className='long-input'
          type={showConfirmPassword ? "text" : "password"} 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="button" className="eyebutton" onClick={toggleShowConfirmPassword}>
          <img src={showConfirmPassword ? eyeOpen : eyeClosed} alt="Toggle Password Visibility" />
        </button>
      </div>
    </>
  );
};

export default PasswordForm;