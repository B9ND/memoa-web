import './style.css'
import Shimmer from '../Shimmer'

const BoardSkeleton = ({length}) => {
  const skeleteonRender = () => {
    const result = []
    for (let i = 0; i <= length; i++){
      result.push(
        <div className="skel-board" key={i}>
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
    return result
  }
  
  return (
    <div>{skeleteonRender()}</div>
  )
}

export default BoardSkeleton