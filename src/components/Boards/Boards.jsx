import './index.css'
import { ReactComponent as Comment } from '../../assets/icon/comment.svg'
import { ReactComponent as Heart } from '../../assets/icon/heart.svg'

const Boards = () => {
  const boards = [
    { profileImg:"",
      name:"지존재민",
      day:"2024-08-09",
      mainImg:"",
      title:"",
      commentCount:"",
      heartCount:"",
      isBookmark:"",
      subTag:"국어",
      rankTag:"고등",
      gradeTag:"1학년" }
  ]
  return (
    <div className='boards'>
      <div className="board">
        <div className="board-header">

        </div>
      </div>
      <div className="board">
        <div className="board-header">

        </div>
      </div>
      <div className="board">
        <div className="board-header">

        </div>
      </div>
      <div className="board">
        <div className="board-header">

        </div>
      </div>
      <div className="board">
        <div className="board-header">

        </div>
      </div><div className="board">
        <div className="board-header">

        </div>
      </div>

    </div>
  )
}

export default Boards