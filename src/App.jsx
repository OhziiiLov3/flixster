import { useState, useEffect } from 'react'
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header'
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.results);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [page]); 
  return (
    <div className="App">
      <Header />

      <div className="App-header">
        <SearchBar/>
        <div>Dropdown Filter</div>
      </div>
      <MovieList movies={movies} setMovies={setMovies} page={page} setPage={setPage} />
      <Footer />
    </div>
  );
};

export default App;
