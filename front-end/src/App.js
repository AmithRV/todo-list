import { useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const [type, setType] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if(event.key==='+'){
        setType('add');
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="app">
       <Header setType={setType}/>
       <Body type={type} setType={setType}/>
       <Footer/>
    </div>
  );
}

export default App;
