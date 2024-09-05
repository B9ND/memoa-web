import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Boards from "../../components/Boards/Boards"

const Home = () => {
  return (
    <div className="layout">
      <Sidebar/>
      <div className="head-main">
        <Header />
        <Boards />
      </div>
    </div>
  )
}

export default Home