// import React from 'react';
// import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
// import Login from './components/Login';
// import Home from './Home';

// const App = () => {
//   return (
//     <>
//       <BrowserRouter>
//       <Router>
//         <Routes>
//           <Route path='/login' element={<Home />} />
//         </Routes>
//       </Router>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App

import Router from './router/index'


const App = () => {

  // console.log(loc.pathname)
  // console.log(loc.pathname.substring in hideSidebar)

  return (
    <Router/>
  )
}

export default App;
