import React, { useState } from 'react';
import del from '../../assets/del.svg';
import inputIcon from '../../assets/input-icon.svg';
import instance from '../../libs/axios/instance.js';

const NicknameForm = ({ signupData, setSignupData, handleNextStep }) => {
  const [duplicateMessage, setDuplicateMessage] = useState("중복확인을 해주세요");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      email: signupData.email,
      nickname: signupData.nickname,
      password: signupData.password,
      departmentId: signupData.departmentId,
    };

    console.log('이메일:', signupData.email);
    console.log('닉네임:', signupData.nickname);
    console.log('비밀번호:', signupData.password);
    console.log('학과 ID:', signupData.departmentId);

    try {
      const res = await instance.post('/auth/register',  data );
      console.log('회원가입 성공:', res.data);
      setDuplicateMessage("회원가입 성공!");
      setIsNicknameAvailable(true);
      handleNextStep(e); // 회원가입 성공 시 다음 단계로 이동
    } catch (error) {
      console.error('회원가입 실패:', error);
      setDuplicateMessage("회원가입에 실패했습니다.");
      setIsNicknameAvailable(false);
    }
  };

  const handlenickname = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" alt="Input Icon" />
        <label className={`floating-label ${signupData.nickname ? 'active' : ''}`}>별명</label>
        <input
          className='short-input'
          type="text"
          value={signupData.nickname}
          name='nickname'
          onChange={handlenickname}
          autoComplete='off'
        />
        <button type="button" className="short-Delbutton" onClick={() => setSignupData(prev => ({ ...prev, nickname: '' }))}>
          <img src={del} alt="Clear nickname" />
        </button>
        <button type="button" className="duplicate-check-button" onClick={handleRegister}>
          중복 확인
        </button>
      </div>
      <div className={`duplicate-message ${isNicknameAvailable ? 'success' : ''}`}>
        {duplicateMessage}
      </div>
      <button
        type="button"
        className="login-button"
        onClick={handleRegister}
        disabled={!isNicknameAvailable} // 닉네임 중복 확인이 완료되지 않으면 버튼 비활성화
      >
        다음으로
      </button>
    </>
  );
};

export default NicknameForm;
