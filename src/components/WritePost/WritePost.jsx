import React, { useState, useRef, useEffect } from "react";
import "./index.css";

const WritePost = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleResizeHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 500;

      if (scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
      } else {
        textarea.style.height = `${scrollHeight}px`;
        textarea.style.overflowY = "hidden";
      }
    }
  };

  useEffect(() => {
    handleResizeHeight();
  }, [value]);

  return (
    <>
      <form className="big-container">
        <div className="write-container">
          <div className="write-and-tag">
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              id="inputTitle"
              required
            />
            <div className="write-add-tag">태그 추가하기</div>
            <div className="line"></div>
          </div>
          <div className="write-main">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={1}
              placeholder="본문 내용을 입력해주세요"
              required
              id="text"
            />
          </div>
        </div>
        <div className="btn-container">
          <button className="submit-btn" type="submit"> 
            글 등록하기
          </button>
        </div>
      </form>
    </>
  );
};

export default WritePost;
