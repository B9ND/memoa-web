import { Link, useParams } from "react-router-dom";
import FollowButton from "../../components/FollowButton";
import { useEffect } from "react";
import useFollow from "../../hooks/follow/useFollow";

const FollowList = () => {
  const follow = useFollow();
  let { followState, username } = useParams();
  followState = followState.substring(1)

  useEffect(()=>{
    follow.getFollowers(username)
    follow.getFollowings(username)
  }, [])

  return (
      <div className="follow-list">
        {followState == 'following'
          ? follow.followings
          : follow.followers
            .map((item, index) => (
              <Link
                to={`/profile/:${item.nickname}`}
                className="follow-item"
                key={index}
              >
                <img src={item.profileImage} alt="" className="follow-item-img" />
                <div className="follow-item-info">
                  <div className="follow-item-name">{item.nickname}</div>
                  <div className="follow-item-email">{item.email}</div>
                  <FollowButton user={item.nickname} isFollowersPage={followState != 'following'}/>
                </div>
              </Link>
            ))}
      </div>
  )
}

export default FollowList