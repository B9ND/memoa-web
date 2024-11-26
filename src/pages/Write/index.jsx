import Header from "../../components/Header";
import React, { useState, useRef, useEffect, memo } from "react";
import "./style.css";
import Tag from "../../components/Tag";
import memoaAxios from "../../libs/axios/instance";
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
  //transeform content
  const HandleContent = () => {
    const transeformTxt = submitPostData.content.replace(
      /📸\d+번째 사진이 들어갈 자리입니다\./g,
      `✔★${submitPostData.images[/d/ - 1]}✔`
    );
    setSubmitPostData((prev) => ({
      ...prev,
      content: `${prev.content} ${transeformTxt}`,
    }));
  };
  //upload post
  const postImage = async () => {
    if (imageFiles != []) {
      try {
        await memoaAxios.post(
          "/image/upload",
          imageFiles).then((res) => {
            setSubmitPostData((prev) => ({
              ...prev,
              images: [res.data.url],
            }));
            HandleContent();
            submitPost();
          })

      } catch (error) {
        console.log(error);
      }
    } else {
      submitPost();
    }
  };

  // preview Image
  const [viewImages, setViewImages] = useState([]);
  const handleImages = (e) => {
    const { files: file } = e.target; // files를 file로 변경
    const formData = new FormData();
    const filePreviews = [];
  
    Array.from(file).forEach((fileItem) => { // file로 반복문 처리
      formData.append("files", fileItem);
  
      const reader = new FileReader();
      reader.readAsDataURL(fileItem);
      reader.onloadend = () => {
        filePreviews.push(reader.result);
  
        if (filePreviews.length === file.length) { // file 사용
          setViewImages((prevImg) => [...prevImg, ...filePreviews]);
        }
      };
    });
  
    setImageFiles(formData);
    setSubmitPostData((prev) => ({
      ...prev,
      content: `${prev.content}📸${
        viewImages.length + 1
      }번째 사진이 들어갈 자리입니다.\n`,
    }));
  };
  
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
              {viewImages.map((image, index) => (
                <img key={index} src={image} alt={`preview ${index}`} />
              ))}
            </div>
            <button
              className="submit-btn"
              type="submit"
              onClick={() => {
                postImage();
              }}
            >
              글 등록하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Write;
