import { useState } from "react";
import PropTypes from "prop-types"; // PropTypes əlavə edildi

function List({ list, setList, setBasketActive, basket, setBasket }) {
  const [active, setActive] = useState(false);
  const [listName, setListName] = useState("");

  const removeFromList = (id) => {
    const filteredList = list.filter((item, index) => index !== id);
    setList(filteredList);
  };

  const addToBasket = () => {
    setBasket({
      ...basket,
      title: listName,
      orders: [...list],
    });
    setList([]);
    setListName("");
  };

  return (
    <div className="list">
      <input
        type="text"
        placeholder="Create a new list"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      {list.map((listItem, index) => (
        <div key={index} className="list-row">
          <p>{listItem.title}</p>
          <button onClick={() => removeFromList(index)}>✖</button>
        </div>
      ))}
      <div className="list-buttons">
        <button
          disabled={listName.length > 0 && list.length ? false : true}
          onClick={() => {
            setActive(!active);
            addToBasket();
          }}
        >
          Save
        </button>
        <button onClick={() => setBasketActive(true)}>Go to fav-list</button>
      </div>
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  setList: PropTypes.func.isRequired,
  setBasketActive: PropTypes.func.isRequired,
  basket: PropTypes.shape({
    title: PropTypes.string,
    orders: PropTypes.array,
  }).isRequired,
  setBasket: PropTypes.func.isRequired,
};

export default List;
