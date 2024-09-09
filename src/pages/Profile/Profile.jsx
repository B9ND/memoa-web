
import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Post from "../../components/Post/post"
import Pro from "../../components/Pro/Pro"

const Profile = () => {
  return (
    <div className="layout">
      <Sidebar/>
      <div className="head-main">
        <Header/>
        <Pro/>
        <Post/>
      </div>
    </div>
  )
}

export default Profile