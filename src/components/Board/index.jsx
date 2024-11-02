import {
  MdAccountCircle,
  // MdOutlineComment,
  MdOutlineBookmarkBorder,
} from "react-icons/md";
// import { FaRegHeart } from "react-icons/fa";
import Tag from "../Tag";
import { useState } from "react";
import "./style.css";
import { IoMdBookmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";

/* eslint-disable */
const Board = ({ detail }) => {
  const [isPop, setIsPop] = useState(false);
  const [which, setWhich] = useState(true);

  const what = () => {
    if (which === true) {
      setWhich(false);
    } else if (which === false) {
      setWhich(true);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="board">
      <div className="board-header">
        <MdAccountCircle
          style={{ width: "40px", height: "40px", marginRight: "8px" }}
        />
        <div className="board-name">{detail.author}</div>
        <div className="middle-dot">•</div>
        <div className="board-date">{detail.createdAt}</div>
      </div>
      <div className="board-main">
        <img
          src={detail.images[0]}
          alt=""
          className="board-img"
          onClick={() => navigate("/detail/post/:0")}
        />
        {/* <div className="board-state">
          <div className="board-counters">
            <div className="board-comment">
              <MdOutlineComment
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
              />
              <div className="board-count">
                {detail.commentCount >= 999 ? "999+" : detail.commentCount}
              </div>
            </div>
            <div className="board-heart">
              <FaRegHeart
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
              />
              <div className="board-count">
                {detail.heartCount >= 999 ? "999+" : detail.heartCount}
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="board-info">
        <div className="board-tag">
          {detail.tags.map((k, idx) => (
            <Tag key={idx} tagPrint={k} canActive={false} />
          ))}
        </div>
        <div className="board-bookmark">
          {which ? (
            <MdOutlineBookmarkBorder
              style={{
                width: "28px",
                height: "28px",
                cursor: "pointer",
              }}
              onClick={what}
            />
          ) : (
            <IoMdBookmark
              style={{
                width: "28px",
                height: "28px",
              }}
              onClick={what}
            />
          )}
        </div>
      </div>
      <div className="board-footer">
        <div className="board-title">{detail.title}</div>
        <div className="board-pop" onClick={() => setIsPop(!isPop)}>
          {isPop == true ? "접기" : "펼치기"}
        </div>
      </div>
      {isPop == true && <div className="board-text">{detail.content}</div>}
    </div>
  );
};

export default Board;