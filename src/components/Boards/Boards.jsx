import './index.css'
import Board from '../Board/Board'
import HomeSelector from '../HomeSelecter/HomeSelector'
import { useState } from 'react'

const Boards = () => {
  const [ whatBoard, setWhatBoard ] = useState([]);

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
    <div className='boards'>
      <HomeSelector setBoard={setWhatBoard} board={whatBoard}/>
      {boards.map((board, index)=>(<Board detail={board} key={index}/>))}
    </div>
  )
}

export default Boards