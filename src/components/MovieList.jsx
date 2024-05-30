
import "../styles/MovieList.css"
import MovieCard from './MovieCard';



const MovieList = ({movies, setMovies, page, setPage}) => {
// function to load more movies
const loadMoreMovies = async () =>{
    const apiKey = import.meta.env.VITE_API_KEY;
    const nextPage = page +1;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${nextPage}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data); 
        if (data.results) {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
          setPage(nextPage);
        } else {
          console.error("No results found in the API response");
        }
    } catch (error) {
       console.log("Error fetching more movies", error) 
    }
}

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