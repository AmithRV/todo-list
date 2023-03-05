import { useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { getBackgroundImageUrl } from './helpers/request';

function App() {
  const [type, setType] = useState('');

  // https://media.istockphoto.com/id/1448813542/photo/artificial-intelligence-neural-network-concept.jpg?s=612x612&w=0&k=20&c=cmEWxBQ0ykbCw_jqzN5--pjKt2rkcm7ozBzyxjm8jfE=

  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '+') {
        setType('add');
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

  }, []);

  useEffect(()=>{
    getBackgroundImageUrl(setBackgroundImageUrl);
  },[backgroundImageUrl])

  return (
    <div className="app">
      <Header
        setType={setType}
      />

      <Body
        type={type}
        setType={setType}
        setBackgroundImageUrl={setBackgroundImageUrl}
        backgroundImageUrl={backgroundImageUrl}
      />

      <Footer />
    </div>
  );
}

export default App;
