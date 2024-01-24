import { useContext } from 'react';
import './App.css'
import Carousel from './components/carousel';
import './server/mirage.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/loader.tsx';
import { AppContext } from './context/appContext.tsx';


function App() {


  const { slides } = useContext(AppContext);
 

  return (
    <div className="w-[100%]">
      <ToastContainer />
      {!slides.length ?
        <Loader />
        :
        <Carousel slides={slides} />
      }
    </div>
  );
};



export default App




