/* eslint-disable react/prop-types */
import del from '../../assets/del.svg';
import eyeOpen from '../../assets/eye_1.svg';
import eyeClosed from '../../assets/eye_2.svg';
import inputIcon from '../../assets/input-icon.svg';
import { setCookie } from '../../libs/Cookie/cookie';
import { useNavigate } from 'react-router-dom';

const EmailPasswordForm = ({ loginData, setLoginData, showPassword, toggleShowPassword, handleClearEmail }) => {
  const nav = useNavigate()

  const login = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_KEY}/auth/login`, loginData, { withCredentials: true })
      .then((res)=>{
        setCookie('ACCESS_TOKEN', res.data.access, {path:'/'})
        setCookie('REFRESH_TOKEN', res.data.refresh, {path:'/'})
        nav('/')
      })
    } catch (err) {
      console.log('실패:', err);
      if(err.status == 401){
        showToast('이메일 혹은 비밀번호가 틀렸습니다.', 'ERROR')
      }
    }
  };

  const handleLogin = (e) => {
    const { name, value } = e.target
    setLoginData((prev)=>({...prev, [name]:value}))
  }

  return (
    <>
        <div className="inputWrap">
          <img src={inputIcon} className="input-icon" />
          <label className={`floating-label ${loginData.email ? 'active' : ''}`}>이메일</label>
          <input
            className='long-input'
            type="email"
            name='email'
            value={loginData.email}
            onChange={(e) => handleLogin(e)}
            autoComplete='off'
            />
          <button type="button" className="long-Delbutton" onClick={handleClearEmail}>
            <img src={del} alt="Clear Email" />
          </button>
        </div>
        <div className="inputWrap">
          <img src={inputIcon} className="input-icon" />
          <label className={`floating-label ${loginData.password && 'active' }`}>비밀번호</label>
          <input
            className='long-input'
            type={showPassword ? "text" : "password"}
            name='password'
            value={loginData.password}
            onChange={(e) => handleLogin(e)}
            autoComplete='off'
            />
          <button type="button" className="eyebutton" onClick={toggleShowPassword}>
            <img src={showPassword ? eyeOpen : eyeClosed} alt="Toggle Password Visibility" />
          </button>
        </div>
        <button onClick={login} className="login-button">로그인</button>
    </>
  );
};

export default EmailPasswordForm;
