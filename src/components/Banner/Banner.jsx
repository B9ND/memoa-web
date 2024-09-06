// import cloud from "../assets/cloud.svg"
import './index.css';
import cloud from '../../assets/cloud.svg'

const Banner = () => {
  return (
    <div className="hero">
      <img src={cloud} className="cloud-1" />
      <img src={cloud} className="cloud-2" />
      <h1>기록하고,</h1>
      <h1>공유하고,</h1>
      <h1>활용하는,</h1>
      <h1 className='gap'>가장 <span className="highlight"> 똑똑한</span>SNS <span className="highlight-bar">—</span></h1>
      <div className="hero-button">MEMO<span className='highlight-logo'>A</span></div>
    </div>
  );
};

export default Banner;  