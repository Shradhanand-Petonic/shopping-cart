import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shopping from "./component/shopping/shopping";
import CartPage from "./component/shopping/cartPage";


function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Shopping cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
