
import "../styles/MovieList.css"
import MovieCard from './MovieCard';



const MovieList = ({movies, setMovies, page, setPage, query,isSearching}) => {
// function to load more movies
const loadMoreMovies = async () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const nextPage = page + 1;
  const url = isSearching
    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${nextPage}`
    : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${nextPage}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    setMovies((prevMovies) => [...prevMovies, ...data.results]);
    setPage(nextPage);
  } catch (error) {
    console.log("Error fetching more movies", error);
  }
};

  return (
    <>
      <button className="load-btn" onClick={loadMoreMovies}>Load More</button>
      <div className="movie-list">
        {movies.map((movie,index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MovieList