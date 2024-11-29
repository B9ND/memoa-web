import { useEffect } from 'react';
import Banner from '../../components/Banner';
import Info from '../../components/Info';
import { removeTokens } from '../../libs/Cookie/cookie';
import './style.css';

const Login = () => {
  const isLogin = true; // 로그인 페이지로 설정
  
  useEffect(()=>{
    removeTokens()
  },[])

  return (
    <div className="login-home">
      <Banner isLogin={isLogin} />
      <Info isLogin={isLogin} />
    </div>
  );
};

export default Login;
