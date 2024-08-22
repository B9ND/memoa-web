// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';
import './styles/GlobalStyles.css'; // 전역 스타일 가져오기

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);
