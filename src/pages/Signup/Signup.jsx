import Banner from '../../components/Banner/Banner';
import Info from '../../components/Info/Info';
import './index.css';

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
