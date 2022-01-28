import React from 'react';
import { filterCharacters, getCharacters } from '../../services/harry-potter';
import { useEffect, useState } from 'react';
import CharacterList from '../../components/CharacterList/CharacterList';
import Controls from '../../components/Controls/Controls';

export default function AllCharacters() {
  const [characters, setCharacters] = useState([]);
  const [house, setHouse] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setCharacters(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (house === 'default') {
      const def = await getCharacters();
      setCharacters(def);
      setLoading(false);
    } else {
      const data = await filterCharacters(house);
      setCharacters(data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1>
        <img
          className="crest"
          src={
            'https://www.kindpng.com/picc/m/19-198867_transparent-harry-potter-hogwarts-crest-hd-png-download.png'
          }
          alt="Hogwarts Crest"
        />
        Welcome to Hogwarts
      </h1>
      <Controls setHouse={setHouse} handleSubmit={handleSubmit} />
      {loading ? (
        <h1>Loading Characters...</h1>
      ) : (
        <>
          <CharacterList characters={characters} />
        </>
      )}
    </>
  );
}
