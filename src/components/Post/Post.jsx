import React from "react";
import "./index.css";

const Post =()=>{
    const titleList=[
        {
            id:1,
            name:"지존진교",
            profileImg:"",
            title:"국어 고1 천재 노트필기 공유",
            day:"2024.08.33",
            mainImg:"",
            commentCount: "999+",
            heartCount: "999+",
            isBookmark: false,
            subTag:"국어",
            rankTag:"고등",
            gradeTag:"1학년"
        },
    ]
    const clickBookmark =()=>{
        let bookmark = titleList[0].isBookmark
        if (bookmark == false){
            titleList[0].isBookmark = true
        }
        else if (bookmark == true){
            titleList[0].isBookmark = false
        }
        console.log(titleList[0].isBookmark)
    }
    // const subjectFilter=["국어", "사회", "수학","영어","과학","한국사"]
    // const gradeFilter = ["1학년", "2학년", "3학년", "4학년", "5학년", "6학년"]
    // const rankFilter=["초등", "중등", "고등"]
    
    return(
        <>
            <div className="postHead">
                <img src={titleList[0].profileImg}/>
                <div>{titleList[0].name}</div>
                <span>{titleList[0].day}</span>
            </div>
            <div className="mainImg">
                <img src={titleList[0].mainImg}/>
            </div>
            <div className="board">
                <div className="tag">
                    <div>{titleList[0].subTag}</div>
                    <div>{titleList[0].rankTag}</div>
                    <div>{titleList[0].gradeTag}</div>
                </div>
                <div className="postTitle">{titleList[0].title}</div>
                <div className="icons">
                    <div className="selectOne">
                        <span>comment</span>
                        <span>heart</span>
                    </div>
                    <div className="selectTwo" onClick={clickBookmark}>bookmark</div>
                </div>
            </div>
        </>
    )

}

export default Post;