import "../styles/MovieCard.css"

const MovieCard = ({movie}) => {
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
      <h2>{movie.title}</h2>
      <p> Votes: {movie.vote_count}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  
  );
}

export default MovieCard