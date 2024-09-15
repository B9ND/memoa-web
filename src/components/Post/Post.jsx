import React from "react";
import "./index.css";
import { MdAccountCircle, MdOutlineComment, MdBookmarkBorder} from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";


const Post =()=>{
    const titleList=
        {
            id:1,
            name:"지존진교",
            profileImg: "src/assets/profile-img.png",
            title:"국어 고1 천재 1-2 노트필기 공유합니다",
            day:"2024.08.33",
            mainImg:"src/assets/main-img.png",
            commentCount: 999,
            heartCount: 999,
            isBookmark: false,
            subTag:"국어",
            rankTag:"고등",
            gradeTag:"1학년"
        }
    // const subjectFilter=["국어", "사회", "수학","영어","과학","한국사"]
    // const gradeFilter = ["1학년", "2학년", "3학년", "4학년", "5학년", "6학년"]
    // const rankFilter=["초등", "중등", "고등"]
    
    // if (titleList.heartCount>=999){
    //     titleList.heartCount = "999+"
    // }
    // if (titleList.commentCount>=999){
    //     titleList.commentCount = "999+"
    // }

    return(
        <>
        <div className="post-container">
            <div className="post-head">
                <img src={titleList.profileImg}/>
                <div className="user-name">{titleList.name}</div>
                <div className="post-dot">•</div>
                <span>{titleList.day}</span>
            </div>
            <div className="main-img">
                <img src={titleList.mainImg}/>
            </div>
            <div className="post-footer">
                <div className="icons">
                    <div className="post-state">
                        <div className="post-comment">
                            <MdOutlineComment style={{width:'24px', height:'24px'}}/>
                            <span>{titleList.commentCount >= 999 ? '999+' : titleList.commentCount}</span>
                        </div>
                        <div className="post-heart">
                            <FaRegHeart style={{width:'24px', height:'24px'}}/>
                            <span>{titleList.heartCount >= 999 ? '999+' : titleList.heartCount}</span>
                        </div>
                    </div>
                    <div className="post-state-two" >
                        <MdBookmarkBorder style={{width:'28px', height:'28px'}}/>
                    </div>
                </div>
            <div className="post-board">
                <div className="post-tag">
                    <div>{titleList.subTag}</div>
                    <div>{titleList.rankTag}</div>
                    <div>{titleList.gradeTag}</div>
                </div>
            </div>
            <div className="post-title">{titleList.title}</div>
        </div>
        </div>
        <div>아아악</div>
        </>
    )

}

export default Post;