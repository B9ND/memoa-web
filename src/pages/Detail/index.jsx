import Header from "../../components/Header";
import { MdBookmarkBorder } from "react-icons/md";
import { IoMdBookmark } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './style.css'
import memoaAxios from "../../libs/axios/instance";
import Tag from "../../components/Tag";
import { string } from "prop-types";

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

  const getPostDetail = async () => {
    try {
      await memoaAxios.get(`/post/${params.id}`).then((res) => setPostData(res.data));
    } catch (err) {
      console.log(err);
    }
  }
  const [which, setWhich] = useState(true);

  const what = () => {
    setWhich(!which);
  };

  useEffect(() => {
    getPostDetail();
  }, []);

  const renderContentWithImages = () => {
    const contentParts = postData.content.split("✔").filter(Boolean);
    return contentParts.map((part, index) => {
      if (part.startsWith("★")) {
        const imageUrl = part.slice(1);
        return <img src={imageUrl} alt={`Content Image ${index}`} key={index} style={{ maxWidth: "100%" }} />;
      }
      return <span key={index}>{part}</span>;
    });
  }

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
                {postData.tags.map((item, index) => (
                  <Tag key={index} tagPrint={item} canActive={false} setDefault={true} />
                ))}
              </div>
              <div className="author">작성자 : {postData.author}</div>
            </div>
            <div className="post-line"></div>
          </div>
          <div className="detail-post-content">
            {renderContentWithImages()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
