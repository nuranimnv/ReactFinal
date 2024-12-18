import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Basket({ basket, setBasketActive }) {
  const [movieIds, setMovieIds] = useState({});

  useEffect(() => {
    const fetchMovieIds = async () => {
      const idMapping = {};
      for (const movie of basket.orders) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=YOUR_API_KEY`
          );
          if (!response.ok) throw new Error("Failed to fetch movie data");
          const data = await response.json();
          idMapping[movie.id] = data.imdb_id;
        } catch (error) {
          console.error("Error fetching movie data:", error);
        }
      }
      setMovieIds(idMapping);
    };

    if (basket.orders && basket.orders.length > 0) {
      fetchMovieIds();
    }
  }, [basket.orders]);

  return (
    <div className="basket">
      <div className="container">
        <h1>Fav-List</h1>
        <div className="items">
          {basket.orders && basket.orders.length > 0 ? (
            <>
              <h2>{basket.title}</h2>
              <div className="items-list">
                {basket.orders.map((movie, idx) => (
                  <div key={idx} className="item">
                    <Link
                      target="_blank"
                      to={
                        movieIds[movie.id]
                          ? `https://www.imdb.com/title/tt${movieIds[movie.id]}`
                          : `https://www.themoviedb.org/movie/${movie.id}`
                      }
                    >
                      <img
                        src={
                          movie.backdrop_path
                            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                            : "https://via.placeholder.com/300x450?text=No+Image"
                        }
                        alt={movie.title}
                      />
                    </Link>
                    <div>
                      <p>{movie.title}</p>
                      <span>{movie.release_date.slice(0, 4)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty">No items in the basket</div>
          )}
        </div>
        <button onClick={() => setBasketActive(false)}>Back</button>
      </div>
    </div>
  );
}

Basket.propTypes = {
  basket: PropTypes.shape({
    title: PropTypes.string.isRequired,
    orders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        backdrop_path: PropTypes.string,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setBasketActive: PropTypes.func.isRequired,
};

export default Basket;
