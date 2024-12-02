import React, { useState } from 'react';
import del from '../../assets/del.svg';
import inputIcon from '../../assets/input-icon.svg';
import instance from '../../libs/axios/instance.js';

const NicknameForm = ({ signupData, setSignupData, handleNextStep }) => {
  const [duplicateMessage, setDuplicateMessage] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      email: signupData.email,
      nickname: signupData.nickname,
      password: signupData.password,
      departmentId: signupData.departmentId,
    };
    try {
      const res = await instance.post('/auth/register', data);
      console.log('회원가입 성공:', res.data);
      setDuplicateMessage("사용 가능한 별명입니다!");
      setIsNicknameAvailable(true);
      handleNextStep(e); // 회원가입 성공 시 다음 단계로 이동
    } catch (error) {
      console.error('회원가입 실패:', error);
      if (error.response) {
        if (error.response.status === 403) {
          setDuplicateMessage("별명 중복 확인에 실패했습니다.");
        } else if (error.response.status === 500) {
          setDuplicateMessage("이미 있는 별명입니다");
        } else {
          setDuplicateMessage("회원가입에 실패했습니다.");
        }
      }
      setIsNicknameAvailable(false);
    }
  };

  const handleNicknameChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" alt="Input Icon" />
        <label className={`floating-label ${signupData.nickname ? 'active' : ''}`}>별명</label>
        <input
          className='long-input'
          type="text"
          value={signupData.nickname}
          name='nickname'
          onChange={handleNicknameChange}
          autoComplete='off'
        />
        <button type="button" className="long-Delbutton" onClick={() => setSignupData(prev => ({ ...prev, nickname: '' }))}>
          <img src={del} alt="Clear nickname" />
        </button>
      </div>
      <div className={`duplicate-message ${isNicknameAvailable ? 'success' : ''}`}>
        {duplicateMessage}
      </div>
      <button
        type="button"
        className="login-button"
        onClick={handleRegister}
      >
        다음으로
      </button>
    </>
  );
};

export default NicknameForm;
