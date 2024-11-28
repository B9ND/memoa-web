import React, { useState } from 'react';
import eyeOpen from '../../assets/eye_1.svg';
import eyeClosed from '../../assets/eye_2.svg';
import inputIcon from '../../assets/input-icon.svg';

const PasswordForm = ({ signupData, setSignupData, confirmPassword, setConfirmPassword, handleNextStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePassword = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
    setConfirmPasswordError(''); // 비밀번호 변경 시 오류 메시지 초기화
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(''); // 비밀번호 확인 변경 시 오류 메시지 초기화
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(signupData.password)) {
      setConfirmPasswordError('비밀번호는 8자리 이상, 문자와 숫자가 포함되어야 합니다.');
      return;
    }
    if (signupData.password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setConfirmPasswordError(''); // 오류가 없을 경우 메시지 초기화
    handleNextStep(e); // 비밀번호가 유효하고 일치하면 다음 단계로 이동
  };

  return (
    <div className="password-form-wrapper">
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" alt="Input Icon" />
        <label className={`floating-label ${signupData.password ? 'active' : ''}`}>
          비밀번호
          <span className={`pwcriteria ${signupData.password ? 'active' : ''}`}> (8자리 이상, 숫자포함)</span>
        </label>
        <input
          className='long-input'
          type={showPassword ? "text" : "password"} 
          value={signupData.password}
          name='password'
          onChange={handlePassword}
          autoComplete='off'
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
          onChange={handleConfirmPassword}
          autoComplete='off'
        />
        <button type="button" className="eyebutton" onClick={toggleShowConfirmPassword}>
          <img src={showConfirmPassword ? eyeOpen : eyeClosed} alt="Toggle Password Visibility" />
        </button>
      </div>
      {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
      <button
        type="button"
        className="login-button"
        onClick={handleSubmit}
      >
        다음으로
      </button>
    </div>
  );
};

export default PasswordForm;
