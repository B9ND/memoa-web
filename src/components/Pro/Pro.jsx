import React, { useEffect } from "react";
import "./index.css";
import { useLocation, useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";

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

const Pro = () => {
  const { username } = useParams();
  const UserName = username.replace(":", "");
  let userIndex = userInfo.findIndex((user) => user.name === UserName);

  console.log(userIndex);
  console.log(UserName);

  const location = useLocation();
  console.log(location)
  
  

  if (userIndex === -1) {
    return <div>This is not user</div>;
  }

  let isVisible = true;
  if (UserName === userInfo[0].name) {
    isVisible = false;
  }

  return (
    <div className="profile-container">
      <div className="user-pro-img">
        <img
          src={userInfo[userIndex].profileImg}
        />
      </div>
      <div className="user-info-container">
        <div className="user-introduce">
          <div>
            <div>{userInfo[userIndex].name}</div>
            <button
              className="follow"
              style={{ display: isVisible ? "block" : "none" }}
            >
              팔로잉
            </button>
          </div>
          <span>{userInfo[userIndex].introduce}</span>
        </div>
        <div className="user-information">
          <div>
            작성한 글{" "}
            <span className="user-number">{userInfo[userIndex].postCount}</span>
          </div>
          <div>
            팔로워{" "}
            <span className="user-number">
              {userInfo[userIndex].followerCount}
            </span>
          </div>
          <div>
            팔로우{" "}
            <span className="user-number">
              {userInfo[userIndex].followCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pro;
