import React, { useState } from 'react';
import './School.css';
import del from '../../assets/del.svg';
import inputIcon from '../../assets/input-icon.svg';

const SchoolForm = ({ school, setSchool }) => {
  const [selectedGrade, setSelectedGrade] = useState(null); // 선택된 학년 상태

  const handleSelectGrade = (grade) => {
    setSelectedGrade(grade); // 선택된 학년 업데이트
  };

  return (
    <>
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" />
        <label className={`floating-label ${school ? 'active' : ''}`}>학교</label>
        <input
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)} // 학교 입력 값 업데이트
        />
        <button type="button" className="Delbutton" onClick={() => setSchool('')}>
          <img src={del} alt="Clear School" />
        </button>
      </div>
      <div className="grade-buttons">
        <button
          type="button"
          className={`grade-button ${selectedGrade === 1 ? 'selected' : ''}`} // 1학년 선택 스타일
          onClick={() => handleSelectGrade(1)}
        >
          <span className='grade'>1학년</span>
        </button>
        <button
          type="button"
          className={`grade-button ${selectedGrade === 2 ? 'selected' : ''}`} // 2학년 선택 스타일
          onClick={() => handleSelectGrade(2)}
        >
          <span className='grade'>2학년</span>
        </button>
        <button
          type="button"
          className={`grade-button ${selectedGrade === 3 ? 'selected' : ''}`} // 3학년 선택 스타일
          onClick={() => handleSelectGrade(3)}
        >
          <span className='grade'>3학년</span>
        </button>
      </div>
    </>
  );
};

export default SchoolForm;
