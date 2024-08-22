// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import Login from '../components/Login';
import '../styles/Home.css';  // styles 폴더에서 CSS 파일을 불러옴

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Login />
    </div>
  );
};

export default Home;
