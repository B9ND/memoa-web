import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"
import './index.css'

const Layout = () => {
  return (
    <div className="Layout">
      <Sidebar></Sidebar>
      <Header></Header>
    </div>
  )
}

export default Layout