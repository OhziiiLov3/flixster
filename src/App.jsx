import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Dropdown from "./components/Dropdown";

const App = () => {
  // State variables
  const [movies, setMovies] = useState([]);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currentView, setCurrentView] = useState("now_playing");
  const [sortOption, setSortOption] = useState("");

  // Function to fetch movies from API
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
        // Update movies state with fetched results
        setMovies((prevMovies) =>
          page === 1 ? data.results : [...data.results, ...prevMovies]
        );
        setNoResults(false); // Reset noResults flag if movies are found
      } else {
        if (page === 1) {
          setMovies([]);
          setNoResults(true); // Set noResults flag if no movies found on the first page
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  // Fetch movies when the current view changes to "now_playing" or page changes
  useEffect(() => {
    if (currentView === "now_playing") {
      fetchMovies();
    }
  }, [page, currentView]);

  // Define sort functions
  const sortFunctions = {
    alphabetical: (a, b) => a.title.localeCompare(b.title),
    release_date: (a, b) => new Date(b.release_date) - new Date(a.release_date),
    rating: (a, b) => b.vote_average - a.vote_average,
  };

  // Sort movies based on selected sort option

  useEffect(() => {
    const sorted = [...movies].sort(sortFunctions[sortOption] || (() => 0));
    setSortedMovies(sorted);
  }, [sortOption, movies]);

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    setPage(1);
    setCurrentView("search");
    fetchMovies(query, 1);
  };
  // Handle "Now Playing" button click
  const handleNowPlayingClick = () => {
    setCurrentView("now_playing");
    setPage(1);
    setMovies([]);
    setIsSearching(false);
    setNoResults(false);
    fetchMovies();
  };

  // Handle sort option change
  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
  };
  // Load more movies when the user reaches the end of the list
  const loadMoreMovies = (event) => {
    event.stopPropagation();
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
        <Dropdown
          label="Sort by"
          options={[
            { label: "Select Sort Option", value: "" },
            { label: "Alphabetical", value: "alphabetical" },
            { label: "Release Date", value: "release_date" },
            { label: "Rating", value: "rating" },
          ]}
          value={sortOption}
          onChange={handleSortChange}
        />
      </div>
      {noResults ? (
        <div>No movies found for your search term.</div>
      ) : (
        <MovieList movies={sortedMovies} loadMoreMovies={loadMoreMovies} />
      )}
      <Footer />
    </div>
  );
};

export default App;
