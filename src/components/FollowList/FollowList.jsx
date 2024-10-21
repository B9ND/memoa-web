import { Link, useParams } from "react-router-dom";
import "./index.css";

const FollowList = () => {
  let { followState, username } = useParams();
  followState = followState.substring(1)
  
  const following = [
    {
      email: "cugar@gmail.com",
      nickname: "cugar0000000",
      description: "여승팔",
      profileImage: "../../src/assets/base-profile.png",
    },
    {
      email: "legolove08@gmail.com",
      nickname: "김민규",
      description: "B9ND",
      profileImage: "../../src/assets/base-profile.png",
    },
  ];
  const followers = [
    {
      email: "cugar@gmail.com",
      nickname: "cugar",
      description: "여승원",
      profileImage: "../../src/assets/base-profile.png",
    },
    {
      email: "legolove08@gmail.com",
      nickname: "김민규",
      description: "B9ND 1짱.",
      profileImage: "../../src/assets/base-profile.png",
    },
  ];
  return (
    <>
      <div className="follow-navs">
        {followState == 'following' ? (
          <>
            <button className="follow-nav-focused">팔로잉</button>
            <Link to={`/follow/${username}/:followers`} className="follow-nav">
              팔로워
            </Link>
          </>
        ) : (
          <>
            <Link to={`/follow/${username}/:following`} className="follow-nav">
              팔로잉
            </Link>
            <button className="follow-nav-focused">팔로워</button>
          </>
        )}
      </div>
      <div className="follow-list">
        {followState == 'following' ? (
          following.map((k, idx) => (
            <Link
              to={`/profile/:${k.nickname}`}
              className="follow-item"
              key={idx}
            >
              <img src={k.profileImage} alt="" className="follow-item-img" />
              <div className="follow-item-info">
                <div className="follow-item-name">{k.nickname}</div>
                <div className="follow-item-email">{k.email}</div>
              </div>
            </Link>
          ))
        ) : (
          followers.map((k, idx) => (
            <Link
              to={`/profile/:${k.nickname}`}
              className="follow-item"
              key={idx}
            >
              <img src={k.profileImage} alt="" className="follow-item-img" />
              <div className="follow-item-info">
                <div className="follow-item-name">{k.nickname}</div>
                <div className="follow-item-email">{k.email}</div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default FollowList;
