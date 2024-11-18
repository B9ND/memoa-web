import { useEffect, useState } from "react";
import Header from "../../components/Header";
import memoaAxios from "../../libs/axios/instance";
import "./style.css";
import Post from "../../components/Post";

const Bookmark = () => {
  
  const [ bookmarkPost, setBookmarkPost ] = useState([]);

  const getBookmark = async () => {
    try{
      await memoaAxios.get('/bookmark').then((res)=>{
        setBookmarkPost(res.data)
      })
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getBookmark()
  }, [])
  
  return (
    <div className="head-main">
      <Header />
      <div className="bookmark-container">
        <div className="page-name">
          북마크
        </div>
        <div className="bookmark-main">
          <Post post={bookmarkPost} isBookmarkPage={true}/>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
