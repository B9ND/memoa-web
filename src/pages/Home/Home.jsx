import Header from "../../components/Header/Header"
import Boards from "../../components/Boards/Boards"
import Ads from "../../components/Ads/Ads"
import './index.css'
import instance from "../../libs/axios/instance"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Home = () => {
  const [ user, setUser ] = useState();
  const navigate = useNavigate()

  const getMe = async () => {
    try{
      const res = await instance.get('/auth/me')
      if(res){
        setUser(res.data)
      }
    }catch(err){
      navigate('/login')
      console.log('로그인하세요')
    }
  }
  useEffect(()=>{
    getMe()
  },[])
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