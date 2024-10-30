import Header from "../../components/Header"
import Ads from "../../components/Ads"
import Board from '../../components/Board'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import memoaAxios from "../../libs/axios/instance"
import './style.css'
import Tag from "../../components/Tag"

const Home = () => {
  const [ user, setUser ] = useState();
  const [ selecter, setSelecter ] = useState({'select':[]})
  const navigate = useNavigate()

  const getMe = async () => {
    try{
      const res = await memoaAxios.get('/auth/me')
      if(res){
        setUser(res.data)
      }
    }catch(err){
      navigate('/login')
      console.log('로그인하세요', err)
    }
  }
  useEffect(()=>{
    getMe()
  },[])

  const boards = [
    { 
      id: 0,
      title: "프리드리히 니체 명언",
      content: "독일 실존주의 철학자 프리드리히 니체의 명언 현대인은 이게 불가능하니까, 하루 3분의 1이라도 나를 위한 삶을 살자.",
      author: "지존재민",
      tags: [
        "국어",
        "고등",
        "1학년",
      ],
      images: [
        "src/assets/boardImg.png"
      ],
      createdAt: "2024-10-18",
    },
    { 
      id: 1,
      title: "프리드리히 니체 명언",
      content: "독일 실존주의 철학자 프리드리히 니체의 명언 현대인은 이게 불가능하니까, 하루 3분의 1이라도 나를 위한 삶을 살자.",
      author: "지존하나",
      tags: [
        "국어",
        "고등",
        "1학년",
      ],
      images: [
        "src/assets/boardImg.png"
      ],
      createdAt: "2024-10-18",
    }
  ]

  return (
      <div className="head-main">
        <Header />
        <div className="home-main">
          <div className='boards'>
            <div className="board-container">
              {boards.map((board, index)=>(<Board detail={board} key={index}/>))}
            </div>
            <div className="selecter-container">
              학년 선택
              <div className="selecter-tags">
                <Tag tagPrint={'1학년'} tagName={'select'} canActive={true} filter={selecter} setFilter={setSelecter}/>
                <Tag tagPrint={'2학년'} tagName={'select'} canActive={true} filter={selecter} setFilter={setSelecter}/>
                <Tag tagPrint={'3학년'} tagName={'select'} canActive={true} filter={selecter} setFilter={setSelecter}/>
              </div>
            </div>
          </div>
          <Ads />
        </div>
      </div>
  )
}

export default Home