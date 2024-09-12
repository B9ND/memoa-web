import Header from "../../components/Header/Header"
import './index.css'

const Setting = () => {
  return (
      <div className="head-main">
        <Header/>
        <div className="page-name">설정</div>
        <div className="setting-main">
          <div className="settings">
            <div className="setting-userinfo">
              <div className="setting-profile">
                <img src="src/assets/profile-img.png" alt="" className="setting-profileimg"/>
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