import { useState } from "react"
import Header from "../../components/Header/Header"
import './index.css'
import FixingBox from "../../components/FixingBox/FixingBox"

const Setting = () => {

  const [ isFixing, setIsFixing ] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "pjmin0923@gmail.com",
    nickname: "지존재민",
    description: "zㅣ존 재민",
    profileImage: "../src/assets/base-profile.png"
  })

  const submit = () => {
    
  }

  return (
      <div className="head-main">
        <Header/>
        <div className="page-name">설정</div>
        <div className="setting-main">
          <div className="settings">
            <div className="setting-container">
              <div className="setting-profile">
                <img src={userInfo.profileImage} alt="" className="setting-profileimg"/>
                <div className="setting-user-info">
                  <FixingBox userInfo={userInfo} setUserInfo={setUserInfo} isFix={isFixing} whatFix='name' />
                  <FixingBox userInfo={userInfo} isFix={isFixing} whatFix='intro' />
                </div>
              </div>
              <div className="setting-at">
                <div className="setting-heading">이메일</div>
                <FixingBox userInfo={userInfo} isFix={isFixing} whatFix='email' />
              </div>
              <div className="setting-at">
                <div className="setting-heading">학교</div>
                <FixingBox userInfo={userInfo} isFix={isFixing} whatFix='school' />
              </div>
              <div className="setting-fix">
                <button className="setting-fix-button" onClick={()=>{setIsFixing(!isFixing); submit()}}>{isFixing == false ? '수정하기' : '수정 완료'}</button>
              </div>
            </div>
            <div className="setting-footer">
              서비스 정책
              <span style={{display:'flex', margin:'0'}}>
              <a href="" className="setting-terms">이용약관</a>
              <a href="" className="setting-privacy">개인정보취급방침</a>
              </span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Setting