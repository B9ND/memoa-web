import "./style.css";

/* eslint-disable */
const Ad = ({ detail }) => {
  return (
    <div className="ad">
      <a href={detail.adLink} target='_blank' className="ad-link">
      <img src={detail.adImg}  alt="" className="ad-img"/>
      </a>
    </div>
  );
};

export default Ad;
