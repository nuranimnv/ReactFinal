import { useState } from "react";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import "./style.css";
import "./components/Basket/Basket.css";
import "./components/Container/Container.css";
import "./components/Card/Card.css";
import Basket from "./components/Basket/Basket";

function App() {
  const [basket, setBasket] = useState([]);
  const [basketActive, setBasketActive] = useState(false);

  return (
    <>
      <Header />
      {basketActive ? (
        <Basket
          basket={basket}
          setBasket={setBasket}
          setBasketActive={setBasketActive}
        />
      ) : (
        <Container
          basket={basket}
          setBasket={setBasket}
          setBasketActive={setBasketActive}
        />
      )}
    </>
  );
}

export default App;
