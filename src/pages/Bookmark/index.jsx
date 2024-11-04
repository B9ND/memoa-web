import Header from "../../components/Header";
import "./style.css";

const Bookmark = () => {
  return (
    <div className="head-main">
      <Header />
      <div className="bookmark-container">
        <div className="bookmark-header">
          <span>북마크</span>
        </div>
        <div className="bookmark-main">
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
