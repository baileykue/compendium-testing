import React from 'react';

export default function CharacterList({ characters }) {
  return (
    <div>
      {characters.map((character) => (
        <div className="card" key={character.dateOfBirth}>
          <img src={character.image} />
          <h4>Name: {character.name}</h4>
        </div>
      ))}
    </div>
  );
}
