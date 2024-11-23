import { useCallback, useEffect, useState } from "react";
import { MdBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import './style.css'
import useToggle from "../../hooks/toggle/useToggle";

const Bookmarker = ({ isBookmarked, id, size }) => {

  const apiReq = ['/bookmark', {}, {params : {'post-id' : id}}]
  const {...toggle} = useToggle(apiReq, id)

  useEffect(()=>{
    toggle.setState(isBookmarked)
  }, [])

  return (
    <div className="bookmarker-container" onClick={()=>toggle.toggleContent()}>
    
      { toggle.state
      ? <MdOutlineBookmark className={size == 'big' ? 'bookmark-big' : 'bookmark-small' } />
      : <MdBookmarkBorder className={size == 'big' ? 'bookmark-big' : 'bookmark-small' } /> }
    </div>
    
  )
}

export default Bookmarker