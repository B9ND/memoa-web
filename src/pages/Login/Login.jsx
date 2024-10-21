import Banner from '../../components/Banner/Banner';
import Info from '../../components/Info/Info';
import './index.css';

const Login = () => {
  const isLogin = true; // 로그인 페이지로 설정
  return (
    <div className="login-home">
      <Banner isLogin={isLogin} />
      <Info isLogin={isLogin} />
    </div>
  );
};

export default Login;
