import { useState } from "react";

import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // console.log("Searching....", event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="Find Movie"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button" type="submit">
          Search
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
