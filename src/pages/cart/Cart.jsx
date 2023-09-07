import { useState, useEffect } from "react";
import { CartItem } from "./cart-item";

import "./cart.css";

export default function Cart () {
  const [cartItem, setCartItem ] = useState([]);

  

  return (
    <div className="cart">    
        <div className="cart-title"></div>
        <div className="contianer">
          <div className="row">
            <div className="col-3">
              {}
            </div>
          </div>
        </div>
    
    </div>
  );
}