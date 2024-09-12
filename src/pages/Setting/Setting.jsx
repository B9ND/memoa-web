import Header from "../../components/Header/Header"
import './index.css'

const Setting = () => {
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
                  <button className="setting-fix-info">수정하기</button>
                </div>
              </div>
              <div className="setting-email"></div>
              <div className="setting-school"></div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Setting