import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Card({ movie, setList, list, isBasketFull }) {
  const [alert, setAlert] = useState({ message: "", type: "" });

  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
  const moviePoster = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : defaultImage;

  const movieTitle = movie.title || "No title available";
  const movieYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "No year available";

  const handleAddToList = () => {
    if (list.some((item) => item.id === movie.id)) {
      setAlert({ message: "Already in the list", type: "alert-warning" });
    } else {
      setList((prev) => [...prev, movie]);
      setAlert({ message: "Added to list", type: "alert-success" });
    }
  };

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="card-container">
      {alert.message && (
        <div className={`notification ${alert.type}`}>
          <span className="notification-message">{alert.message}</span>
        </div>
      )}

      <div className="movie-item">
        <img className="movie-thumbnail" src={moviePoster} alt={movieTitle} />
        <div className="movie-details">
          <div className="movie-meta">
            <p className="movie-name">{movieTitle}</p>
            <span className="movie-release">Year: {movieYear}</span>
          </div>
          <div className="action-buttons">
            <button
              className="add-button"
              onClick={handleAddToList}
              disabled={isBasketFull}
              style={{
                cursor: isBasketFull ? "not-allowed" : "pointer",
                opacity: isBasketFull ? 0.6 : 1,
              }}
            >
              {isBasketFull ? "Basket Full" : "Add to list"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    backdrop_path: PropTypes.string,
    release_date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setList: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  isBasketFull: PropTypes.bool.isRequired,
};

export default Card;
