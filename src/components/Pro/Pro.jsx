import React from "react";
import "./index.css";
import { useParams } from "react-router-dom";

const Pro = () => {
  const userInfo = [
    {
      name: "지존진교",
      profileImg: "../src/assets/profile-img.png",
      introduce: "나는지존짱짱",
      postCount: 12,
      followerCount: 123,
      followCount: 234,
    },
    {
      name: "cugar",
      profileImg: "../src/assets/profile-img.png",
      introduce: "나는여승원뚠뚠",
      postCount: 12,
      followerCount: 123,
      followCount: 234,
    },
  ];

  const index = 0;

  return (
    <div className="profile-container">
      <div className="user-pro-img">
        <img
          src={userInfo[index].profileImg}
          style={{ width: "160px", height: "160px" }}
        />
      </div>
      <div className="user-info-container">
        <div className="user-introduce">
          <div>{userInfo[index].name}</div>
          <span>{userInfo[index].introduce}</span>
        </div>
        <div className="user-information">
          <div>
            작성한 글 <span className="user-number">{userInfo[index].postCount}</span>
          </div>
          <div>
            팔로워 <span className="user-number">{userInfo[index].followerCount}</span>
          </div>
          <div>
            팔로우 <span className="user-number">{userInfo[index].followCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pro;
