/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useToggle from "../../hooks/toggle/useToggle";
import './style.css'

const FollowButton = ({ targetNickname, isFollowed }) => {
  const [ isHover, setIsHover ] = useState(false);
  const apiReq = ['/follow', {}, {params : {nickname : targetNickname}}]

  const {...toggle} = useToggle()

  useEffect(()=>{
    if(isFollowed !== ''){
      toggle.setState(isFollowed)
    }
  }, [isFollowed])

  return (
    <div onClick={()=>toggle.toggleContent(apiReq)}>
      {toggle.state
        ? <div className={isHover ? "follow-button unfollow" : "follow-button already-follow"} onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>{isHover ? '언팔로우' : '팔로잉'}</div>
        : <div className="follow-button follow">팔로우</div>
      }
    </div>
  )
};

export default FollowButton;
