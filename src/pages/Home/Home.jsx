import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"

const Home = () => {
  return (
    <div className="layout">
      <Sidebar/>
      <div className="head-main">
        <Header/>
        <span>sdf</span>
      </div>
    </div>
  )
}

export default Home