import "./style.css";
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  let location = useLocation().pathname.split("/:")[0];
  const navigate = useNavigate();

  if (location == '/'){
    location = '/home'
  }

  const goHome=()=>{
    navigate("/home")
  }

  return (
    <div className="header">
      <button className="memoa" onClick={goHome}>MEMOA</button>
      <span>❘</span>
      <div className="page-icon" style={{backgroundImage: 'url(/src/assets/icon'+location+'.svg)'}}></div>
    </div>
  )
}

export default Header