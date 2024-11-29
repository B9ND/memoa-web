import './style.css'
import Shimmer from '../Shimmer'

const BoardSkeleton = () => {
  return (
    <div className="skel-board">
      <div className="skel-board-header">
        <div className="skel-profile-img">
          <Shimmer/>
        </div>
        <div className="skel-board-data">
          <Shimmer/>
        </div>
      </div>
      <div className="skel-img">
        <Shimmer/>
      </div>
      <div className="skel-board-info">
        <Shimmer/>
      </div>
      <div className="skel-board-footer">
        <Shimmer/>
      </div>
    </div>
  )
}

export default BoardSkeleton