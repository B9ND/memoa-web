import Header from "../../components/Header";
import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import Tag from "../../components/Tag";
import memoaAxios from "../../libs/axios/instance";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [submitPostData, setSubmitPostData] = useState({
    title: "",
    content: "",
    tags: [],
    images: [],
    isReleased: true,
  });
  const navigate = useNavigate();

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
      school: "",
      grade: "",
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
    if (userInfo.department.school && userInfo.department.grade) {
      setSubmitPostData((prev) => ({
        ...prev,
        tags: [userInfo.department.school, `${userInfo.department.grade}학년`],
      }));
    }
  }, [userInfo]);

  //post 게시물
  const submitPost = async () => {
    if (
      submitPostData.title === "" ||
      submitPostData.tags.length === 2 ||
      submitPostData.content === ""
    ) {
      alert("다시 한 번 게시물을 확인해 주세요.");
    } else {
      const transformedContent = handleContentTransform(
        submitPostData.content,
        submitPostData.images
      );

      try {
        const res = await memoaAxios.post("/post", {
          ...submitPostData,
          content: transformedContent,
        });
        alert("성공적으로 업로드 되었습니다.");
        setTimeout(() => {
          navigate("/");
        }, 700);
      } catch (err) {
        console.log(err);
        alert("업로드에 실패하였습니다.");
      }
    }
  };

  //content 변환
  const handleContentTransform = (content, images) => {
    return content.replace(
      /✔📷(\d+) 번째에 들어갈 이미지 입니다!✔/g,
      (match, numberStr) => {
        const index = (parseInt(numberStr, 10) || 1) - 1;
        const image = images[index] || "이미지 없음";
        return `✔★${image}✔`;
      }
    );
  };

  // preview Image
  const handleImages = async (e) => {
    const { files } = e.target;
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const formData = new FormData();
          formData.append("file", file);

          await memoaAxios.post("image/upload", formData).then((res) => {
            setSubmitPostData((prev) => ({
              ...prev,
              images: [...prev.images, res.data.url],
            }));
            setSubmitPostData((prev) => ({
              ...prev,
              content: `${prev.content}  ✔📷${
                submitPostData.images.length + 1
              } 번째에 들어갈 이미지 입니다!✔\n`,
            }));
          });
        } catch (err) {
          alert("이미지 업로드에 실패하였습니다.");
          console.log("이미지 업로드 실패:", err);
        }
      };
    }
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

      if (userInfo.department.subjects.includes(text)) {
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
    if (e.key === "Enter") {
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
                  {textPrint.length === 0
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
                {userInfo["department"].subjects.length === 0
                  ? ""
                  : userInfo["department"].subjects.map((sub, idx) => (
                      <Tag
                        tagName="tags"
                        tagPrint={sub}
                        key={idx}
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
              {submitPostData.images.map((image, index) => (
                <img key={index} src={image} alt={`preview ${index}`} />
              ))}
            </div>
            <button
              className="submit-btn"
              type="submit"
              onClick={() => {
                submitPost();
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
