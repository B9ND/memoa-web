import Header from "../../components/Header";
import React, { useState, useRef, useEffect, memo, useLayoutEffect } from "react";
import "./style.css";
import Tag from "../../components/Tag";
import memoaAxios from "../../libs/axios/instance";
// import { useNavigate } from "react-router-dom"; navigate로 리로드하기
// 문제점1 . 이미지 2번 해야지 되는거 -> useEffect() -> 해결 가능할지도?? 근데 submitPostData.images가 저장이 될때마다 바꾸어주어야함
// 문제점2 . 이미지 여러개 -> 이미지 여러개는 map을 써서 api호출을 다 해준다음에 submitPost() 함수를 써서 하면 된다.
// 문제점3 . 이미지 위치 나타내는 곳 -> 글을 중간에 쓰고 하다가 도 바꿀수 있게
// 문제점5 . 이미지 변환 -> 건희코든데 아직 어디에 써야 할지 모르겠는....
// 리로드를 시켜서 초기화시키기 -> 완료

const Write = () => {
  const [submitPostData, setSubmitPostData] = useState({
    title: "",
    content: "",
    tags: [],
    images: [],
    isReleased: true,
  });


  const [imageFiles, setImageFiles] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
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
    //async
    if (
      submitPostData.title == "" ||
      submitPostData.tags == "" ||
      submitPostData.content == ""
    ) {
      alert("다시 한 번 게시물을 확인해 주세요.");
    } else {
      updateContent();
      try {
        console.log("try");
        await memoaAxios.post("/post", submitPostData).then((res) => {
          console.log(res.data);
          alert("성공적으로 업로드 되었습니다.");
          handleContentTransform(submitPostData.content, submitPostData.images);
        });
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

  const updateContent = () => {
    setSubmitPostData((prevState) => ({
      ...prevState,
      content: handleContentTransform(prevState.content, prevState.images),
    }));
  };

  const [userImg, setUserImg] = useState([]);

  //post images
  const postImage = async () => {
    try {
      // 새로운 이미지가 있을 경우에만 업로드
      if (isClicked && userImg.length > 0) {
        const uploadPromises = userImg.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          const response = await memoaAxios.post("/image/upload", formData);
          return response.data.url;
        });
  
        // 모든 이미지 업로드 완료 대기
        const uploadedUrls = await Promise.all(uploadPromises);
  
        // 이미지 URL 상태 업데이트
        setSubmitPostData((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls],
        }));
  
        // 이미지 업로드 후 게시물 제출
        await submitPost();
      } else {
        // 새 이미지 없으면 바로 게시물 제출
        await submitPost();
      }
    } catch (error) {
      console.error("이미지 업로드 또는 게시물 등록 실패:", error);
      alert("이미지 업로드 또는 게시물 등록에 실패했습니다.");
    }
  };
  
  useLayoutEffect(()=>{
    console.log("userImg", userImg, "userImg.length", userImg.length)
    console.log("submitPostData.images", submitPostData.images, "submitPostData.images.length", submitPostData.images.length)
    if(isClicked === true){
      if(userImg.length === submitPostData.images.length){
        submitPostData();
      }
    }
  },[submitPostData.images, userImg])
  // preview Image
  const [viewImages, setViewImages] = useState([]);
  const handleImages = (e) => {
    const { files } = e.target;
    const formData = new FormData();
  
    // Promise.all을 사용한 파일 읽기
    const fileReadPromises = Array.from(files).map((fileItem) => {
      formData.append("file", fileItem);
  
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(fileItem);
      });
    });
  
    Promise.all(fileReadPromises).then((previews) => {
      setViewImages((prevImg) => [...prevImg, ...previews]);
    });
  
    // userImg와 imageFiles 상태 정확히 설정
    setUserImg((prev) => [...prev, ...files]);
    setImageFiles(formData);
  
    // 게시물 내용에 이미지 플레이스홀더 추가
    setSubmitPostData((prev) => ({
      ...prev,
      content: `${prev.content}✔📷${viewImages.length + 1} 번째에 들어갈 이미지 입니다!✔\n`,
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
                handleClick();
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