import "./index.css";
import { MdBookmarkBorder } from "react-icons/md";
import { IoMdBookmark } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../pages/NotFound/NotFound";
// import Bookmark from "../../pages/Bookmark/Bookmark";
import instance from "../../libs/axios/instance"

const DetailPost = () => {
  let params = useParams();
  params.id = params.id.substring(1)
  const [postData, setPostData] = useState({
    id: 0,
    title: "",
    content: "",
    author: "",
    tags: [

    ],
    createdAt: "",
    images: [
    ]
  })

  useEffect(()=>{
    getPost()
  }, [params.id])
  
  const getPost = async () => {
    try{
      const res = await instance.get(`/post/${params.id}`)
      if(res){
        setPostData(res.data)
      }
    }catch(err){
      console.log(err)
    }
  }

  const titleList = [
    {
      id: 0,
      title: "천재 국어 고1 1-2 (3) 필기 공유",
      content:
        "대충 국어 필기 공유한다는 내용대충 국어 필기 공유한다는 내용대충 국어 필기 공유한다는 내용대충 국어 필기 공유한다는 내용대충 국어 필기 공유한다는 내용",
      author: "지존진교",
      tags: ["초등", "1학년", "국어", "한국사", "고라니"],
      createdAt: "2024-10-17",
      images: ["../../src/assets/boardImg.png"],
    },
  ];

  const [which, setWhich] = useState(true);

  const what = () => {
    if (which === true) {
      setWhich(false);
    } else if (which === false) {
      setWhich(true);
    }
  };

  const { id } = useParams();
  const postId = id.replace(":", "");

  if (postId != titleList[0].id) {
    return <NotFound></NotFound>;
  }

  return (
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
  );
};

export default DetailPost;
