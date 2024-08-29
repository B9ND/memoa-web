import '../styles/Hero.css';
import cloud from "../assets/cloud.png"



const Hero = () => {
  return (
    <div className="hero">
      {/* <img src={cloud}/> */}
      <h1>기록하고,</h1>
      <h1>공유하고,</h1>
      <h1>활용하는,</h1>
      <h1 className='gap'>가장 <span className="highlight"> 똑똑한</span> SNS —</h1>
      <button className="hero-button">프로젝트 로고</button>
    </div>
  );
};

export default Hero;  