import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currentView, setCurrentView] = useState("now_playing");

  const fetchMovies = async (query = "", page = 1) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          query
        )}&page=${page}`
      : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        // Prepend new movies to the existing array if it's not the first page
        setMovies((prevMovies) =>
          page === 1 ? data.results : [...data.results, ...prevMovies]
        );
        setNoResults(false);
      } else {
        if (page === 1) {
          setMovies([]);
          setNoResults(true);
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (currentView === "now_playing") {
      fetchMovies();
    }
  }, [page, currentView]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    setPage(1);
    setCurrentView("search");
    fetchMovies(query, 1);
  };

  const handleNowPlayingClick = () => {
    setCurrentView("now_playing");
    setPage(1);
    setMovies([]);
    setIsSearching(false);
    setNoResults(false);
    fetchMovies();
  };

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(isSearching ? searchQuery : "", nextPage);
  };

  return (
    <div className="App">
      <Header />
      <div className="App-header">
        <button onClick={handleNowPlayingClick}>Now Playing</button>
        <button onClick={() => setCurrentView("search")}>Search</button>
        {currentView === "search" && <SearchBar onSearch={handleSearch} />}
      </div>
      {noResults ? (
        <div>No movies found for your search term.</div>
      ) : (
        <MovieList movies={movies} loadMoreMovies={loadMoreMovies} />
      )}
      <Footer />
    </div>
  );
};

export default App;
