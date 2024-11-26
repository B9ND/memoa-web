import { Link, useParams } from "react-router-dom";
import FollowButton from "../../components/FollowButton";
import { useEffect, useState } from "react";
import useFollow from "../../hooks/follow/useFollow";
import './style.css'
import memoaAxios from "../../libs/axios/instance";

const FollowList = () => {
  const follow = useFollow();
  const { followState, username } = useParams();
  const [ myData, setMyData ] = useState({});

  const getMe = async () => {
    try{
      await memoaAxios.get('/auth/me')
      .then((res)=>setMyData(res.data))
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    follow.getFollowers(username)
    follow.getFollowings(username)
    getMe()
  }, [])
  
  return (
      <div className="follow-list">
      { (followState == 'following' 
          ? follow.followings 
          : follow.followers
        ).map((item) => (
            <div
              className="follow-item"
              key={item.nickname}
            >
              <div className="follow-item-header">  
                <img src={item.profileImage} alt="" className="follow-item-img" />
                <Link className="follow-item-info" to={`/profile/${item.nickname}`}>
                  <div className="follow-item-name">{item.nickname}</div>
                  <div className="follow-item-email">{item.email}</div>
                </Link>
              </div>
              {myData != item.nickname && <FollowButton targetNickname={item.nickname} isFollowed={item.isFollowed} />}
            </div>
          ))
        }
      </div>
  )
}

export default FollowList