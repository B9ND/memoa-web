import { useCallback, useEffect, useRef, useState } from "react";
import { MdBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import memoaAxios from "../../libs/axios/instance";
import { debounce } from "../../utils/debounce";
import './style.css'

const Bookmarker = ({ isBookmarked, id, size }) => {
  const [ isBookmark, setIsBookmark ] = useState(Boolean);
  const bookmarkRef = useRef(null);

  useEffect(()=>{
    setIsBookmark(isBookmarked)
  }, [])

  useEffect(()=>{
    console.log(isBookmark)
    if(bookmarkRef.current == null) {
      bookmarkRef.current = isBookmark
      console.log('bookmarkRef', bookmarkRef)
    }
  },[isBookmark])

  const bookmark = useCallback(
    debounce(async ( id ) => {
      try{
        if(bookmarkRef.current == isBookmark){
          await memoaAxios.post('/bookmark', null, {params : {'post-id' : id}})
          console.log('bookmark,', id)
          bookmarkRef.current = null
        }else{
          console.log('not bookmark')
          bookmarkRef.current = null
          return
        }
      }catch(err){
        console.log(err)
      }
    }), [id]
  )

  const bookmarkClick = () => {
    setIsBookmark(prev => !prev);
    bookmark(id);           
  }


  return (
    <div className="bookmarker-container">
      { isBookmark
      ? <MdOutlineBookmark onClick={() => {bookmarkClick()}} className={size == 'big' ? 'bookmark-big' : 'bookmark-small' } />
      : <MdBookmarkBorder onClick={() => {bookmarkClick()}} className={size == 'big' ? 'bookmark-big' : 'bookmark-small' } /> }
    </div>
    
  )
}

export default Bookmarker