import React from "react";
import "./index.css";

const Pro=()=>{
    const userInfo={
        name:"지존진교",
        profileImg: "src/assets/profile-img.png",
        introduce:"나는지존짱짱",
        postCount : 12,
        followerCount: 123,
        followCount:234
    }
    return(
        <div className="profile-container">
            <div className="user-pro-img">
                <img src={userInfo.profileImg} style={{width:"160px", height:"160px"}} />
            </div>
            <div className="user-introduce">
                <div>{userInfo.name}</div>
                <span>{userInfo.introduce}</span>
            </div>
                <div className="user-information">
                    <div>작성한 글 <span className="user-number">{userInfo.postCount}</span></div>
                    <div>팔로워 <span className="user-number">{userInfo.followerCount}</span></div>
                    <div>팔로우 <span className="user-number">{userInfo.followCount}</span></div>
                </div>   
            </div>        
    )
}

export default Pro