import Header from "../../components/Header";
import "./style.css";
import Post from "../../components/Post";

const Bookmark = () => {
  return (
    <div className="head-main">
      <Header />
      <div className="bookmark-container">
        <div className="bookmark-header">
          <span>북마크</span>
        </div>
        <div className="bookmark-main">
          <Post />
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
