import { MdAccountCircle, MdOutlineComment, MdOutlineBookmarkBorder } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Tag from '../Tag/Tag';
import { useEffect, useState } from 'react';
import './index.css'

/* eslint-disable */
const Board = ({detail}) => {
  const [isPop, setIsPop] = useState(detail.isPop)

  useEffect(()=>{
    setIsPop(isPop)
    detail.isPop = !detail.isPop
  }, [isPop])

  const boardHeader = <div className="board-header">
                        <MdAccountCircle style={{width:'40px', height:'40px', marginRight:'8px'}}/>
                        <div className="board-name">{detail.name}</div>
                        <div className="middle-dot">•</div>
                        <div className="board-date">{detail.date}</div>
                      </div>
  const boardMain = <div className="board-main">
                      <img src={detail.mainImg} alt="" className="board-img" />
                        <div className="board-state">
                          <div className="board-counters">
                            <div className="board-comment">
                              <MdOutlineComment style={{width:'24px', height:'24px', marginRight:'8px'}}/>
                              <div className="board-count">{detail.commentCount >= 999 ? '999+' : detail.commentCount}</div>
                            </div>
                            <div className="board-heart">
                              <FaRegHeart style={{width:'24px', height:'24px', marginRight:'8px'}}/>
                              <div className="board-count">{detail.heartCount >= 999 ? '999+' : detail.heartCount}</div>
                            </div>
                          </div>
                          <div className="board-bookmark">
                            <MdOutlineBookmarkBorder style={{width:'28px', height:'28px'}}/>
                          </div>
                        </div>
                    </div>
  const boardTag = <div className="board-tag">
                    <Tag tagPrint={detail.subTag}/>
                    <Tag tagPrint={detail.rankTag} />
                    <Tag tagPrint={detail.gradeTag} />
                  </div>
  const boardFooter = <div className="board-footer">
                        <div className="board-title">{detail.title}</div>
                        <div className="board-pop" onClick={()=>setIsPop(!isPop)}>
                          {isPop == true ? '접기' : '펼치기'}
                        </div>  
                      </div>
  const boardText = <div className="board-text">
                      {isPop === true ? detail.text : ''}
                    </div>
  return isPop == false ? (
    <div className="board">
      {boardHeader}
      {boardMain}
      {boardTag}
      {boardFooter}
    </div>
  ) : (
    <div className="board">
      {boardHeader}
      {boardMain}
      {boardTag}
      {boardFooter}
      {boardText}
    </div>
  )
}

export default Board