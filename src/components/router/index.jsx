import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Home from "../../pages/Home/Home";
import Bookmark from "../../pages/Bookmark/Bookmark";
import Profile from "../../pages/Profile/Profile";
import School from "../../pages/School/School";
import Setting from "../../pages/Setting/Setting";
import Search from "../../pages/Search/Search";
import Help from "../../pages/Help/Help";
import Sidebar from "../Sidebar/Sidebar";
import NotFound from "../../pages/NotFound/NotFound";
import Write from "../../pages/Write/Write";
import Following from "../../pages/Following/Following";
import Followers from "../../pages/Followers/Followers";

const Router = () => {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/profile/:username" element={<Profile />}/>
          <Route path="/following/:username" element={<Following />} />
          <Route path="/followers/:username" element={<Followers />} />
          <Route path="/school" element={<School />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/search" element={<Search />} />
          <Route path="/help" element={<Help />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/write" element={<Write/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
