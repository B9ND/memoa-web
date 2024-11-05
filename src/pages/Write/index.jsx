import Header from "../../components/Header";
import React, { useState, useRef, useEffect, memo } from "react";
import "./style.css";
import Tag from "../../components/Tag";
import memoaAxios from "../../libs/axios/instance";
import { ModuleCacheMap } from "vite/runtime";
const Write = () => {
  const [tags, setTags] = useState({ tags: [] });
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags:[
      ""
    ],
    images: [
      ""
    ],
    isReleased: true
  })

  useEffect(()=>{
    console.log(postData)
  },[postData])
  //textarea
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    const textarea = e.target;
    const maxHeight = 400;
    if (
      textarea.scrollHeight > maxHeight &&
      textarea.value.length > content.length
    ) {
      return;
    }

    setContent(textarea.value);
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  };

  //get auth/me
  const [userInfo, getUserInfo] = useState({
    department: {
      subjects: [""],
    },
  });

  const getMyInfo = async () => {
    try {
      const res = await memoaAxios.get("/auth/me");
      getUserInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  //image upload

  //post /post
  const createPost = async ()=>{
    try{
      const res = await memoaAxios.post('/post', postData)
    }
    catch(error){
      console.log(error)
    }
  }

  //tag
  const [textPrint, setText] = useState([]);
  const uniqueArr = [...new Set(textPrint)];
  const useInput = useRef(null);

  const show_tag = (e) => {
    const code = e.code;
    const text = e.target.value;

    if (code === "Enter" && e.nativeEvent.isComposing === false) {
      e.preventDefault();

      if (userInfo.department.subjects.includes(text) == true) {
        alert("중복된 태그입니다.");
        useInput.current.value = "";
      }
      if (text !== "" && !userInfo.department.subjects.includes(text)) {
        setText((prevTextPrint) => [...prevTextPrint, text]);
        useInput.current.value = "";
      }
    }
  };

  useEffect(()=>{
    console.log(tags)
  },[tags])
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
      <div className="head-main">
        <Header />
        <form className="big-container" method="post" onSubmit={handleSubmit}>
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
                {userInfo["department"].subjects.map((sub, idx) => (
                  <Tag
                    tagName="tags"
                    tagPrint={sub}
                    canActive={true}
                    filter={tags}
                    setFilter={setTags}
                  />
                ))}
              </div>
            </div>
            <div className="line"></div>
            <div className="write-main">
              <textarea
                value={content}
                onChange={handleChange}
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
      </div>
    </>
  );
};

export default Write;
