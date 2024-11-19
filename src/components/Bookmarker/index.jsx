import { useCallback, useEffect, useRef, useState } from "react";
import { MdBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import memoaAxios from "../../libs/axios/instance";
import './style.css'

const Bookmarker = ({ isBookmarked, id, size }) => {
  const [ isBookmark, setIsBookmark ] = useState(Boolean);
  const didmount = useRef(false)
  const checkBookmark = useRef(null)
  const checkNeed = useRef(false)

  useEffect(()=>{
    setIsBookmark(isBookmarked)
  }, [])

  useEffect(()=>{
    if (didmount.current) {
      const timer = setTimeout(() => {
        setBookmark()
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isBookmark, checkBookmark.current])

  const setBookmark = useCallback(()=>{
    if (isBookmark != checkBookmark.current) onBookmark();
    else checkBookmark.current = null
  },[id])

  const onBookmark = useCallback( async () => {
    try{
      await memoaAxios.post('/bookmark', null, {params : {'post-id' : id}})
      .then(()=>{
        checkBookmark.current = null
      })
    }catch(err){
      console.log(err)
    }
  }, [id])

  const bookmarkToggle = () => {
    setIsBookmark(prev => !prev);
    if (!checkNeed.current) checkNeed.current = true
    if (checkNeed.current != null) checkBookmark.current = !checkBookmark.current
    didmount.current = true
  }

  return (
    <div className="bookmarker-container">
      { isBookmark
      ? <MdOutlineBookmark onClick={() => {bookmarkToggle()}} className={size == 'big' ? 'bookmark-big' : 'bookmark-small' } />
      : <MdBookmarkBorder onClick={() => {bookmarkToggle()}} className={size == 'big' ? 'bookmark-big' : 'bookmark-small' } /> }
    </div>
    
  )
}

export default Bookmarker