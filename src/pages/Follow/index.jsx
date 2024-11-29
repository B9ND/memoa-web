import FollowList from "../../components/FollowList";
import Header from "../../components/Header"
import './style.css'
import { Link, useParams } from "react-router-dom";

const Follow = () => {
  const { followState, username } = useParams();
  return (
      <div className="head-main">
        <Header/>
        <div className="follow-navs">
          {followState == 'followings' ? (
            <>
              <Link to={`/follow/${username}/followers`} className="follow-nav">
                팔로워
              </Link>
              <button className="follow-nav-focused">팔로잉</button>
            </>
          ) : (
            <>
              <button className="follow-nav-focused">팔로워</button>
              <Link to={`/follow/${username}/followings`} className="follow-nav">
                팔로잉
              </Link>
            </>
          )}
        </div>
        <FollowList />
      </div>
  )
}

export default Follow