import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../../src/pages/Login/Login'
import Signup from '../../src/pages/Signup/Signup'
import Home from '../../src/pages/Home/Home'
import Follow from '../../src/pages/Follow/Follow'
import Bookmark from '../../src/pages/Bookmark/Bookmark'
import Profile from '../../src/pages/Profile/Profile'
import School from '../../src/pages/School/School'
import Setting from '../../src/pages/Setting/Setting'
import Search from '../../src/pages/Search/Search'
import Help from '../../src/pages/Help/Help'
import Sidebar from '../components/Sidebar/Sidebar'
import { useState } from 'react'

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
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default Router