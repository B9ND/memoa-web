import Hero from './pages/Hero';
import Login from './pages/Login';
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