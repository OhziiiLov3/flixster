import { useState } from "react";
import Modal from "../components/Modal";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(!isModalOpen);
    // console.log("Open Modal", isModalOpen);
  };

  return (
    <>
      <div className="movie-card" onClick={toggleModal}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
        />
        <h2>{movie.title}</h2>
        <p> Votes: {movie.vote_count}</p>
        <p>Rating: {movie.vote_average}</p>
      </div>

      {isModalOpen && <Modal movie={movie} onClose={toggleModal} />}
    </>
  );
};

export default MovieCard;
