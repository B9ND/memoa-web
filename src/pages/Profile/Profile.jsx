
import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Post from "../../components/Post/post"
const Profile = () => {
  return (
    <div className="layout">
      <Sidebar/>
      <div className="head-main">
        <Header/>
        <Post/>
      </div>
    </div>
  )
}

export default Profile