import './index.css'
import Board from '../Board/Board'

const Boards = () => {
  const boards = [
    { id: 0,
      profileImg:"src/assets/profile-img.png",
      name:"지존재민",
      date:"2024-08-09",
      mainImg:"src/assets/boardImg.png",
      title:"⭐  프리드리히 니체 명언 ⭐",
      text:'독일 실존주의 철학자 프리드리히 니체의 명언 현대인은 이게 불가능하니까, 하루 3분의 1이라도 나를 위한 삶을 살자.',
      commentCount:998,
      heartCount:1200,
      isBookmark:"",
      subTag:"국어",
      rankTag:"고등",
      gradeTag:"1학년",
      isPop: false },

    { id:1,
      profileImg:"src/assets/profile-img.png",
      name:"지존재민",
      date:"2024-08-09",
      mainImg:"src/assets/boardImg.png",
      title:"⭐  프리드리히 니체 명언 ⭐",
      text:'독일 실존주의 철학자 프리드리히 니체의 명언. 현대인은 이게 불가능하니까, 하루 3분의 1이라도 나를 위한 삶을 살자.',
      commentCount:998,
      heartCount:1200,
      isBookmark:"",
      subTag:"국어",
      rankTag:"고등",
      gradeTag:"1학년",
      isPop: true }
  ]

  
  
  return (
    <div className='boards'>
      {boards.map((board, index)=>{
        return (
          <Board detail={board} key={index}/>
        )
      })}
    </div>
  )
}

export default Boards