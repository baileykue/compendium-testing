import { getCharacters } from '../services/harry-potter';
import { filterCharacters } from '../services/harry-potter';

export async function filterHook(house, setCharacters, setLoading) {
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
