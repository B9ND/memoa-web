import "../Header/index.css";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  let location = useLocation().pathname.split("/:")[0];
  const navigate = useNavigate();

  if (location == "/") {
    location = "/home";
  }

  let icon = (
    <div
      className="page-icon"
      style={{ backgroundImage: "url(/src/assets/icon" + location + ".svg)" }}
    ></div>
  );

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="header">
      <button className="memoa" onClick={goHome}>
        MEMOA
      </button>
      <span>❘</span>
      {icon}
    </div>
  );
};

export default Header;
