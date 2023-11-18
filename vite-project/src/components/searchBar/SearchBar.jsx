import { useState } from 'react';
import style from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(name);
  };

  return (
    <div className={style.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Find your dog by name..."
          value={name}
          onChange={handleChange}  
        />
        <button type="submit" className={style.subButton}>Search</button> 
      </form>
    </div>
  );
}

export default SearchBar;


