import "./style.css";
import { CSSTransition } from "react-transition-group";
import {
  MdAccountCircle,
  MdArrowBackIosNew,
  MdAdd,
  MdArrowForwardIos,
} from "react-icons/md";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(true);

  const goodLoc = [
    "/",
    "/search",
    "/profile",
    "/bookmark",
    "/setting",
    "/help",
    "/write",
    "/follow",
    "/detail/post",
  ];

  const menuOne = [
    { name: "홈", path: "/", origin: "home" },
    { name: "검색", path: "/search", origin: "search" },
    { name: "북마크", path: "/bookmark", origin: "bookmark" },
  ];

  const menuTwo = [
    { name: "설정", path: "/setting", origin: "setting" },
    { name: "도움말", path: "/help", origin: "help" },
  ];

  return goodLoc.includes(location.split("/:")[0]) ? (
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
            <Link to={"profile/:지존진교"} className="profile">
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
              {menuOne.map((menu, index) => (
                  <CSSTransition
                    in={isOpen}
                    timeout={500}
                    className={location.split("/:")[0] === menu.path ? "menu-lay-focused" : "menu-lay"}
                    key={index}
                  >
                    <Link to={menu.path} className={location.split("/:")[0] === menu.path ? "menu-lay-focused" : "menu-lay"}>
                      <div className="comment">
                        <img src={`/src/assets/icon/${menu.origin}.svg`} alt="" className="normal-icon" />
                        <CSSTransition
                          in={isOpen}
                          timeout={200}
                          className={"fade menu-name"}
                          unmountOnExit
                        >
                          <div>{menu.name}</div>
                        </CSSTransition>
                      </div>
                    </Link>
                  </CSSTransition>
                )
              )}
            </div>

            <div className="select-two">
              {menuTwo.map((menu, index) => (
                  <CSSTransition
                    in={isOpen}
                    timeout={500}
                    className={location.split("/:")[0] === menu.path ? "menu-lay-focused" : "menu-lay"}
                    key={index}
                  >
                    <Link to={menu.path} className={location.split("/:")[0] === menu.path ? "menu-lay-focused" : "menu-lay"}>
                      <div className="comment">
                        <img src={`/src/assets/icon/${menu.origin}.svg`} alt="" className="normal-icon" />
                        <CSSTransition
                          in={isOpen}
                          timeout={200}
                          className={"fade menu-name"}
                          unmountOnExit
                        >
                          <div>{menu.name}</div>
                        </CSSTransition>
                      </div>
                    </Link>
                  </CSSTransition>
                )
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  ) : (
    <></>
  );
};

export default Sidebar;
