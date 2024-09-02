import '../styles/Header.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const location = useLocation().pathname.substring(1);
  const navigate = useNavigate();

  let icon = <div className="page-icon" style={{backgroundImage: 'url(/src/assets/icon/'+location+'.svg)'}}></div>

  const goMain=()=>{
    navigate("/main")
  }

  return (
    <div className="header">
      <button className="memoa" onClick={goMain}>MEMOA</button>
      <span>❘</span>
      {icon}
    </div>
  )
}

export default Header