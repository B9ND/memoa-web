import Header from "../../components/Header";
import React, { useState, useRef, useEffect, memo } from "react";
import "./style.css";
import Tag from "../../components/Tag";
import memoaAxios from "../../libs/axios/instance";
import { ModuleCacheMap } from "vite/runtime";

const Write = () => {
  const [submitPostData, setSubmitPostData] = useState({
    title: "",
    content: "", // 내용/n ✔★url✔(imgurl)-> 서버 저장 이미지 업로드 완료
    tags: [],
    images: [], //images는 그냥 img url로 처리
    isReleased: true,
  });

  const updateField = (event) => {
    const { name, value, scrollHeight } = event.target;
    const maxHeight = 400;

    setSubmitPostData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "content") {
      event.target.style.height = "auto";
      event.target.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
    
  };

  //get "auth/me"
  const [userInfo, getUserInfo] = useState({
    department: {
      subjects: [""],
    },
  });

  const getMe = async () => {
    try {
      const res = await memoaAxios.get("/auth/me");
      getUserInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    console.log(submitPostData);
  }, [submitPostData]);

  //post
  const submitPost = async () => {
    if (
      submitPostData.title == "" ||
      submitPostData.tags == "" ||
      submitPostData.content == ""
    ) {
      alert("다시 한 번 게시물을 확인해 주세요.");
    } else {
      try {
        await memoaAxios
          .post("/post", submitPostData)
          .then((res) => console.log(res.data));
        alert("성공적으로 업로드 되었습니다.");
      } catch (err) {
        console.log(err);
        alert("업로드에 실패하였습니다.");
      }
    }
  };
  //upload post
  // 배열로 state 초기화
  const [images, setImages] = useState([]);
  const formData = new FormData();

  const handleImages = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
      };
    });
  };         
  useEffect(() => {
    formData.append("images", images);
  }, [images]);

  for (const x of formData) {
    console.log("formData", x);
  }
  console.log(images);
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

  const preventEnter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className="head-main">
        <Header />
        <div className="big-container">
          <div className="write-container">
            <div className="write-and-tag">
              <input
                type="text"
                name="title"
                value={submitPostData.title}
                placeholder="제목을 입력해주세요"
                className="input-title"
                onKeyDown={preventEnter}
                onChange={updateField}
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
                          filter={submitPostData}
                          setFilter={setSubmitPostData}
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
                  multiple
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    handleImages(e);
                  }}
                />
              </div>
              <div className="line"></div>
              <div className="basic-tag-container">
                {userInfo["department"].subjects.length == 0
                  ? ""
                  : userInfo["department"].subjects.map((sub, idx) => (
                      <Tag
                        tagName="tags"
                        tagPrint={sub}
                        canActive={true}
                        filter={submitPostData}
                        setFilter={setSubmitPostData}
                      />
                    ))}
              </div>
            </div>
            <div className="line"></div>
            <div className="write-main">
              <textarea
                name="content"
                value={submitPostData.content}
                onChange={updateField}
                rows={1}
                placeholder="본문 내용을 입력해주세요"
                id="text"
              />
            </div>
          </div>
          <div className="btn-container">
            <div className="post-image-container">
              {/* {submitPostData.images.map((imgURL) => (
                <img src={imgURL} />
              ))} */}
              {images.map((image, index) => (
                <img key={index} src={image} alt={`preview ${index}`} />
              ))}
            </div>
            <button className="submit-btn" type="submit" onClick={submitPost}>
              글 등록하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Write;
