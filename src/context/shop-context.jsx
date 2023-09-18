/* eslint-disable no-unused-vars */
import { createContext, useReducer, useState } from "react";
import PropTypes from "prop-types";
import { getProducts } from "../utils/api";
import { getCartItems, updateCartItems } from '../utils/localStorageCart'



export const ShopContext = createContext({
  cartItems: {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemCount: () => {},
  deleteFromCart: () => {},
})


export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getCartItems());
  
  const addToCart = (itemId) => {
    const updatedCart = { ...cartItems, [itemId]: cartItems[itemId] ? cartItems[itemId] + 1 : 1 };
    setCartItems(updatedCart);
    updateCartItems(updatedCart);
  };

  //deletes one item at a time
   const removeFromCart = (itemId) => {
    const updatedCart = { ...cartItems, [itemId]: cartItems[itemId] ? cartItems[itemId] - 1 : 1 };
    setCartItems(updatedCart);
    updateCartItems(updatedCart);
  };

  //deletes all of that item from the cart
  const deleteFromCart = (itemId) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[itemId];
    setCartItems(updatedCart);
    updateCartItems(updatedCart);
  };

  const clearCart = () => { 
    setCartItems({});
    localStorage.removeItem('cart');
  };

  const updateCartItemCount = (newAmount, itemId) => {

    if (newAmount > 0) {
      const updatedCart = {
        ...cartItems,
        [itemId]: newAmount,
      };
      // Update the cart state
      setCartItems(updatedCart);
      // Save the updated cart to local storage
      updateCartItems(updatedCart);
    } else {
      // If the new quantity is 0 or negative, remove the item from the cart
      removeFromCart(itemId);
    }
  };

  const contextValue = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    clearCart,
    deleteFromCart
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
