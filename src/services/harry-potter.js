export async function getCharacters() {
  const response = await fetch('http://hp-api.herokuapp.com/api/characters/staff');

  const data = await response.json();

  let uniqueId = 0;
  data.forEach((char) => {
    char.id = uniqueId;
    uniqueId++;
  });

  return data;
}

export async function filterCharacters(house) {
  const response = await fetch(`http://hp-api.herokuapp.com/api/characters/house/${house}`);

  const data = await response.json();

  let uniqueId = 0;
  data.forEach((char) => {
    char.id = uniqueId;
    uniqueId++;
  });

  return data;
}
