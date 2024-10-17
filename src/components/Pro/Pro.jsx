import React, { useEffect } from "react";
import "./index.css";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
// import { useLocation } from "react-router-dom";

const userInfo = [
  {
    email: "Web@gmail.com",
    nickname: "지존진교",
    description: "나는 지존진교",
    profileImage: "../src/assets/base-profile.png",
  },
  {
    email: "cugar@gmail.com",
    nickname: "cugar",
    description: "나는 여승원",
    profileImage: "../src/assets/base-profile.png",
  },
];

const Pro = () => {
  const { username } = useParams();
  const UserName = username.replace(":", "");
  let userIndex = userInfo.findIndex((user) => user.nickname === UserName);
  const [follow, following] = useState("팔로잉");
  const [ok, notok] = useState(true);

  const changeFollow = () => {
    if (follow === "팔로잉") {
      following("팔로우");
      console.log(follow);
      notok(false);
    } else if (follow === "팔로우") {
      following("팔로잉");
      console.log(follow);
      notok(true);
    }
  };

  console.log(userIndex);
  console.log(UserName);

  const location = useLocation();
  console.log(location);

  if (userIndex === -1) {
    return <div>This is not user</div>;
  }

  let isVisible = true;

  if (UserName === userInfo[0].nickname) {
    isVisible = false;
  }

  return (
    <div className="profile-container">
      <div className="user-pro-img">
        <img
          src={userInfo[userIndex].profileImage}
          style={{ width: "110px", height: "110px" }}
        />
      </div>
      <div className="user-info-container">
        <div className="user-introduce">
          <div>
            <div>{userInfo[userIndex].nickname}</div>
            <button
              onClick={changeFollow}
              className={ok ? "following" : "follower"}
              style={{ display: isVisible ? "befwqraglock" : "none" }}
            >
              {follow}
            </button>
          </div>
          <span>{userInfo[userIndex].description}</span>
        </div>
        <div className="user-information">
          <div className="detail-container">
            작성한 글{" "}
            <span className="user-number">
              {/* 더미 나중 연결{userInfo[userIndex].postCount} */}
              10
            </span>
          </div>
          <div className="detail-container">
            팔로워{" "}
            <span className="user-number">
              {/* 더미 나중 연결 {userInfo[userIndex].followerCount} */}
              12
            </span>
          </div>
          <div className="detail-container">
            팔로우{" "}
            <span className="user-number">
              {/* {userInfo[userIndex].followCount} */}
              14
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pro;
