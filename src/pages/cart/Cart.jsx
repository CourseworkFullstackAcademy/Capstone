import  { useState } from "react";
import { CartItem } from "./cart-item";

import "./cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Example function to add an item to the cart
  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // If the item is already in the cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // If the item is not in the cart, add it as a new item
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  console.log(addToCart);

  return (
    <div className="cart">
      <div className="cart-title">Cart</div>
      <div className="container">
        {cartItems.map((item) => (
          <CartItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

