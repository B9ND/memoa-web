import Header from "./Header"
import Sidebar from "./Sidebar"
import '../styles/Layout.css'

const Layout = () => {
  return (
    <div className="Layout">
      <Sidebar></Sidebar>
      <Header></Header>
    </div>
  )
}

export default Layout