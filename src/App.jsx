import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  /* function to handle query Api (search) */
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      let url = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            query
          )}&page=${page}`
        : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if(page > 1){
          setMovies((prevMovies)=> [...prevMovies], ... data.results);
        }else{
          // console.log(data.results);
          setMovies(data.results);
        }
        
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [page, query]);

 const handleSearch = (searchQuery) =>{
  setQuery(searchQuery);
  setPage(1);
  setIsSearching(true);
 }


  return (
    <div className="App">
      <Header />

      <div className="App-header">
        <SearchBar onSearch={handleSearch} />
        <div>Dropdown Filter</div>
      </div>
      <MovieList
        movies={movies}
        setMovies={setMovies}
        page={page}
        setPage={setPage}
        isSearching={isSearching}
        query={query}
      />
      <Footer />
    </div>
  );
};

export default App;
