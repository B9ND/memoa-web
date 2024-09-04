import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"

const Profile = () => {
  return (
    <div className="layout">
      <Sidebar/>
      <div className="head-main">
        <Header/>
      </div>
    </div>
  )
}

export default Profile