/* eslint-disable react/prop-types */
import { MdBookmarkBorder } from "react-icons/md";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Tag from "../Tag";
import { useNavigate } from "react-router-dom";
import BaseProfileImg from "../../assets/base-profile.png";
import "./style.css";
import Masonry from "react-masonry-css";
import Bookmarker from "../Bookmarker";

const Post = ({ post, isBookmarkPage = false }) => {
  const navigate = useNavigate();

  return (
    <div className="post-all-container">
      <Masonry
        breakpointCols={{ 1040: 1, 1300: 2, default: 3 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {post.map((item, index) => (
          <div key={index} className="post-container">
            <div className="post-head">
              <img
                src={
                  isBookmarkPage
                    ? item.profileImage === ""
                      ? BaseProfileImg
                      : item.profileImage
                    : item.authorProfileImage === ""
                      ? BaseProfileImg
                      : item.authorProfileImage
                }
                alt="Profile"
                style={{ width: "30px", height: "30px", borderRadius: "999px" }}
              />
              <div className="user-name">
                {isBookmarkPage ? item.nickname : item.author}
              </div>
              <div className="post-dot">•</div>
              <div className="post-date">{item.createdAt}</div>
            </div>
            <div className="main-img">
              <img
                src={item.images[0]}
                onClick={() => navigate(`/detail/post/:${item.id}`)}
              />
            </div>

            <div className="post-footer">
              <div className="post-tag">
                {item.tags.map((tag, index) => (
                  <Tag key={index} tagPrint={tag} canActive={false} />
                ))}
              </div>
              <div className="post-state-two">
                <Bookmarker
                  size="small"
                  id={isBookmarkPage ? item.postId : item.id}
                  isBookmarked={isBookmarkPage ? true : item.isBookmarked}
                />
              </div>
            </div>
            <div className="post-title">{item.title}</div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Post;
