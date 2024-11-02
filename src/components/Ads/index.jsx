import Ad from "../Ad/Ad";
import "./styles.css";

const Ads = () => {
  const Ads = [
    { adId: 0, adImg: "src/assets/ad.png", adLink: "https://dodam.b1nd.com/" },
    { adId: 1, adImg: "src/assets/ad2.jpeg", adLink: "" },
    { adId: 2, adImg: "src/assets/ad3.png", adLink: "" },
  ];
  return (
    <div className="ads">
      {Ads.map((ad, index) => {
        return <Ad detail={ad} key={index} />;
      })}
    </div>
  );
};

export default Ads;
