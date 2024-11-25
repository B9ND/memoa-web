import FollowList from "../../components/FollowList";
import Header from "../../components/Header"
import './style.css'
import { Link, useParams } from "react-router-dom";

const Follow = () => {
  let { followState, username } = useParams();
  
  return (
      <div className="head-main">
        <Header/>
        <div className="follow-navs">
          {followState == ':following' ? (
            <>
              <button className="follow-nav-focused">팔로잉</button>
              <Link to={`/follow/${username}/:followers`} className="follow-nav">
                팔로워
              </Link>
            </>
          ) : (
            <>
              <Link to={`/follow/${username}/:following`} className="follow-nav">
                팔로잉
              </Link>
              <button className="follow-nav-focused">팔로워</button>
            </>
          )}
        </div>
        <FollowList username={username} />
      </div>
  )
}

export default Follow