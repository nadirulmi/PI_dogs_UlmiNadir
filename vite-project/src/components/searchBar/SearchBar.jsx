import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    onSearch(newName);
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Buscar perro por nombre"
        value={name}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;

