// src/pages/Home.jsx
import React from 'react';
import Hero from './components/Hero';
import Login from './components/Login';
import './styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Login />
    </div>
  );
};

export default Home;