import React from 'react';

export default function CharacterList({ characters }) {
  return (
    <div>
      <ul className="list">
        {characters.map((character) => (
          <li key={character.id} className="card">
            <img src={character.image} className="selfie" />
            <h4>Name: {character.name}</h4>
            {character.dateOfBirth && <p>day of birth: {character.dateOfBirth}</p>}
            {character.patronus && <p>patronus: {character.patronus}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
