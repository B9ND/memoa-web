import Banner from '../../components/Banner';
import Info from '../../components/Info';
import './style.css';

const Signup = () => {
  const isLogin = false; // 회원가입 페이지로 설정
  return (
    <div className="signup-home">
      <Banner isLogin={isLogin} />
      <Info isLogin={isLogin} />
    </div>
  );
};

export default Signup;
