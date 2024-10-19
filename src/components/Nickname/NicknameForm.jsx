import React, { useState } from 'react';
import del from '../../assets/del.svg';
import inputIcon from '../../assets/input-icon.svg';

const NicknameForm = ({ nickname, setnickname }) => {
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [duplicateMessage, setDuplicateMessage] = useState("중복확인을 해주세요");

  const handleDuplicateCheck = () => {
    setIsDuplicateChecked(true);
    if (nickname === "여승원") {
      setDuplicateMessage("이미 사용중인 이름입니다");
    } else {
      setDuplicateMessage("중복확인!");
    }
  };

  return (
    <>
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" alt="Input Icon" />
        <label className={`floating-label ${nickname ? 'active' : ''}`}>별명</label>
        <input
          className='short-input'
          type="text"
          value={nickname}
          onChange={(e) => setnickname(e.target.value)}
        />
        <button type="button" className="short-Delbutton" onClick={() => setnickname('')}>
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
