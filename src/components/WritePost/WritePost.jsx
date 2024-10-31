import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import Tag from "../Tag/Tag";
import { array } from "prop-types";

const WritePost = () => {
  //textarea 관련 변수
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

  //tag 관련 변수
  const [textPrint, setText] = useState([]);
  const uniqueArr = textPrint.filter(
    (el, index) => textPrint.indexOf(el) === index
  );
  const useInput = useRef(null);
  const [tags, setTags] = useState({ tags: [] });
  const ment = "국어";
  const ment2 = "수학";
  const tagList = [{ tags: ["국어", "수학"] }];

  useEffect(() => {
    console.log("tags :", tags);
  }, [tags]);

  const show_tag = (e) => {
    const code = e.code;
    const text = e.target.value;

    if (code === "Enter" && e.nativeEvent.isComposing === false) {
      console.log("Enter키가 눌렸습니다.");
      e.preventDefault();

      const duplicationTag = () => {
        let sum = 0;
        for (let i = 0; i <= tagList[0].tags.length; ++i) {
          if (text === tagList[0].tags[i]) {
            alert("중복된 태그입니다.");
            useInput.current.value = "";
            sum += 1;
          }
        }
        if (sum === 0) {
          return true;
        } else {
          return false;
        }
      };
      if (text !== "" && duplicationTag() == true) {
        setText((prevTextPrint) => [...prevTextPrint, text]);
        console.log(textPrint);
        useInput.current.value = "";
      }
    }
  };

  //enter 키 눌렀을 때 form submit 제출 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const preventEnter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <form
        className="big-container"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="write-container">
          <div className="write-and-tag">
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              className="input-title"
              onKeyDown={preventEnter}
            />
            <div className="input-file">
              <input
                type="text"
                className="write-add-tag"
                placeholder="태그 추가하기"
                onKeyDown={show_tag}
                ref={useInput}
              />
              <div className="write-tag-container">
                {textPrint.length == 0
                  ? ""
                  : uniqueArr.map((text, idx) => (
                      <Tag
                        tagName="tags"
                        tagPrint={text}
                        key={idx}
                        canActive={true}
                        filter={tags}
                        setFilter={setTags}
                      />
                    ))}
              </div>
              <label htmlFor="file" id="write-image">
                + 이미지
              </label>
              <input
                type="file"
                id="file"
                name="chooseFile"
                accept="image/*" /*onChange=()*/
              />
            </div>
            <div className="line"></div>
            <div className="basic-tag-container">
              <Tag
                tagName="tags"
                tagPrint={ment}
                canActive={true}
                filter={tags}
                setFilter={setTags}
              />
              <Tag
                tagName="tags"
                tagPrint={ment2}
                canActive={true}
                filter={tags}
                setFilter={setTags}
              />
              <Tag
                tagName="tags"
                tagPrint={ment}
                canActive={true}
                filter={tags}
                setFilter={setTags}
              />
              <Tag
                tagName="tags"
                tagPrint={ment}
                canActive={true}
                filter={tags}
                setFilter={setTags}
              />
              <Tag
                tagName="tags"
                tagPrint={ment}
                canActive={true}
                filter={tags}
                setFilter={setTags}
              />
            </div>
          </div>
          <div className="line"></div>
          <div className="write-main">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={1}
              placeholder="본문 내용을 입력해주세요"
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
