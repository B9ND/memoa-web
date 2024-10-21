import React from "react";
import "./index.css";
import { MdBookmarkBorder } from "react-icons/md";

const DetailPost = () => {
  const titleList = [
    {
      id: 0,
      title: "천재 국어 고1 1-2 (3) 필기 공유",
      content:
        "대충 국어 필기 공유한다는 내용대충 국어 필기 공유한다는 내용대충 국어 필기 공유한다는 내용대충 국어 필기 공유한다는 내용대충 국어 필기 공유한다는 내용",
      author: "지존진교",
      tags: ["초등", "1학년", "국어", "한국사", "고라니"],
      createdAt: "2024-10-17",
      images: ["../src/assets/boardImg.png"],
    },
  ];

  return (
    <>
      {titleList.map((post) => {
        return (
          <div className="detail-post-container">
            <div className="post-detail-container">
              <div className="post-header">
                <div className="post-detail-header">
                  <span style={{ fontSize: "1.6em", fontWeight: "500" }}>
                    {post.title}
                  </span>
                  <MdBookmarkBorder
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "gray",
                    }}
                  />
                </div>
                <div className="tag-and-author">
                  <div className="tag-container">
                    {post.tags.map((tag, idx) => (
                      <div key={idx}>{tag}</div>
                    ))}
                  </div>
                  <div className="author">작성자 : {post.author}</div>
                </div>
                <div className="post-line"></div>
              </div>
              <div className="detail-main-post">
                <img src={post.images[0]}></img>
              </div>
              <div className="detail-post-content">
                <span>{post.content}</span>
              </div>
              <div className="detail-main-post">
                <img src={post.images[0]}></img>
              </div>
              <div className="detail-post-content">
                <span>{post.content}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DetailPost;
