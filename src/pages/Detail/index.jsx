import Header from "../../components/Header";
import { MdBookmarkBorder } from "react-icons/md";
import { IoMdBookmark } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './style.css'

const Detail = () => {

  let params = useParams();
  params.id = params.id.substring(1);

  const [postData, setPostData] = useState({
    id: 0,
    title: "",
    content: "",
    author: "",
    tags: [""],
    createdAt: "",
    images: [""],
  });
  
  const [which, setWhich] = useState(true);

  const what = () => {
    if (which === true) {
      setWhich(false);
    } else if (which === false) {
      setWhich(true);
    }
  };

  return (
    <div className="head-main">
      <Header />
      <div className="detail-post-container">
      <div className="post-detail-container">
        <div className="post-header">
          <div className="post-detail-header">
            <span style={{ fontSize: "1.6em", fontWeight: "500" }}>
              {postData.title}
            </span>
            {which ? (
              <MdBookmarkBorder
                style={{
                  width: "30px",
                  height: "30px",
                  color: "gray",
                }}
                onClick={what}
              />
            ) : (
              <IoMdBookmark
                style={{
                  width: "30px",
                  height: "30px",
                }}
                onClick={what}
              />
            )}
          </div>
          <div className="tag-and-author">
            <div className="tag-container">
              {postData.tags.map((tag, idx) => (
                <div key={idx}>{tag}</div>
              ))}
            </div>
            <div className="author">작성자 : {postData.author}</div>
          </div>
          <div className="post-line"></div>
        </div>
        <div className="detail-main-post">
          <img src={postData.images[0]}></img>
        </div>
        <div className="detail-post-content">
          <span>{postData.content}</span>
        </div>
        <div className="detail-main-post">
          <img src={postData.images[0]}></img>
        </div>
        <div className="detail-post-content">
          <span>{postData.content}</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Detail;
