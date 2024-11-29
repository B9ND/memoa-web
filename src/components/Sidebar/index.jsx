import "./style.css";
import { CSSTransition } from "react-transition-group";
import {
  MdArrowBackIosNew,
  MdAdd,
  MdArrowForwardIos,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../Menu";
import memoaAxios from "../../libs/axios/instance";

const Sidebar = () => {
  const location = useLocation().pathname.split("/:")[0];
  const [isOpen, setIsOpen] = useState(true);
  const [ userInfo, setUserInfo ] = useState({
    email: "",
    nickname: "",
    description: "",
    profileImage: "",
  })
  const navigate = useNavigate();

  const getMe = async () => {
    try{
      await memoaAxios.get('/auth/me').then((res) => setUserInfo(res.data))
    }catch{
      navigate('/login')
      alert('재로그인이 필요합니다.')
    }
  }

  const menuOne = [
    { name: "홈", path: "/", origin: "home" },
    { name: "검색", path: "/search", origin: "search" },
    { name: "북마크", path: "/bookmark", origin: "bookmark" },
  ];

  const menuTwo = [
    { name: "설정", path: "/setting", origin: "setting" },
    { name: "도움말", path: "/help", origin: "help" },
  ];

  useEffect(() => {
    getMe()
  },[])
  
  return (
    <div className="container">
      <CSSTransition in={isOpen} className={"sidebar"} timeout={150}>
        <div className="sidebar">
          <div className="arrow-btn">
            {isOpen == true ? (
              <MdArrowBackIosNew
                className="normal-icon"
                style={{ margin: "8px", cursor: "pointer" }}
                onClick={() => setIsOpen(!isOpen)}
              />
            ) : (
              <MdArrowForwardIos
                className="normal-icon"
                style={{ margin: "8px", cursor: "pointer" }}
                onClick={() => setIsOpen(!isOpen)}
              />
            )}
          </div>
          <CSSTransition
            in={isOpen}
            timeout={{ enter: 300, exit: 450 }}
            className={"profile"}
          >
            <Link to={`profile/${userInfo.nickname}`} className="profile">
              <img src={userInfo.profileImage} alt="" style={{width:'40px', height:'40px', borderRadius:'999px'}} />
              <CSSTransition
                in={isOpen}
                timeout={400}
                className={"fade user-info"}
                unmountOnExit
              >
                <div className="user-info">
                  <div className="menu-user-name">{userInfo.nickname}</div>
                  <div className="user-email">{userInfo.email}</div>
                </div>
              </CSSTransition>
            </Link>
          </CSSTransition>

          <Link to={"write"}>
            <button className="writeBtn">
              <MdAdd color="white" className="normal-icon" />
              <CSSTransition
                in={isOpen}
                timeout={400}
                className={"fade"}
                unmountOnExit
              >
                <div>글 작성하기</div>
              </CSSTransition>
            </button>
          </Link>

          <div className="menu">
            <div className="select-one">
              {menuOne.map((item, index)=>
                <Menu isOpen={isOpen} item={item} location={location} key={index}/>
              )}
            </div>

            <div className="select-two">
              {menuTwo.map((item, index) => 
                <Menu isOpen={isOpen} item={item} location={location} key={index}/>
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Sidebar;
