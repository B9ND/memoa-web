
import { IoMdBookmark } from "react-icons/io";
import { MdBookmarkBorder } from "react-icons/md";
import { useState } from "react";

const BookmarkItem = ({state})=>{
    const [isBookmarked, setIsBookmarked] = useState(state);

    const toggleBookmark = () => {
      setIsBookmarked(!isBookmarked);
    };

    return(
        <>
        {isBookmarked ? (
            <MdBookmarkBorder
                style={{
                    width: "27px",
                    height: "27px",
                    color: "gray",
                }}
                onClick={toggleBookmark}/>) 
                : (
            <IoMdBookmark
                style={{
                    width: "27px",
                    height: "27px",
                }}
                onClick={toggleBookmark}/>)}
        </>
    )
}
export default BookmarkItem