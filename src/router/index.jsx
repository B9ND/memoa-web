import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Home'
import Main from '../pages/Main'
import Follow from '../pages/Follow'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/main' element={<Main />} />
        <Route path='/follow' element={<Follow />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router