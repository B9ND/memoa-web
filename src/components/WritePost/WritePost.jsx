import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import Tag from "../Tag/Tag";

const WritePost = () => {
  const [value, setValue] = useState("");
  const [tag, setTag] = useState(true);
  const textareaRef = useRef(null);
  const [textPrint, setText] = useState([]);
  const useInput = useRef(null);

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

  const show_tag = (e) => {
    const code = e.code;
    const text = e.target.value;

    if (code === "Enter") {
      console.log("Enter키가 눌렸습니다.");
      if (text !== "") {
        setTag(false);
        setText(textPrint.concat(text));
        console.log(textPrint);
        useInput.current.value = "";
      }
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
                ref={useInput}
                required
              />
              <div className="write-tag-container">
                {tag
                  ? ""
                  : textPrint.map((text, idx) => (
                      <Tag tagName="tags" tagPrint={text} key={idx} />
                    ))}
              </div>
              <label htmlFor="file" id="write-image">
                + 이미지 추가
              </label>
              <input
                type="file"
                id="file"
                name="chooseFile"
                accept="image/*" /*onChange=()*/
              />
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
