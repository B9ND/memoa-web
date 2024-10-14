import React, { useState } from 'react';
import './Nickname.css';
import del from '../../assets/del.svg';
import inputIcon from '../../assets/input-icon.svg';

const NicknameForm = ({ nickname, setnickname }) => {
  return (
    <>
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" />
        <label className={`floating-label ${nickname ? 'active' : ''}`}>별명</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setnickname(e.target.value)}
        />
        <button type="button" className="Delbutton" onClick={() => setnickname('')}>
          <img src={del} alt="Clear nickname" />
        </button>
      </div>
    </>
  );
};

export default NicknameForm;
