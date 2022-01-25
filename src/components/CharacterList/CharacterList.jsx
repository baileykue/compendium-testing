import React from 'react';

export default function CharacterList({ characters }) {
  return (
    <div>
      {characters.map((character) => (
        <div className="card" key={character.name}>
          <img src={character.image} />
          <h4>Name: {character.name}</h4>
          {character.dateOfBirth && <p>day of birth: {character.dateOfBirth}</p>}
          {character.patronus && <p>patronus: {character.patronus}</p>}
        </div>
      ))}
    </div>
  );
}
