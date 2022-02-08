import React from 'react';

export default function CharacterList({ characters }) {
  return (
    <div className="page">
      <ul className="list">
        {characters?.map((character) => (
          <li key={character.id} className="card">
            {character.image ? (
              <img src={character.image} className="selfie" />
            ) : (
              <img src={`${process.env.PUBLIC_URL}/profile/profile.png`} className="dot" />
            )}
            <h4>Name: {character.name}</h4>
            {character.dateOfBirth && <p>day of birth: {character.dateOfBirth}</p>}
            {character.patronus && <p>patronus: {character.patronus}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
