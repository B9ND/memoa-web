import Header from "../../components/Header/Header"
import Boards from "../../components/Boards/Boards"
import Ads from "../../components/Ads/Ads"
import './index.css'

const Home = () => {
  return (
      <div className="head-main">
        <Header />
        <div className="home-main">
          <Boards />
          <Ads />
        </div>
      </div>
  )
}

export default Home