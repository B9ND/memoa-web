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

  const post = {
    title: "",
    content: "",
    tags: [],
    images: "",
    isReleased: true,
  };

  const show_tag = (e) => {
    const code = e.code;

    console.log(tag)
    if (code === "Enter") {
      console.log("Enter키가 눌렸습니다.");

    }
  };

  return (
    <>
      <form
        className="big-container"
        method="post"
        encType="multipart/form-data"
      >
        <div className="write-container">
          <div className="write-and-tag">
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              id="inputTitle"
              required
            />
            <div className="input-file">
              <input
                type="text"
                className="write-add-tag"
                placeholder="태그 추가하기"
                onKeyDown={show_tag}
                required
              />
              <label htmlFor="file">+ 이미지 추가</label>
              <input
                type="file"
                id="file"
                name="chooseFile"

                accept="image/*" /*onChange=()*/
              ></input>
            </div>
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
