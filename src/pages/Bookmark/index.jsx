import { useEffect, useState } from "react";
import Header from "../../components/Header";
import memoaAxios from "../../libs/axios/instance";
import "./style.css";
import Post from "../../components/Post";
import ConetentsNotFound from "../../components/ContentsNotFound";

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
          {bookmarkPost.length != 0
          ? <Post post={bookmarkPost} isBookmarkPage={true}/>
          : <ConetentsNotFound title='북마크된 게시물이 없어요.' subTitle='메모 찾으러 가기!' goTo='/search'/>}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
