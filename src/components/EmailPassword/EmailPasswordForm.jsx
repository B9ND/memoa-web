import React from 'react';
import del from '../../assets/del.svg';
import eyeOpen from '../../assets/eye_1.svg';
import eyeClosed from '../../assets/eye_2.svg';
import inputIcon from '../../assets/input-icon.svg';
import instance from '../../libs/axios/instance';
import { setCookie } from '../../libs/Cookie/cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailPasswordForm = ({ userData, setUserData, showPassword, toggleShowPassword, handleClearEmail }) => {
  
  const login = async () => {
    // e.preventDefault();
    try {
      const res = await axios.post('/auth/login', {
        email: userData.email,
        password: userData.password,
      });
      if(res){
        setCookie('ACCESS_TOKEN', res.data.access)
        setCookie('REFRESH_TOKEN', res.data.refresh)
        console.log('성공', res.data);
        nav('/home')
      }
    } catch (err) {
      console.log('실패:', err);
    }
  };

  const handleLogin = (e) => {
    const { name, value } = e.target
    setUserData((prev)=>({...prev, [name]:value}))
    console.log(userData)
  }
  return (
    <>
        <div className="inputWrap">
          <img src={inputIcon} className="input-icon" />
          <label className={`floating-label ${userData.email ? 'active' : ''}`}>이메일</label>
          <input
            className='long-input'
            type="email"
            name='email'
            value={userData.email}
            onChange={(e) => handleLogin(e)} />
          <button type="button" className="long-Delbutton" onClick={handleClearEmail}>
            <img src={del} alt="Clear Email" />
          </button>
        </div>
        <div className="inputWrap">
          <img src={inputIcon} className="input-icon" />
          <label className={`floating-label ${userData.email && 'active' }`}>비밀번호</label>
          <input
            className='long-input'
            type={showPassword ? "text" : "password"}
            name='password'
            value={userData.password}
            onChange={(e) => handleLogin(e)} />
          <button type="button" className="eyebutton" onClick={toggleShowPassword}>
            <img src={showPassword ? eyeOpen : eyeClosed} alt="Toggle Password Visibility" />
          </button>
        </div>
        <button onClick={login} className="login-button">로그인</button>
    </>
  );
};

export default EmailPasswordForm;
