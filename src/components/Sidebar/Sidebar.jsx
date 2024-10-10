import "./index.css";
import { CSSTransition } from "react-transition-group";
import {
  MdAccountCircle,
  MdArrowBackIosNew,
  MdAdd,
  MdArrowForwardIos,
} from "react-icons/md";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* eslint-disable */
const Sidebar = () => {
  const location = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(true);

  const goodLoc = ['/home', '/search', '/profile', '/bookmark', '/school', '/help', '/profile', '/setting']
  
  const menuOne = [
    { name: "홈", path: "/home", origin: "home" },
    { name: "검색", path: "/search", origin: "search" },
    { name: "프로필", path: "/profile/:지존진교", origin: "profile" },
    { name: "북마크", path: "/bookmark", origin: "bookmark" },
    { name: "내 학교", path: "/school", origin: "school" },
  ];

  const menuTwo = [
    { name: "설정", path: "/setting", origin: "setting" },
    { name: "도움말", path: "/help", origin: "help" },
  ];

  return goodLoc.includes(location) == false ? (
    <></>
  ) : (
    <div className="container" >
    <CSSTransition in={isOpen} className={'sidebar'} timeout={150} >
      <div className="sidebar">

        <div className="arrow-btn" >
          {isOpen == true ? <MdArrowBackIosNew className="normal-icon" style={{ margin:'8px', cursor:'pointer'}} onClick={() => setIsOpen(!isOpen)}/>
          : <MdArrowForwardIos className='normal-icon' style={{margin:'8px', cursor:'pointer'}} onClick={() => setIsOpen(!isOpen)}/>}
        </div>

        <CSSTransition in={isOpen} timeout={{enter: 300, exit: 450}} className={'profile'} >
          <Link to={'/profile'} className="profile">
            <MdAccountCircle className="big-icon"/>
            <CSSTransition in={isOpen} timeout={400} className={"fade user-info"} unmountOnExit>
              <div className="user-info">
                <div className="user-name">zㅣ존재민</div>
                <div className="user-email">oygnijoes0209</div>
              </div>
            </CSSTransition>
          </Link>
        </CSSTransition>
          <CSSTransition
            in={isOpen}
            timeout={{ enter: 300, exit: 450 }}
            className={"profile"}
          >
            <div className="profile">
              <MdAccountCircle className="big-icon" />
              <CSSTransition
                in={isOpen}
                timeout={400}
                className={"fade user-info"}
                unmountOnExit
              >
                <div className="user-info">
                  <div className="user-name">zㅣ존재민</div>
                  <div className="user-email">oygnijoes0209</div>
                </div>
              </CSSTransition>
            </div>
          </CSSTransition>

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

          <div className="menu">
            <div className="selectOne">
              {menuOne.map((menu, index) => {
                let icon =
                  "/src/assets/icon/" + menu.path.substring(1) + ".svg";
                if (menu.name == "프로필") {
                  icon = "/src/assets/icon/profile.svg";
                }
                return location.substring(1).split("/:")[0] === menu.origin ? (
                  <CSSTransition
                    in={isOpen}
                    timeout={500}
                    className={"menu-lay-focused"}
                    key={index}
                  >
                    <Link to={menu.path} className="menu-lay-focused">
                      <div className="comment">
                        <img src={icon} alt="" className="normal-icon" />
                        <CSSTransition
                          in={isOpen}
                          timeout={200}
                          className={"fade"}
                          unmountOnExit
                        >
                          <span>{menu.name}</span>
                        </CSSTransition>
                      </div>
                    </Link>
                  </CSSTransition>
                ) : (
                  <CSSTransition
                    in={isOpen}
                    timeout={500}
                    className={"menu-lay"}
                    key={index}
                  >
                    <Link to={menu.path} className="menu-lay">
                      <div className="comment">
                        <img src={icon} alt="" className="normal-icon" />
                        <CSSTransition
                          in={isOpen}
                          timeout={200}
                          className={"fade"}
                          unmountOnExit
                        >
                          <span>{menu.name}</span>
                        </CSSTransition>
                      </div>
                    </Link>
                  </CSSTransition>
                );
              })}
            </div>

            <div className="selectTwo">
              {menuTwo.map((menu, index) => {
                let icon =
                  "/src/assets/icon/" + menu.path.substring(1) + ".svg";
                return location.substring(1).split(":")[0] === menu.origin ? (
                  <CSSTransition
                    in={isOpen}
                    timeout={500}
                    className={"menu-lay-focused"}
                    key={index}
                  >
                    <Link to={menu.path} className="menu-lay-focused">
                      <div className="comment">
                        <img src={icon} alt="" className="normal-icon" />
                        <CSSTransition
                          in={isOpen}
                          timeout={200}
                          className={"fade"}
                          unmountOnExit
                        >
                          <span>{menu.name}</span>
                        </CSSTransition>
                      </div>
                    </Link>
                  </CSSTransition>
                ) : (
                  <CSSTransition
                    in={isOpen}
                    timeout={500}
                    className={"menu-lay"}
                    key={index}
                  >
                    <Link to={menu.path} className="menu-lay">
                      <div className="comment">
                        <img src={icon} alt="" className="normal-icon" />
                        <CSSTransition
                          in={isOpen}
                          timeout={200}
                          className={"fade"}
                          unmountOnExit
                        >
                          <span>{menu.name}</span>
                        </CSSTransition>
                      </div>
                    </Link>
                  </CSSTransition>
                );
              })}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Sidebar;