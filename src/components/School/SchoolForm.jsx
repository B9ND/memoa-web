import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import inputIcon from '../../assets/input-icon.svg';
import del from '../../assets/del.svg';
import instance from '../../libs/axios/instance.js'

const SchoolForm = ({ school, setSchool, selectedGrade, setSelectedGrade, handleNextStep }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const searchTimerRef = useRef(null); // useRef를 사용하여 타이머 유지

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSchool(value);
    setError('');

    // 이전 타이머 취소
    clearTimeout(searchTimerRef.current);

    // 입력값이 비어있으면 검색 결과 초기화
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    // 새로운 검색 타이머 설정 (300ms 후 실행)
    searchTimerRef.current = setTimeout(() => {
      searchSchools(value);
    }, 300);
  };

  const searchSchools = async (term) => {
    if (!term.trim()) return;

    setIsSearching(true);
    try {
      console.log('요청 URL:', '/school/search');
      console.log('요청 파라미터:', { name: term });
      const res = await instance.get(`/school/search?search=${term}`, );
      console.log('서버 응답 데이터:', res.data); // 서버 응답 데이터 로그
      const data = res.data;
      if (Array.isArray(data)) {
        setSearchResults(data);
        if (data.length === 0) {
          setError('검색 결과가 없습니다.');
        }
      } else {
        throw new Error('서버 응답이 예상하지 못한 형식입니다.');
      }
    } catch (err) {
      console.error('오류 상세:', err);
      setError('학교 검색 중 오류가 발생했습니다.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSchoolSelect = (selectedSchool) => {
    setSchool(selectedSchool.name);
    setSearchResults([]);
  };

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => {
      clearTimeout(searchTimerRef.current);
    };
  }, []);

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!school || !selectedGrade) {
      setError('학교와 학년을 모두 선택해주세요.');
      return;
    }
    try {
      console.log('요청 URL:', '/school/search');
      console.log('요청 파라미터:', { name: school });
      const res = await axios.get('/school/search', { params: { name: school } });
      console.log('서버 응답 데이터:', res.data); // 서버 응답 데이터 로그
      if (Array.isArray(res.data) && res.data.length > 0) {
        handleNextStep(e);
      } else {
        setError('선택한 학교가 검색 결과에 없습니다.');
      }
    } catch (error) {
      console.error('서버 전송 에러:', error);
      setError('데이터 전송에 실패했습니다.');
    }
  };

  return (
    <>
      <div className="inputWrap">
        <img src={inputIcon} className="input-icon" alt="Input Icon" />
        <label className={`floating-label ${school ? 'active' : ''}`}>
          학교
        </label>
        <input
          className='long-input'
          type="text"
          value={school}
          onChange={handleSearchInput}
          autoComplete='off'
        />
        <button type="button" className="long-Delbutton" onClick={() => setSchool('')}>
            <img src={del} alt="Clear School" />
        </button>
      </div>
      {/* 검색 결과 드롭다운 */}
      {Array.isArray(searchResults) && searchResults.length > 0 && (
        <div className="search-results-dropdown">
          {searchResults.map((schoolItem, index) => (
            <button
              key={index}
              onClick={() => handleSchoolSelect(schoolItem)}
              className="search-result-item"
            >
              {schoolItem.name}
            </button>
          ))}
        </div>
      )}

      {isSearching && (
        <p className="search-status">검색 중...</p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      <div className="grade-buttons">
        <button
          type="button"
          className={`grade-button ${selectedGrade === 1 ? 'selected' : ''}`} // 1학년 선택 스타일
          onClick={() => handleGradeSelect(1)}
        >
          <span className='grade'>1학년</span>
        </button>
        <button
          type="button"
          className={`grade-button ${selectedGrade === 2 ? 'selected' : ''}`} // 2학년 선택 스타일
          onClick={() => handleGradeSelect(2)}
        >
          <span className='grade'>2학년</span>
        </button>
        <button
          type="button"
          className={`grade-button ${selectedGrade === 3 ? 'selected' : ''}`} // 3학년 선택 스타일
          onClick={() => handleGradeSelect(3)}
        >
          <span className='grade'>3학년</span>
        </button>
      </div>

      <button
        type="button"
        className="login-button"
        onClick={handleNext}
        disabled={!school}
      >
        다음으로
      </button>
    </>
  );
};

export default SchoolForm;
