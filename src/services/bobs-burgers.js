export async function getCharacters() {
  const response = await fetch(
    'https://bobsburgers-api.herokuapp.com/characters?sortBy=name&OrderBy=desc&limit=50&skip=0'
  );
  const data = await response.json();
  return data;
}
