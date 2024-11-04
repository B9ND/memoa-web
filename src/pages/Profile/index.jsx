import Header from "../../components/Header";
import Post from "../../components/Post";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [ myData, setMyData ] = useState({
    email: "",
    nickname: "",
    description: "",
    profileImage: "",
  });

  const [ isMine, setIsMine ] = useState(false);
  const [ isFollow, setIsFollow ] = useState(true);
  const [ followings, setFollowings ] = useState([]);
  const [ myPost, setMyPost ] = useState([]);

  const getMe = async () => {
    try{
      await memoaAxios.get('/auth/me').then((res)=>setMyData(res.data))
    }catch(err){
      console.log(err)
    }
  }
  
  const getUser = async () => {
    try{
      const res = await memoaAxios.get('/auth/user', {params : {username : userName}})
      getMe()
      if(res.data.nickname == myData.nickname){
        setIsMine(true)
      }else{
        setUserData(res.data)
      }
      getFollowings()
    }catch(err){
      console.log(err)
    }
  }

  const getFollowings = async () => {
    try{
      const res = await memoaAxios.get('/follow/followings', {params: {user : userName}})
      if(res){
        setFollowings(res.data)
      }
    }catch(err){
      console.log(err)
    }
  }

  const getMyPost = async () => {
    try{
      await memoaAxios.get('/post/user', {params: {author: userName}}).then((res)=>setMyPost(res.data))
    }catch(err){
      console.log(err)
    }
  }


  useEffect(()=>{
    getUser()
    getMyPost()
  },[])

  return (
    <div className="head-main">
      <Header />
      <div className="profile-container">
        <div className="user-pro-img">
          <img
            src={userData.profileImage}
            style={{ width: "110px", height: "110px", borderRadius:'999px'}}
          />
        </div>
        <div className="user-info-container">
          <div className="user-introduce">
            <div>
              <div>{userData.nickname}</div>
              <button
                className={isFollow ? "following" : "follower"}
                style={{ display: isMine || "none" }}
              >
                {isFollow ? '팔로잉' : '팔로우'}
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
      <Post post={myPost} />
    </div>
  );
};

export default Profile;
