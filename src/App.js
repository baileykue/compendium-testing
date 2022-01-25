import './App.css';
import { getCharacters } from './services/bobs-burgers';
import { useEffect, useState } from 'react';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setCharacters(data);
    };
    fetchData();
  }, []);
  console.log(characters);
  return <div className="App"></div>;
}

export default App;
