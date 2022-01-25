import React from 'react';

export default function CharacterList({ characters }) {
  console.log(characters);
  return (
    <div>
      {characters.map((character) => (
        <div className="card" key={character.id}>
          <img src={character.image} />
          <h4>Name: {character.name}</h4>
          <p>Occupation: {character.occupation}</p>
        </div>
      ))}
    </div>
  );
}
