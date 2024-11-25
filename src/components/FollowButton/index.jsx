/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useToggle from "../../hooks/toggle/useToggle";
import './style.css'
import { useParams } from "react-router-dom";

const FollowButton = ({ targetNickname, myNickname, followers }) => {
  const apiReq = ['/follow', {}, {params : {nickname : targetNickname}}]
  let { username } = useParams();
  username = username.replace(":", '');

  const {...toggle} = useToggle(apiReq, username)

  useEffect(()=>{
    if (followers.length != 0 && myNickname.length != 0) {
      toggle.setState(followers.some((user) => user.nickname === myNickname))
    }
  }, [followers, myNickname])


  return (
    <div onClick={()=>toggle.toggleContent()}>
      {toggle.state
        ? <div className="follow-button already-follow">팔로잉</div>
        : <div className="follow-button follow">팔로우</div>
      }
    </div>
  )
};

export default FollowButton;
