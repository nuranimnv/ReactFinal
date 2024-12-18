import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import List from "../List/List";
import Search from "../Search/Search";
import axios from "axios";

function Container({ setBasketActive, basket, setBasket }) {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [list, setList] = useState([]);
  const API_URL = searchValue
    ? `https://api.themoviedb.org/3/search/movie?query=${searchValue}`
    : `https://api.themoviedb.org/3/discover/movie`;

  const isBasketFull = Object.keys(basket).length > 0;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzZmODNiNmExYjNiYWQxZjFhNGY2OGY1YmVjZmFmYyIsIm5iZiI6MTczNDU0NTgzNS4yMjU5OTk4LCJzdWIiOiI2NzYzMTFhYTY3Yzk2MzIxODA0YTMwZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cigdhI4bwUsmHHEWdQSBY_0GVyaXX9R6iRqFiHLk1VQ",
            Accept: "application/json",
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    fetchMovies();
  }, [API_URL]);

  return (
    <div className="container">
      <div className="container-left">
        <Search getData={setSearchValue} />
        <div className="container-cards">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <Card
                key={movie.id}
                movie={movie}
                setList={setList}
                list={list}
                isBasketFull={isBasketFull}
              />
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>
      <div className="container-right">
        <List
          basket={basket}
          setBasket={setBasket}
          setBasketActive={setBasketActive}
          list={list}
          setList={setList}
        />
      </div>
    </div>
  );
}

Container.propTypes = {
  setBasketActive: PropTypes.func.isRequired,
  basket: PropTypes.object.isRequired,
  setBasket: PropTypes.func.isRequired,
};

export default Container;
