export async function getCharacters() {
  const response = await fetch('http://hp-api.herokuapp.com/api/characters/house/slytherin');

  const data = await response.json();
  console.log(data);
  return data;
}
