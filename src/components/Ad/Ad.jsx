import "./index.css";

const Ad = ({ detail }) => {
  return (
    <div className="ad">
      <a href={detail.adLink}>
      <img src={detail.adImg} alt="" className="ad-img"/>
      </a>
    </div>
  );
};

export default Ad;
