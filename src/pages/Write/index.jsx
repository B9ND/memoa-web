import Header from "../../components/Header";
import React, { useState, useRef, useEffect, memo } from "react";
import "./style.css";
import Tag from "../../components/Tag";
import memoaAxios from "../../libs/axios/instance";
import { ModuleCacheMap } from "vite/runtime";

const Write = () => {
  const [submitPostData, setSubmitPostData] = useState({
    title: "",
    content: "",
    tags: [],
    images: [],
    isReleased: true,
  });

  const [imageFiles, setImageFiles] = useState("");

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
  const postImage = async () => {
    try {
      await memoaAxios
        .post("/image/upload", imageFiles[imageFiles.length])
        .then((res) => {
          setSubmitPostData((prev) => ({ ...prev, images: [res.data.url] }));
        });
    } catch (error) {
      console.log(error);
    }
  };
  // 배열로 state 초기화
  const [viewImages, setViewImages] = useState([]);
  const handleImages = (e) => {
    const { files } = e.target; // 선택한 모든 파일
    const formData = new FormData();
    const filePreviews = []; // 파일 미리보기 URL들을 저장할 배열

    // 모든 파일을 순회하며 FormData에 추가하고 미리보기 생성
    Array.from(files).forEach((file) => {
      formData.append("files", file); // "files"라는 동일한 키로 여러 파일 추가

      // FileReader로 파일 미리보기 URL 생성
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        filePreviews.push(reader.result);

        // 모든 파일의 미리보기를 추가한 후 상태 업데이트
        if (filePreviews.length === files.length) {
          setImageFiles((prevImages) => [...prevImages, ...filePreviews]); // 기존 이미지 URL에 새로운 파일 미리보기 추가
          setViewImages((prevImg) => [...prevImg, ...filePreviews]); // 미리보기 배열을 상태에 저장
        }
      };
    });

    setImageFiles(formData); // FormData에 파일 목록 저장
  };
  console.log(viewImages);
  console.log(imageFiles);
  console.log(imageFiles[imageFiles.length - 1]);
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
                  onClick={()=>{
                    postImage()
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
              {viewImages.map((image, index) => (
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
