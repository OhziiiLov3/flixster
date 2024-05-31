import "../styles/Modal.css";

const Modal = ({ movie, onClose, isOpen }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img
          src={`https://image.tmdb.org/t/p/w400${movie.backdrop_path}`}
          alt="Backdrop Poster"
        />
        <h2>{movie.title}</h2>
        <p>
          {" "}
          <strong>Release Date:</strong> {movie.release_date}
        </p>
       
        <p>
          <strong>Overview: </strong>
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default Modal;
