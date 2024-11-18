import React, { useEffect, useState } from 'react';
import inputIcon from '../../assets/input-icon.svg';

const Departments = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('학과');

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setDropdownVisible(false);
  };

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
              <span className="dropbtn_word">{selectedMenu}</span>
            </button>
            {dropdownVisible && (
              <div className="dropdown-content">
                {['123', '456', '789', "여승원은 언제나 최고지", '1234'].map(
                  (item) => (
                    <div key={item} className="dropdown-index" onClick={() => handleMenuClick(item)}>
                      {item}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
