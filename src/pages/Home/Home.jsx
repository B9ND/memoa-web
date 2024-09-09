import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Boards from "../../components/Boards/Boards"
import Ads from "../../components/Ads/Ads"
import './index.css'

const Home = () => {
  return (
    <div className="layout">
      <Sidebar/>
      <div className="head-main">
        <Header />
        <div className="home-main">
          <Boards />
          <Ads />
        </div>
      </div>
    </div>
  )
}

export default Home