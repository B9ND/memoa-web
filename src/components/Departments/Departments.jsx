import React, { useEffect, useState } from 'react';
import inputIcon from '../../assets/input-icon.svg';
import instance from '../../libs/axios/instance.js';

const Departments = ({ school, handleNextStep, setSignupData }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('학과');
  const [departments, setDepartments] = useState([]);
  const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleMenuClick = (menu, id) => {
    setSelectedMenu(menu);
    setDropdownVisible(false);
    setIsDepartmentSelected(true);
    setSignupData(prev => ({ ...prev, departmentId: id })); // 학과 ID를 int형으로 저장
  };

  // 학교 이름으로 학과 검색
  const searchDepartments = async (schoolName) => {
    try {
      console.log('요청 URL:', `/school/search?search=${schoolName}`);
      const res = await instance.get(`/school/search?search=${schoolName}`);
      console.log('서버 응답 데이터:', res.data); // 서버 응답 데이터 로그
      const data = res.data;

      if (data.length > 0) {
        setDepartments(data[0].departments);
      } else {
        setDepartments([]);
        console.error('학과를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('서버 전송 에러:', error);
    }
  };

  // 컴포넌트가 마운트될 때 학과 검색 실행
  useEffect(() => {
    if (school) {
      searchDepartments(school);
    }
  }, [school]);

  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropbtn')) {
        setDropdownVisible(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="input-wrap">
          <div className="dropdown">
            <img src={inputIcon} className="input-icon" alt="Input Icon" />
            <button className="dropbtn" onClick={toggleDropdown}>
              <span className={`dropbtn_word ${selectedMenu !== '학과' ? 'selected' : ''}`}>
                {selectedMenu}
              </span>
            </button>
            {dropdownVisible && (
              <div className="dropdown-content">
                {departments.map((item) => (
                  <div key={item.id} className="dropdown-index" onClick={() => handleMenuClick(item.name, item.id)}>
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          type="button"
          className="login-button"
          onClick={handleNextStep}
          disabled={!isDepartmentSelected} // 학과가 선택되지 않으면 버튼 비활성화
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default Departments;
