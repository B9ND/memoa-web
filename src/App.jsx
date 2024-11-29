import { ToastContainer } from 'react-toastify';
import Router from '../src/components/router/index'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Router/>
      <ToastContainer />
    </>
  )
}

export default App;
