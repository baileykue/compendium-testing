import React from 'react';
import { getCharacters } from '../../services/harry-potter';
import { useEffect, useState } from 'react';
import CharacterList from '../../components/CharacterList/CharacterList';

export default function AllCharacters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setCharacters(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <CharacterList characters={characters} />
    </div>
  );
}
