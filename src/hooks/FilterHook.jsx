import { getCharacters, filterCharacters } from '../services/harry-potter';

export async function useFilter(house, setCharacters, setLoading) {
  if (house === 'default') {
    const def = await getCharacters();
    setCharacters(def);
    setLoading(false);
  } else {
    const data = await filterCharacters(house);
    setCharacters(data);
    setLoading(false);
  }
}
