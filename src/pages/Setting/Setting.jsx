import { useState } from "react"
import Header from "../../components/Header/Header"
import './index.css'

const Setting = () => {

  const [ isFixing, setIsFixing ] = useState(false);

  const userInfo = {
    userName:'지존재민',
    userIntro:'나는 지존짱짱',
    email:'pjmin0923@gmail.com',
    school:'대구소프트웨어마이스터고'
  }

  return (
      <div className="head-main">
        <Header/>
        <div className="page-name">설정</div>
        <div className="setting-main">
          <div className="settings">
            <div className="setting-container">
              <div className="setting-profile">
                <img src="src/assets/profile-img.png" alt="" className="setting-profileimg"/>
                <div className="setting-userInfo">
                  <div className="setting-user-name">{userInfo.userName}</div>
                  <div className="setting-user-intro">{userInfo.userIntro}</div>
                </div>
              </div>
              <div className="setting-at">
                <div className="setting-heading">이메일</div>
                <div className={isFixing == false ? 'setting-contain' : 'setting-contain-fixing'}>{userInfo.email}</div>
              </div>
              <div className="setting-at">
                <div className="setting-heading">학교</div>
                <div className={isFixing == false ? 'setting-contain' : 'setting-contain-fixing'}>{userInfo.school}</div>
              </div>
              <div className="setting-fix">
                <button className="setting-fix-button" onClick={()=>setIsFixing(!isFixing)}>{isFixing == false ? '수정하기' : '수정 완료'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Setting