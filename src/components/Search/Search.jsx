import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Search({ getData }) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getData(searchValue);
  }, [searchValue, getData]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
}

Search.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default Search;
