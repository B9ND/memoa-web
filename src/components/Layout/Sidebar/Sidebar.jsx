import "./index.css";
import {ReactComponent as ArrowSvg} from "../../../assets/icon/arrowLeft.svg"
import {ReactComponent as CircleSvg} from "../../../assets/icon/circle.svg"
import {ReactComponent as PlusSvg} from "../../../assets/icon/plus.svg"
import { Link, useLocation } from "react-router-dom";


const Sidebar = () => {
  
  const location = useLocation().pathname;

  const menuOne = [
    { name: "홈", path: "/home" },
    { name: "검색", path: "/search" },
    { name: "프로필", path: "/profile" },
    { name: "북마크", path: "/bookmark" },
    { name: "내 학교", path: "/school" },
  ];

  const menuTwo = [
    { name: "설정", path: "/setting"},
    { name: "도움말", path: "/help"},
  ]

  return (
    <div className="container">
      <div className="sidebar">

        <div className="arrow-btn">
          <ArrowSvg/>
        </div>


        <div className="profile">
            <CircleSvg/>
            <div className="user-info">
              <div>냉동진교</div>
              <span>oygnijoes0209@gmail.com</span>
            </div>
        </div>


        <div className="writeBtn">
          <PlusSvg/>
          <div>글 작성하기</div>
        </div>

        <div className="menu">
          <div className="selectOne">
            {menuOne.map((menu, index) => {
              let icon = '/src/assets/icon/'+menu.path.substring(1)+'.svg'
              return location === menu.path ? (
                <Link className="menu-lay-focused" to={menu.path} key={index}>
                    <div className="comment" >
                        <img src={icon} alt="" width='24px' height='24px' />
                      <span>{menu.name}</span>
                    </div>
                  </Link>
              ) : (
                <Link className="menu-lay" to={menu.path} key={index}>
                  <div className="comment" >
                      <img src={icon} alt="" width='24px' height='24px' />
                    <span>{menu.name}</span>
                  </div>
                </Link>
              )
            })}
          </div>


          <div className="selectTwo">
            {menuTwo.map((menu, index) => {
              let icon = '/src/assets/icon/'+menu.path.substring(1)+'.svg'
              return location === menu.path ? (
                <Link className="menu-lay-focused" to={menu.path} key={index}>
                    <div className="comment" >
                      <img src={icon} alt="" width='24px' height='24px' />
                      <span>{menu.name}</span>
                    </div>
                  </Link>
              ) : (
                <Link className="menu-lay" to={menu.path} key={index}>
                  <div className="comment" >
                    <img src={icon} alt="" width='24px' height='24px' />
                    <span>{menu.name}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Sidebar;