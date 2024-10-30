import Header from "../../components/Header";
import Post from "../../components/Post";
import { Link, useParams, useLocation } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import memoaAxios from "../../libs/axios/instance";
import './style.css'

const Profile = () => {
  const { username } = useParams();
  const userName = username.replace(":", "");
  const [ userData, setUserData ] = useState(
    {
      email: "",
      nickname: "",
      description: "",
      profileImage: "",
    }
  );

  const [follow, following] = useState("팔로잉");

  const [ok, notok] = useState(true);

  const getMe = async () => {
    try{
      const res = await memoaAxios.get('/auth/me')
      setUserData(res.data)
    }catch(err){
      console.log(err)
    }
  }
  
  const getUser = async () => {
    try{
      const res = await memoaAxios.get('/auth/user', {params : {username:userName}})
      setUserData(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const changeFollow = () => {
    if (follow === "팔로잉") {
      following("팔로우");
      notok(false);
    } else if (follow === "팔로우") {
      following("팔로잉");
      notok(true);
    }
  };

  // if (userIndex === -1) {
  //   return <div>This is not user</div>;
  // }

  let isVisible = true;

  // if (userName === userInfo[0].nickname) {
  //   isVisible = false;
  // }

  useEffect(()=>{
    getUser()
  },[])

  return (
    <div className="head-main">
      <Header />
      <div className="profile-container">
        <div className="user-pro-img">
          <img
            src="../src/assets/base-profile.png"
            style={{ width: "110px", height: "110px" }}
          />
        </div>
        <div className="user-info-container">
          <div className="user-introduce">
            <div>
              <div>{userData.nickname}</div>
              <button
                onClick={changeFollow}
                className={ok ? "following" : "follower"}
                style={{ display: isVisible ? "befwqraglock" : "none" }}
              >
                {follow}
              </button>
            </div>
            <span>{userData.description}</span>
          </div>
          <div className="user-information">
            <div className="detail-container">
              작성한 글
              <span className="user-number">
                {/* 더미 나중 연결{userInfo[userIndex].postCount} */}
                10
              </span>
            </div>
            <Link to={`/follow/:${userName}/:followers`} className="detail-container">
              팔로워
              <span className="user-number">
                {/* 더미 나중 연결 {userInfo[userIndex].followerCount} */}
                12
              </span>
            </Link>
            <Link to={`/follow/:${userName}/:following`} className="detail-container">
              팔로우
              <span className="user-number">
                {/* {userInfo[userIndex].followCount} */}
                14
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Post />
    </div>
  );
};

export default Profile;
