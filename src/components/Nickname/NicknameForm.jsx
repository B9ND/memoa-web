import React, { useState } from 'react';
import del from '../../assets/del.svg';
import inputIcon from '../../assets/input-icon.svg';

const NicknameForm = ({ nickname, setnickname }) => {
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
        <button type="button" className="send-code-button">
          중복확인
        </button>
      </div>
    </>
  );
};

export default NicknameForm;
