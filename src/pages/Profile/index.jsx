import Header from "../../components/Header";
import Post from "../../components/Post";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import memoaAxios from "../../libs/axios/instance";
import BaseProfileImg from '../../assets/base-profile.png'
import './style.css'

const Profile = () => {
  const { username } = useParams();
  const userName = username.replace(":", "");
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
  const [ isFollow, setIsFollow ] = useState(true);
  const [ followings, setFollowings ] = useState([]);
  const [ followers, setFollowers ] = useState([]);
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
      await memoaAxios.get('/user', {params : {username : userName}}).then((res) => setUserData(res.data))
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

  const getFollowings = async () => {
    try{
      await memoaAxios.get('/follow/followings', {params: {user : userName}}).then((res)=>setFollowings(res.data))
    }catch(err){
      console.log(err)
    }
  }

  const getFollowers = async () => {
    try{
      await memoaAxios.get('/follow/followers', {params: {user : userName}}).then((res)=>setFollowers(res.data))
    }catch(err){
      console.log(err)
    }
  }

  const getUserPost = async () => {
    try{
      await memoaAxios.get('/post/user', {params: {author: userName}}).then((res)=>setMyPost(res.data))
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getMe()
    getUser()
    getUserPost()
    getFollowings()
    getFollowers()
  },[ username ])

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
                className={isFollow ? "follow-ing" : "follow-er"}
                style={isMine ? { display: "none" } : { display: 'flex' }}
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
                {myPost.length}
              </span>
            </div>
            <Link to={`/follow/:${userName}/:followers`} className="detail-container">
              팔로워
              <span className="user-number">
                {followings.length}
              </span>
            </Link>
            <Link to={`/follow/:${userName}/:following`} className="detail-container">
              팔로우
              <span className="user-number">
                {followers.length}
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
