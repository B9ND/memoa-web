import { useEffect, useState } from "react";

const FollowButton = ( user, isFollowersPage ) => {
  const [ isHover, setIsHover ] = useState(false);
  const [ followState, setfollowState ] = useState('');

  useEffect(()=>{
    if (isHover != false) {
      setfollowState('unfollow')
    } else {
      setfollowState('following')
    }
  }, [ isHover ])

  useEffect(()=>{
    if (isFollowersPage) {
      console.log('dfasdf')
    } else {
      setfollowState('following')
    }
  }, [])

  switch (followState) {
    case "following":
      return <div className="follow-button already-follow" onMouseEnter={() => setIsHover(prev => !prev)}>팔로잉</div>
    case "unfollow":
      return <div className="follow-button unfollow" onMouseLeave={() => setIsHover(prev => !prev)}>언팔로우</div>
    case "notFollowing":
      return <div className="follow-button follow">팔로우</div>;
  }
};

export default FollowButton;
