import {useState} from 'react';




const SearchBar = () => {
const [searchQuery, setSearchQuery] = useState("Find Movie");


const handleSearchChange = (event) =>{
    setSearchQuery(event.target.value)
    console.log("Searching....", event.target.value);
}


  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchBar