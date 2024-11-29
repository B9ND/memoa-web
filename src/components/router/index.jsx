import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Home from "../../pages/Home";
import Bookmark from "../../pages/Bookmark";
import Profile from "../../pages/Profile";
import Setting from "../../pages/Setting";
import Search from "../../pages/Search";
import Help from "../../pages/Help";
import NotFound from "../../pages/NotFound";
import Write from "../../pages/Write";
import Follow from "../../pages/Follow";
import FollowList from "../FollowList";
import Detail from "../../pages/Detail";
import Layout from '../Layout'

const Router = () => {
  return (
    <BrowserRouter>
      <div className="layout">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/follow/:username" element={<Follow/>}>
              <Route path=":followState" element={<FollowList/>}/>
            </Route>
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/profile/:username" element={<Profile />}/>
            <Route path="/setting" element={<Setting />} />
            <Route path="/search" element={<Search />} />
            <Route path="/help" element={<Help />} />
            <Route path="/write" element={<Write />}/>
            <Route path="/detail/post/:id" element={<Detail/>}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
