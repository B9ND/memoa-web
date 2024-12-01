import Header from "../../components/Header";
import Post from "../../components/Post";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import memoaAxios from "../../libs/axios/instance";
import useFollow from "../../hooks/follow/useFollow";
import BaseProfileImg from '../../assets/base-profile.png'
import './style.css'
import FollowButton from "../../components/FollowButton";
import ConetentsNotFound from "../../components/ContentsNotFound";

const Profile = () => {
  const { username } = useParams();
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
    },
    followed: true
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
  const [ post, setPost ] = useState([]);
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
      .then((res) => setPost(res.data))
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
              {isMine || <FollowButton targetNickname={username} isFollowed={userData.followed}/>}
            </div>
            <span>{userData.description}</span>
          </div>
          <div className="user-information">
            <div className="detail-container">
              작성한 글
              <span className="user-number">
                {post.length}
              </span>
            </div>
            <Link to={`/follow/${username}/followers`} className="detail-container">
              팔로워
              <span className="user-number">
                {follow.followers.length}
              </span>
            </Link>
            <Link to={`/follow/${username}/followings`} className="detail-container">
              팔로우
              <span className="user-number">
                {follow.followings.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
      {post.length != 0
      ? <Post post={post} />
      : <ConetentsNotFound title="작성한 글이 없네요.." subTitle="글 작성하러 가기" goTo="/write"/>}
    </div>
  );
};

export default Profile;
