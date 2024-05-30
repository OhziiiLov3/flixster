import { useState } from "react";

import "../styles/SearchBar.css"

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("Find Movie...");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log("Searching....", event.target.value);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder={searchQuery}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button className="search-button" type="submit">
        Search
      <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
