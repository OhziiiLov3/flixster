import { useState, useEffect } from 'react'
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header'
import MovieList from './components/MovieList';


const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []); // Empty dependency array to run once on component mount
  return (
    <div className="App">
      <Header />

      <div className="App-header">
        <div>Search Bar</div>
        <div>Dropdown Filter</div>
      </div>
      <MovieList movies={movies} />
      <Footer />
    </div>
  );
};

export default App;
