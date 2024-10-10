import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../../pages/Login/Login'
import Signup from '../../pages/Signup/Signup'
import Home from '../../pages/Home/Home'
import Follow from '../../pages/Follow/Follow'
import Bookmark from '../../pages/Bookmark/Bookmark'
import Profile from '../../pages/Profile/Profile'
import School from '../../pages/School/School'
import Setting from '../../pages/Setting/Setting'
import Search from '../../pages/Search/Search'
import Help from '../../pages/Help/Help'
import Sidebar from '../Sidebar/Sidebar'
import NotFound from '../../pages/NotFound/NotFound'

const Router = () => {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home />} />
          <Route path='/follow' element={<Follow />}/>
          <Route path='/bookmark' element={<Bookmark />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/school' element={<School />}/>
          <Route path='/setting' element={<Setting />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/help' element={<Help/>}/>
          <Route path='/sidebar' element={<Sidebar/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
