
import '../styles/Hero.css';  // styles 폴더에서 CSS 파일을 불러옴

const Hero = () => {
  return (
    <div className="hero">
      <h1>기록하고,</h1>
      <h1>공유하고,</h1>
      <h1>활용하는,</h1>
      <h1 className='gap'>가장 <span className="highlight"> 똑똑한</span> SNS —</h1>
      <button className="hero-button">프로젝트 로고</button>
    </div>
  );
};

export default Hero;