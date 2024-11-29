import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  )
}

export default Layout;