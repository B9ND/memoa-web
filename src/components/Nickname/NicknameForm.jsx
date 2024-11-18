import React, { useState } from 'react';
import del from '../../assets/del.svg';
import inputIcon from '../../assets/input-icon.svg';

const NicknameForm = ({ signupData, setSignupData }) => {
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [duplicateMessage, setDuplicateMessage] = useState("중복확인을 해주세요");

  const handleDuplicateCheck = () => {
    setIsDuplicateChecked(true);
    if (signupData.nickname === "여승원") {
      setDuplicateMessage("이미 사용중인 이름입니다");
    } else {
      setDuplicateMessage("중복확인!");
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
        <button type="button" className="duplicate-check-button" onClick={handleDuplicateCheck}>
          중복 확인
        </button>
      </div>
      <div className={`duplicate-message ${isDuplicateChecked && duplicateMessage === "중복확인!" ? 'success' : ''}`}>
        {duplicateMessage}
      </div>
    </>
  );
};

export default NicknameForm;
