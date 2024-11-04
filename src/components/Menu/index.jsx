/* eslint-disable react/prop-types */
import './style.css'
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

const Menu = ( { isOpen, item, location }) => {
  return (
      <CSSTransition
        in={isOpen}
        timeout={500}
        className={location === item.path ? "menu-lay-focused" : "menu-lay"}
      >
        <Link to={item.path} className={location === item.path ? "menu-lay-focused" : "menu-lay"}>
          <div className="comment">
            <img src={`/src/assets/icon/${item.origin}.svg`} alt="" className="normal-icon" />
            <CSSTransition
              in={isOpen}
              timeout={200}
              className={"fade menu-name"}
              unmountOnExit
            >
              <div>{item.name}</div>
            </CSSTransition>
          </div>
        </Link>
      </CSSTransition>
  )
}

export default Menu