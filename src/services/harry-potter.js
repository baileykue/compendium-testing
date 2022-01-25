export async function getCharacters() {
  const response = await fetch('http://hp-api.herokuapp.com/api/characters/staff');

  const data = await response.json();
  return data;
}

export async function filterCharacters(house) {
  const response = await fetch(`http://hp-api.herokuapp.com/api/characters/house/${house}`);

  const data = await response.json();
  return data;
}
