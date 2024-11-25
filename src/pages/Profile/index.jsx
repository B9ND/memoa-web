import Header from "../../components/Header";
import Post from "../../components/Post";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import memoaAxios from "../../libs/axios/instance";
import useFollow from "../../hooks/follow/useFollow";
import BaseProfileImg from '../../assets/base-profile.png'
import './style.css'
import FollowButton from "../../components/FollowButton";

const Profile = () => {
  let { username } = useParams();
  username = username.replace(":", "");
  const [ userData, setUserData ] = useState({
    email: "",
    nickname: "",
    description: "",
    profileImage: "",
    department: {
      name: "",
      grade: 0,
      school: "",
      subjects: [
        ""
      ]
    }
  });
  const [ myData, setMyData ] = useState({
    email: "",
    nickname: "",
    description: "",
    profileImage: "",
    department: {
      name: "",
      grade: 0,
      school: "",
      subjects: [
        ""
      ]
    }
  });
  const [ isMine, setIsMine ] = useState(false);
  const [ myPost, setMyPost ] = useState([]);
  const follow = useFollow();

  const getMe = async () => {
    try{
      await memoaAxios.get('/auth/me')
      .then((res)=>setMyData(res.data))
    }catch(err){
      console.log(err)
    }
  }
  
  const getUser = async () => {
    try{
      await memoaAxios.get('/user', {params : {username : username}})
      .then((res) => setUserData(res.data))
    }catch(err){
      console.log(err)
    }
  }

  const getUserPost = async () => {
    try{
      await memoaAxios.get('/post/user', {params: {author: username}})
      .then((res) => setMyPost(res.data))
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(myData.nickname != '' && userData.nickname != ''){
      if(myData.nickname == userData.nickname){
        setIsMine(true)
      }
    }
    if(userData.profileImage === ""){
      setUserData((prev)=>({...prev, profileImage: BaseProfileImg}))
    }
  },[myData, userData])


  useEffect(()=>{
    getMe()
    getUser()
    getUserPost()
    follow.getFollowers(username)
    follow.getFollowings(username)
  }, [ username ])

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
              {isMine || <FollowButton targetNickname={username} myNickname={myData.nickname} followers={follow.followers}/>}
            </div>
            <span>{userData.description}</span>
          </div>
          <div className="user-information">
            <div className="detail-container">
              작성한 글
              <span className="user-number">
                {myPost.length}
              </span>
            </div>
            <Link to={`/follow/:${username}/:follower`} className="detail-container">
              팔로워
              <span className="user-number">
                {follow.followers.length}
              </span>
            </Link>
            <Link to={`/follow/:${username}/:following`} className="detail-container">
              팔로우
              <span className="user-number">
                {follow.followings.length}
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
