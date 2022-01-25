import React from 'react';

export default function Controls({ setHouse, handleSubmit }) {
  return (
    <div>
      <label>
        filter by house:
        <select onChange={(e) => setHouse(e.target.value)}>
          <option value="default">Default</option>
          <option value="gryffindor">Gryffindor</option>
          <option value="ravenclaw">Ravenclaw</option>
          <option value="hufflepuff">Hufflepuff</option>
          <option value="slytherin">Slytherin</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
