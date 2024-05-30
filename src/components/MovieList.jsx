import {useState,useEffect} from 'react';
import "../styles/MovieList.css"



const MovieList = () => {
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
    <>
      <div className="movie-list">
        {movies.map((movie, idx) => (
          <div key={idx} className='movie-card'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}alt=""/>
            <h2>{movie.title}</h2>
            <p> Votes: {movie.vote_count}</p>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieList