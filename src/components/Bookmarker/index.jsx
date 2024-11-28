/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { MdBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import './style.css'
import useToggle from "../../hooks/toggle/useToggle";
import memoaAxios from "../../libs/axios/instance";

const Bookmarker = ({ isBookmarked, id, size }) => {
  const apiReq = []
  const {...toggle} = useToggle(apiReq, id)

  useEffect(()=>{
    toggle.setState(isBookmarked)
  }, [])

  const bookmark = async () => {
    try{
      await memoaAxios.post('/bookmark', {}, {params : {'post-id' : id}})
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className="bookmarker-container" onClick={()=>toggle.toggleContent(bookmark())}>
    
      { toggle.state
      ? <MdOutlineBookmark className={size == 'big' ? 'bookmark-big' : 'bookmark-small' } />
      : <MdBookmarkBorder className={size == 'big' ? 'bookmark-big' : 'bookmark-small' } /> }
    </div>
    
  )
}

export default Bookmarker