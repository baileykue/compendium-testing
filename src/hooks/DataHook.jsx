import { getCharacters } from '../services/harry-potter';
import { useEffect, useState } from 'react';

export function useData() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setCharacters(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { characters, loading, setLoading, setCharacters };
}
