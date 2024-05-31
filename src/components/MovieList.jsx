
import "../styles/MovieList.css";
import MovieCard from "./MovieCard";


const MovieList = ({ movies, loadMoreMovies }) => {
 
  return (
    <>
      {movies.length > 0 && (
        <button className="load-btn" onClick={loadMoreMovies}>
          Load More
        </button>
      )}
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie}  />
        ))}
      </div>
    </>
  );
};

export default MovieList;
