import React from 'react';
import { filterCharacters, getCharacters } from '../../services/harry-potter';
import { useEffect, useState } from 'react';
import CharacterList from '../../components/CharacterList/CharacterList';
import Controls from '../../components/Controls/Controls';

export default function AllCharacters() {
  const [characters, setCharacters] = useState([]);
  const [house, setHouse] = useState('default');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setCharacters(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCharList = await filterCharacters(house);
    setCharacters(newCharList);
  };

  return (
    <div>
      <Controls setHouse={setHouse} handleSubmit={handleSubmit} />
      <CharacterList characters={characters} />
    </div>
  );
}
