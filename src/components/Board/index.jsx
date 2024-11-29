import Bookmarker from '../Bookmarker'
import Tag from "../Tag";
import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import baseProfileImg from '../../assets/base-profile.png'
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

/* eslint-disable */
const Board = ({ detail }) => {
  const [isPop, setIsPop] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="board">
      <div className="board-header">
        <img src={detail.profileImage ? detail.profileImage : baseProfileImg } alt="" className="board-profile-img" />
        <Link to={`/profile/${detail.author}`} className="board-name">
          {detail.author}
        </Link>
        <div className="middle-dot">•</div>
        <div className="board-date">{detail.createdAt}</div>
      </div>
      <div className="board-main">
        <img
          src={detail.images[0]}
          alt=""
          className="board-img"
          onClick={() => navigate(`/detail/post/${detail.id}`)}
        />
      </div>
      <div className="board-info">
        <div className="board-tag">
          {detail.tags.map((k, idx) => (
            <Tag key={idx} tagPrint={k} canActive={false} />
          ))}
        </div>
        <div className="board-bookmark">
          <Bookmarker
            size='small'
            id={detail.id}
            isBookmarked={detail.isBookmarked}
          />
        </div>
      </div>
      <div className="board-footer">
        <div className="board-title">{detail.title}</div>
          { isPop == true
          ? <div className="board-pop" onClick={() => setIsPop(!isPop)}><MdKeyboardArrowUp className='normal-icon'/> 접기</div>
          : <div className="board-pop" onClick={() => setIsPop(!isPop)}><MdOutlineKeyboardArrowDown className='normal-icon'/> 펼치기</div>}
      </div>
      {isPop == true && <div className="board-text">{detail.content}</div>}
    </div>
  );
};

export default Board;
