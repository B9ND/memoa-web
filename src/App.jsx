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

import React from 'react';
import Home from './Home';
import Router from './router/index'

const App = () => {
  return (
    <Router/>
  );
}

export default App;
